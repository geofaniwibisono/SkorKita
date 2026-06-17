use std::{
    collections::HashMap,
    fs,
    net::SocketAddr,
    path::PathBuf,
    sync::{
        atomic::{AtomicU64, Ordering},
        Arc, Mutex,
    },
};

use axum::{
    body::Body,
    extract::{
        connect_info::ConnectInfo,
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, Query, State as AxumState,
    },
    http::{header, Response, StatusCode, Uri},
    response::IntoResponse,
    routing::get,
    Router,
};
use chrono::Utc;
use futures_util::{SinkExt, StreamExt};
use rusqlite::{params, Connection};
use rust_embed::RustEmbed;
use serde::Serialize;
use serde_json::{json, Value};
use tauri::{
    AppHandle, Manager, State, WebviewUrl, WebviewWindowBuilder,
};
use tokio::sync::broadcast;
use uuid::Uuid;

const NETWORK_PORT: u16 = 3847;

#[derive(RustEmbed)]
#[folder = "../dist"]
struct WebAssets;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct DeviceInfo {
    id: String,
    name: String,
    role: String,
    address: String,
    connected_at: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct RuntimeInfo {
    desktop: bool,
    local_ip: String,
    port: u16,
    viewer_url: String,
    field_control_url: String,
}

struct Runtime {
    database: Mutex<Connection>,
    media_dir: PathBuf,
    devices: Mutex<HashMap<String, DeviceInfo>>,
    broadcaster: broadcast::Sender<String>,
    revision: AtomicU64,
    local_ip: String,
    port: u16,
}

impl Runtime {
    fn new(database_path: PathBuf) -> Result<Self, String> {
        let media_dir = database_path
            .parent()
            .unwrap_or_else(|| std::path::Path::new("."))
            .join("media");
        fs::create_dir_all(&media_dir).map_err(|error| error.to_string())?;
        let connection = Connection::open(database_path).map_err(|error| error.to_string())?;
        connection
            .execute_batch(
                "
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS app_state (
                    id INTEGER PRIMARY KEY CHECK (id = 1),
                    state_json TEXT NOT NULL,
                    revision INTEGER NOT NULL DEFAULT 0,
                    updated_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS action_log (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    revision INTEGER NOT NULL,
                    source TEXT,
                    created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS media_assets (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    category TEXT NOT NULL,
                    mime_type TEXT NOT NULL,
                    size INTEGER NOT NULL,
                    file_path TEXT NOT NULL,
                    created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS app_settings (
                    key TEXT PRIMARY KEY,
                    value_json TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
                PRAGMA user_version = 1;
                ",
            )
            .map_err(|error| error.to_string())?;
        let revision = connection
            .query_row(
                "SELECT revision FROM app_state WHERE id = 1",
                [],
                |row| row.get::<_, u64>(0),
            )
            .unwrap_or(0);
        let (broadcaster, _) = broadcast::channel(128);
        let local_ip = local_ip_address::local_ip()
            .map(|address| address.to_string())
            .unwrap_or_else(|_| "127.0.0.1".to_string());
        Ok(Self {
            database: Mutex::new(connection),
            media_dir,
            devices: Mutex::new(HashMap::new()),
            broadcaster,
            revision: AtomicU64::new(revision),
            local_ip,
            port: NETWORK_PORT,
        })
    }

    fn load_state(&self) -> Result<Option<Value>, String> {
        let database = self.database.lock().map_err(|_| "Database lock failed")?;
        let result = database.query_row(
            "SELECT state_json FROM app_state WHERE id = 1",
            [],
            |row| row.get::<_, String>(0),
        );
        match result {
            Ok(state_json) => serde_json::from_str(&state_json)
                .map(Some)
                .map_err(|error| error.to_string()),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(error) => Err(error.to_string()),
        }
    }

    fn persist_state(&self, value: &Value, source: Option<&str>) -> Result<u64, String> {
        let state_json = serde_json::to_string(value).map_err(|error| error.to_string())?;
        let revision = self.revision.fetch_add(1, Ordering::SeqCst) + 1;
        let updated_at = Utc::now().to_rfc3339();
        let database = self.database.lock().map_err(|_| "Database lock failed")?;
        database
            .execute(
                "
                INSERT INTO app_state (id, state_json, revision, updated_at)
                VALUES (1, ?1, ?2, ?3)
                ON CONFLICT(id) DO UPDATE SET
                    state_json = excluded.state_json,
                    revision = excluded.revision,
                    updated_at = excluded.updated_at
                ",
                params![state_json, revision, updated_at],
            )
            .map_err(|error| error.to_string())?;
        database
            .execute(
                "INSERT INTO action_log (revision, source, created_at) VALUES (?1, ?2, ?3)",
                params![revision, source, updated_at],
            )
            .map_err(|error| error.to_string())?;
        database
            .execute(
                "
                DELETE FROM action_log
                WHERE id NOT IN (
                    SELECT id FROM action_log ORDER BY id DESC LIMIT 10000
                )
                ",
                [],
            )
            .map_err(|error| error.to_string())?;
        Ok(revision)
    }

    fn state_envelope(&self, state: Value, source: Option<&str>, revision: u64) -> String {
        json!({
            "type": "state",
            "state": state,
            "source": source,
            "revision": revision
        })
        .to_string()
    }

    fn broadcast_state(&self, state: Value, source: Option<&str>, revision: u64) {
        let _ = self
            .broadcaster
            .send(self.state_envelope(state, source, revision));
    }

    fn safe_media_id(id: &str) -> Result<&str, String> {
        if id.is_empty()
            || !id
                .chars()
                .all(|character| character.is_ascii_alphanumeric() || "-_.".contains(character))
        {
            return Err("Invalid media id".to_string());
        }
        Ok(id)
    }

    fn save_media(
        &self,
        id: &str,
        name: &str,
        category: &str,
        mime_type: &str,
        bytes: &[u8],
    ) -> Result<(), String> {
        let safe_id = Self::safe_media_id(id)?;
        let path = self.media_dir.join(safe_id);
        fs::write(&path, bytes).map_err(|error| error.to_string())?;
        let database = self.database.lock().map_err(|_| "Database lock failed")?;
        database
            .execute(
                "
                INSERT INTO media_assets
                    (id, name, category, mime_type, size, file_path, created_at)
                VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
                ON CONFLICT(id) DO UPDATE SET
                    name = excluded.name,
                    category = excluded.category,
                    mime_type = excluded.mime_type,
                    size = excluded.size,
                    file_path = excluded.file_path
                ",
                params![
                    safe_id,
                    name,
                    category,
                    mime_type,
                    bytes.len() as i64,
                    path.to_string_lossy().to_string(),
                    Utc::now().to_rfc3339()
                ],
            )
            .map_err(|error| error.to_string())?;
        Ok(())
    }

    fn delete_media(&self, id: &str) -> Result<(), String> {
        let safe_id = Self::safe_media_id(id)?;
        let path = self.media_dir.join(safe_id);
        if path.exists() {
            fs::remove_file(path).map_err(|error| error.to_string())?;
        }
        let database = self.database.lock().map_err(|_| "Database lock failed")?;
        database
            .execute("DELETE FROM media_assets WHERE id = ?1", params![safe_id])
            .map_err(|error| error.to_string())?;
        Ok(())
    }

    fn load_media(&self, id: &str) -> Result<Option<(Vec<u8>, String)>, String> {
        let safe_id = Self::safe_media_id(id)?;
        let database = self.database.lock().map_err(|_| "Database lock failed")?;
        let metadata = database.query_row(
            "SELECT file_path, mime_type FROM media_assets WHERE id = ?1",
            params![safe_id],
            |row| Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?)),
        );
        drop(database);
        match metadata {
            Ok((file_path, mime_type)) => fs::read(file_path)
                .map(|bytes| Some((bytes, mime_type)))
                .map_err(|error| error.to_string()),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(error) => Err(error.to_string()),
        }
    }
}

fn merge_field_control_state(current: Option<Value>, incoming: &Value) -> Value {
    const ALLOWED_FIELDS: &[&str] = &[
        "homeScore",
        "awayScore",
        "homeSets",
        "awaySets",
        "homePenaltyScore",
        "awayPenaltyScore",
        "penaltyShootoutActive",
        "scoreHistory",
        "matchStatus",
        "period",
        "seconds",
        "timerMode",
        "normalTimeSeconds",
        "extraTimeDurationSeconds",
        "extraTime",
        "running",
        "firstHalfAddedTimeMinutes",
        "secondHalfAddedTimeMinutes",
        "addedTimeActive",
        "addedTimeSeconds",
        "homeTimeouts",
        "awayTimeouts",
        "homeTeamFouls",
        "awayTeamFouls",
        "homeSubstitutions",
        "awaySubstitutions",
        "buzzerAt",
        "timerStartedAt",
        "timerBaseSeconds",
        "timerBaseAddedSeconds",
        "foulActive",
        "foulExpiresAt",
        "foulTeam",
        "foulType",
        "foulLabel",
        "foulTone",
        "foulSymbol",
    ];
    let mut merged = current.unwrap_or_else(|| json!({}));
    let Some(target) = merged.as_object_mut() else {
        return incoming.clone();
    };
    let Some(source) = incoming.as_object() else {
        return merged;
    };
    for key in ALLOWED_FIELDS {
        if let Some(value) = source.get(*key) {
            target.insert((*key).to_string(), value.clone());
        }
    }
    merged
}

fn stamp_state_revision(mut state: Value) -> Value {
    let current = state
        .get("stateRevision")
        .and_then(Value::as_u64)
        .unwrap_or(0);
    let now = Utc::now().timestamp_millis().max(0) as u64;
    if let Some(object) = state.as_object_mut() {
        object.insert(
            "stateRevision".to_string(),
            Value::from(current.saturating_add(1).max(now)),
        );
        object.insert(
            "stateUpdatedBy".to_string(),
            Value::from("desktop-runtime"),
        );
    }
    state
}

#[tauri::command]
fn load_state(runtime: State<'_, Arc<Runtime>>) -> Result<Option<Value>, String> {
    runtime.load_state()
}

#[tauri::command]
fn save_state(
    runtime: State<'_, Arc<Runtime>>,
    state: Value,
    source: Option<String>,
) -> Result<u64, String> {
    let state = stamp_state_revision(state);
    let revision = runtime.persist_state(&state, source.as_deref())?;
    runtime.broadcast_state(state, source.as_deref(), revision);
    Ok(revision)
}

#[tauri::command]
fn load_match_archives(runtime: State<'_, Arc<Runtime>>) -> Result<Option<Value>, String> {
    let database = runtime.database.lock().map_err(|_| "Database lock failed")?;
    let result = database.query_row(
        "SELECT value_json FROM app_settings WHERE key = 'match_archives'",
        [],
        |row| row.get::<_, String>(0),
    );
    match result {
        Ok(value_json) => serde_json::from_str(&value_json)
            .map(Some)
            .map_err(|error| error.to_string()),
        Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
        Err(error) => Err(error.to_string()),
    }
}

#[tauri::command]
fn save_match_archives(
    runtime: State<'_, Arc<Runtime>>,
    archives: Value,
) -> Result<(), String> {
    let value_json = serde_json::to_string(&archives).map_err(|error| error.to_string())?;
    let database = runtime.database.lock().map_err(|_| "Database lock failed")?;
    database
        .execute(
            "
            INSERT INTO app_settings (key, value_json, updated_at)
            VALUES ('match_archives', ?1, ?2)
            ON CONFLICT(key) DO UPDATE SET
                value_json = excluded.value_json,
                updated_at = excluded.updated_at
            ",
            params![value_json, Utc::now().to_rfc3339()],
        )
        .map_err(|error| error.to_string())?;
    Ok(())
}

#[tauri::command]
fn runtime_info(runtime: State<'_, Arc<Runtime>>) -> RuntimeInfo {
    RuntimeInfo {
        desktop: true,
        local_ip: runtime.local_ip.clone(),
        port: runtime.port,
        viewer_url: format!(
            "http://{}:{}/scoreboard.html?role=viewer",
            runtime.local_ip, runtime.port
        ),
        field_control_url: format!(
            "http://{}:{}/index.html?role=field",
            runtime.local_ip, runtime.port
        ),
    }
}

#[tauri::command]
fn list_devices(runtime: State<'_, Arc<Runtime>>) -> Vec<DeviceInfo> {
    runtime
        .devices
        .lock()
        .map(|devices| devices.values().cloned().collect())
        .unwrap_or_default()
}

#[tauri::command]
fn save_media_asset(
    runtime: State<'_, Arc<Runtime>>,
    id: String,
    name: String,
    category: String,
    mime_type: String,
    bytes: Vec<u8>,
) -> Result<(), String> {
    runtime.save_media(&id, &name, &category, &mime_type, &bytes)
}

#[tauri::command]
fn delete_media_asset(
    runtime: State<'_, Arc<Runtime>>,
    id: String,
) -> Result<(), String> {
    runtime.delete_media(&id)
}

#[tauri::command]
fn save_export_file(
    app: AppHandle,
    file_name: String,
    bytes: Vec<u8>,
) -> Result<String, String> {
    let safe_name = file_name
        .chars()
        .map(|character| {
            if character.is_ascii_alphanumeric() || "-_. ()".contains(character) {
                character
            } else {
                '_'
            }
        })
        .collect::<String>();
    let safe_name = if safe_name.trim().is_empty() {
        "skorkita-export".to_string()
    } else {
        safe_name
    };
    let target_dir = app
        .path()
        .download_dir()
        .or_else(|_| app.path().document_dir())
        .map_err(|error| error.to_string())?;
    fs::create_dir_all(&target_dir).map_err(|error| error.to_string())?;
    let mut path = target_dir.join(&safe_name);
    if path.exists() {
        let stem = path
            .file_stem()
            .and_then(|value| value.to_str())
            .unwrap_or("export")
            .to_string();
        let extension = path
            .extension()
            .and_then(|value| value.to_str())
            .map(|value| format!(".{value}"))
            .unwrap_or_default();
        let stamp = Utc::now().format("%Y%m%d-%H%M%S");
        path = target_dir.join(format!("{stem}-{stamp}{extension}"));
    }
    fs::write(&path, &bytes).map_err(|error| error.to_string())?;
    Ok(path.to_string_lossy().to_string())
}

#[tauri::command]
fn reveal_path(path: String) -> Result<(), String> {
    let target = PathBuf::from(&path);
    if !target.exists() {
        return Err("File tidak ditemukan".to_string());
    }
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg("-R")
            .arg(&target)
            .spawn()
            .map_err(|error| error.to_string())?;
    }
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("explorer")
            .arg("/select,")
            .arg(&target)
            .spawn()
            .map_err(|error| error.to_string())?;
    }
    #[cfg(all(not(target_os = "macos"), not(target_os = "windows")))]
    {
        if let Some(parent) = target.parent() {
            std::process::Command::new("xdg-open")
                .arg(parent)
                .spawn()
                .map_err(|error| error.to_string())?;
        }
    }
    Ok(())
}

#[tauri::command]
fn open_path(path: String) -> Result<(), String> {
    let target = PathBuf::from(&path);
    if !target.exists() {
        return Err("File tidak ditemukan".to_string());
    }
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&target)
            .spawn()
            .map_err(|error| error.to_string())?;
    }
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("cmd")
            .args(["/C", "start", ""])
            .arg(&target)
            .spawn()
            .map_err(|error| error.to_string())?;
    }
    #[cfg(all(not(target_os = "macos"), not(target_os = "windows")))]
    {
        std::process::Command::new("xdg-open")
            .arg(&target)
            .spawn()
            .map_err(|error| error.to_string())?;
    }
    Ok(())
}

#[tauri::command]
fn open_viewer_window(app: AppHandle, fullscreen: bool) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("viewer") {
        window.show().map_err(|error| error.to_string())?;
        window.set_fullscreen(fullscreen).map_err(|error| error.to_string())?;
        window.set_focus().map_err(|error| error.to_string())?;
        return Ok(());
    }
    // NOTE: Do not append a query string ("?role=viewer") to WebviewUrl::App.
    // On Windows/WebView2 the "?" gets percent-encoded into the asset path,
    // producing a 404 and a blank white window. scoreboard.html already carries
    // the `display-page` body class, so the runtime defaults to the viewer role
    // without any query parameters.
    WebviewWindowBuilder::new(
        &app,
        "viewer",
        WebviewUrl::App("scoreboard.html".into()),
    )
    .title("SkorKita v1 - Scoreboard Viewer")
    .inner_size(1280.0, 720.0)
    .min_inner_size(800.0, 450.0)
    .resizable(true)
    .fullscreen(fullscreen)
    .build()
    .map_err(|error| error.to_string())?;
    Ok(())
}

#[tauri::command]
fn set_viewer_fullscreen(app: AppHandle, fullscreen: bool) -> Result<(), String> {
    let window = app
        .get_webview_window("viewer")
        .ok_or_else(|| "Viewer window is not open".to_string())?;
    window
        .set_fullscreen(fullscreen)
        .map_err(|error| error.to_string())
}

async fn websocket_handler(
    websocket: WebSocketUpgrade,
    AxumState(runtime): AxumState<Arc<Runtime>>,
    Query(params): Query<HashMap<String, String>>,
    ConnectInfo(address): ConnectInfo<SocketAddr>,
) -> impl IntoResponse {
    websocket.on_upgrade(move |socket| websocket_session(socket, runtime, params, address))
}

async fn websocket_session(
    socket: WebSocket,
    runtime: Arc<Runtime>,
    params: HashMap<String, String>,
    address: SocketAddr,
) {
    let device_id = params
        .get("deviceId")
        .cloned()
        .unwrap_or_else(|| Uuid::new_v4().to_string());
    let role = params
        .get("role")
        .cloned()
        .unwrap_or_else(|| "viewer".to_string());
    let name = params
        .get("name")
        .cloned()
        .unwrap_or_else(|| format!("{} device", role));
    let device = DeviceInfo {
        id: device_id.clone(),
        name,
        role: role.clone(),
        address: address.ip().to_string(),
        connected_at: Utc::now().to_rfc3339(),
    };
    if let Ok(mut devices) = runtime.devices.lock() {
        devices.insert(device_id.clone(), device);
    }

    let (mut sender, mut receiver) = socket.split();
    if let Ok(Some(state)) = runtime.load_state() {
        let initial = runtime.state_envelope(
            state,
            None,
            runtime.revision.load(Ordering::SeqCst),
        );
        let _ = sender.send(Message::Text(initial)).await;
    }
    let mut subscription = runtime.broadcaster.subscribe();

    loop {
        tokio::select! {
            incoming = receiver.next() => {
                let Some(Ok(message)) = incoming else { break };
                if let Message::Text(text) = message {
                    let Ok(payload) = serde_json::from_str::<Value>(&text) else { continue };
                    if payload.get("type").and_then(Value::as_str) == Some("state-update")
                        && role == "field"
                    {
                        if let Some(incoming) = payload.get("state") {
                            let state = stamp_state_revision(
                                merge_field_control_state(
                                    runtime.load_state().unwrap_or(None),
                                    incoming,
                                ),
                            );
                            if let Ok(revision) = runtime.persist_state(&state, Some(&device_id)) {
                                runtime.broadcast_state(state, Some(&device_id), revision);
                            }
                        }
                    }
                }
            }
            outgoing = subscription.recv() => {
                match outgoing {
                    Ok(message) => {
                        if sender.send(Message::Text(message)).await.is_err() {
                            break;
                        }
                    }
                    Err(broadcast::error::RecvError::Lagged(_)) => continue,
                    Err(_) => break,
                }
            }
        }
    }
    if let Ok(mut devices) = runtime.devices.lock() {
        devices.remove(&device_id);
    }
}

async fn static_assets(uri: Uri) -> Response<Body> {
    let requested = uri.path().trim_start_matches('/');
    let path = if requested.is_empty() { "index.html" } else { requested };
    match WebAssets::get(path) {
        Some(asset) => Response::builder()
            .status(StatusCode::OK)
            .header(
                header::CONTENT_TYPE,
                mime_guess::from_path(path).first_or_octet_stream().as_ref(),
            )
            .header(header::CACHE_CONTROL, "no-store")
            .body(Body::from(asset.data.into_owned()))
            .unwrap(),
        None => Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::from("Not found"))
            .unwrap(),
    }
}

async fn media_asset(
    Path(id): Path<String>,
    AxumState(runtime): AxumState<Arc<Runtime>>,
) -> Response<Body> {
    match runtime.load_media(&id) {
        Ok(Some((bytes, mime_type))) => Response::builder()
            .status(StatusCode::OK)
            .header(header::CONTENT_TYPE, mime_type)
            .header(header::CACHE_CONTROL, "public, max-age=31536000, immutable")
            .body(Body::from(bytes))
            .unwrap(),
        Ok(None) => Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::from("Media not found"))
            .unwrap(),
        Err(_) => Response::builder()
            .status(StatusCode::BAD_REQUEST)
            .body(Body::from("Invalid media request"))
            .unwrap(),
    }
}

async fn run_network_server(runtime: Arc<Runtime>) {
    let router = Router::new()
        .route(
            "/health",
            get(|| async { axum::Json(json!({ "status": "ok" })) }),
        )
        .route("/ws", get(websocket_handler))
        .route("/media/:id", get(media_asset))
        .fallback(static_assets)
        .with_state(runtime.clone());
    let address = SocketAddr::from(([0, 0, 0, 0], runtime.port));
    if let Ok(listener) = tokio::net::TcpListener::bind(address).await {
        let _ = axum::serve(
            listener,
            router.into_make_service_with_connect_info::<SocketAddr>(),
        )
        .await;
    }
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let app_data = app.path().app_data_dir()?;
            fs::create_dir_all(&app_data)?;
            let runtime = Arc::new(
                Runtime::new(app_data.join("skorkita.sqlite"))
                    .map_err(std::io::Error::other)?,
            );
            app.manage(runtime.clone());
            tauri::async_runtime::spawn(run_network_server(runtime));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            load_state,
            save_state,
            load_match_archives,
            save_match_archives,
            runtime_info,
            list_devices,
            save_media_asset,
            delete_media_asset,
            save_export_file,
            reveal_path,
            open_path,
            open_viewer_window,
            set_viewer_fullscreen
        ])
        .run(tauri::generate_context!())
        .expect("error while running SkorKita");
}

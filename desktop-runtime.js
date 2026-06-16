(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const requestedRole = params.get("role");
  const isViewerPage = document.body.classList.contains("display-page");
  const invoke = window.__TAURI__?.core?.invoke;
  const isTauri = typeof invoke === "function";
  const isLanRuntime = window.location.port === "3847";
  const isManagedRuntime = isTauri || isLanRuntime || Boolean(requestedRole);
  const validRoles = new Set(["administrator", "field", "viewer", "single"]);
  const selectedRole = validRoles.has(requestedRole)
    ? requestedRole
    : isViewerPage
      ? "viewer"
      : "administrator";
  const role =
    isLanRuntime && !isTauri && selectedRole !== "viewer"
      ? "field"
      : selectedRole;
  const deviceId =
    window.sessionStorage.getItem("skorkita-device-id") ||
    (window.crypto?.randomUUID?.() ||
      `device-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  window.sessionStorage.setItem("skorkita-device-id", deviceId);

  let runtimeInfo = null;
  let socket = null;
  let reconnectTimer = null;
  let persistChain = Promise.resolve();
  let lastOutboundState = "";
  let devicePollTimer = null;
  let viewerStatePollTimer = null;
  let lastViewerStateSnapshot = "";
  let networkStateRevision = Date.now();

  function roleLabel(value) {
    return {
      administrator: "Administrator",
      field: "Field Control",
      viewer: "Scoreboard Viewer",
      single: "Single Operator",
    }[value] || "Administrator";
  }

  function setRole(nextRole) {
    if (!validRoles.has(nextRole) || nextRole === "viewer") return;
    if (nextRole === role) return;
    const next = new URL(window.location.href);
    next.searchParams.set("role", nextRole);
    if (isTauri) next.searchParams.set("desktop", "1");
    window.location.href = next.toString();
  }

  function renderRoleInterface() {
    document.body.dataset.appRole = role;
    if (isViewerPage) {
      document.body.classList.add("viewer-mode");
      return;
    }
    if (!isManagedRuntime) return;
    const bar = document.getElementById("desktopModeBar");
    if (!bar) return;
    bar.hidden = false;
    document.getElementById("activeRoleLabel").textContent = roleLabel(role);
    const roleSwitcher = document.querySelector(".desktop-role-switcher");
    if (roleSwitcher) roleSwitcher.hidden = !isTauri;
    document.querySelectorAll("button[data-app-role]").forEach((button) => {
      button.classList.toggle("active", button.dataset.appRole === role);
      button.addEventListener("click", () => setRole(button.dataset.appRole));
    });
    if (role === "field" && window.ScoreboardApp) {
      window.ScoreboardApp.setControllerView("match");
    }
    const title = document.querySelector(".controller-hero h1");
    const description = document.querySelector(".controller-hero p");
    if (title && description && role === "field") {
      title.textContent = "Field Control";
      description.textContent =
        "Kontrol terbatas untuk skor, waktu, periode, timeout, foul, dan buzzer.";
    } else if (title && description && role === "single") {
      title.textContent = "Single Operator";
      description.textContent =
        "Kelola pertandingan dan buka Viewer pada monitor LED atau videotron.";
    }
  }

  function escapeText(value) {
    const span = document.createElement("span");
    span.textContent = value == null ? "" : String(value);
    return span.innerHTML;
  }

  function renderDevices(devices) {
    const list = document.getElementById("desktopDeviceList");
    const count = document.getElementById("desktopDeviceCount");
    if (!list || !count) return;
    count.textContent = `${devices.length} tersambung`;
    list.innerHTML = devices.length
      ? devices
          .map(
            (device) => `
              <article class="desktop-device-entry">
                <div>
                  <b>${escapeText(device.name)}</b>
                  <span>${escapeText(roleLabel(device.role))}</span>
                </div>
                <span>${escapeText(device.address)}</span>
              </article>
            `,
          )
          .join("")
      : "<p>Belum ada perangkat tersambung.</p>";
  }

  async function refreshDevices() {
    if (!isTauri || role === "field" || isViewerPage) return;
    try {
      renderDevices(await invoke("list_devices"));
    } catch {
      renderDevices([]);
    }
  }

  async function openViewer(fullscreen) {
    if (isTauri) {
      await invoke("open_viewer_window", { fullscreen: Boolean(fullscreen) });
      return;
    }
    const viewerUrl =
      runtimeInfo?.viewerUrl ||
      new URL("scoreboard.html?role=viewer", window.location.href).toString();
    window.open(viewerUrl, "skorkita-scoreboard");
  }

  function wireDesktopControls() {
    if (isViewerPage || !isManagedRuntime) return;
    document
      .getElementById("openViewerWindowButton")
      ?.addEventListener("click", () => openViewer(false));
    document
      .getElementById("openFullscreenViewerButton")
      ?.addEventListener("click", () => openViewer(true));
    document
      .getElementById("desktopDeviceCount")
      ?.closest("span")
      ?.addEventListener("click", () => {
        const panel = document.getElementById("desktopDevicePanel");
        panel.hidden = !panel.hidden;
      });
    document
      .getElementById("toggleDevicePanelButton")
      ?.addEventListener("click", () => {
        document.getElementById("desktopDevicePanel").hidden = true;
      });
  }

  function applyIncomingState(nextState, source) {
    if (!nextState || source === deviceId) return;
    if (isViewerPage) {
      window.ScoreboardViewer?.applyState(nextState);
    } else {
      window.ScoreboardApp?.applyExternalState(nextState);
    }
  }

  function websocketUrl() {
    if (isTauri) {
      return `ws://127.0.0.1:${runtimeInfo?.port || 3847}/ws`;
    }
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      return `${protocol}//${window.location.host}/ws`;
    }
    return "";
  }

  function connectRealtime() {
    const base = websocketUrl();
    if (!base || !isManagedRuntime) return;
    const query = new URLSearchParams({
      deviceId,
      role,
      name: `${roleLabel(role)} - ${navigator.platform || "Device"}`,
    });
    socket = new WebSocket(`${base}?${query}`);
    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "state") {
          networkStateRevision = Math.max(
            networkStateRevision + 1,
            Date.now(),
            Number(message.state.stateRevision || 0),
          );
          message.state.stateRevision = networkStateRevision;
          applyIncomingState(message.state, message.source);
        }
      } catch {
        // Ignore malformed network packets.
      }
    });
    socket.addEventListener("close", () => {
      window.clearTimeout(reconnectTimer);
      reconnectTimer = window.setTimeout(connectRealtime, 1500);
    });
  }

  async function persistState(nextState) {
    if (!isManagedRuntime || role === "viewer") return;
    const serialized = JSON.stringify(nextState);
    if (serialized === lastOutboundState) return;
    lastOutboundState = serialized;
    const snapshot = JSON.parse(serialized);
    if (isTauri) {
      persistChain = persistChain
        .catch(() => {})
        .then(() => invoke("save_state", { state: snapshot, source: deviceId }));
      return persistChain;
    }
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "state-update",
          source: deviceId,
          state: snapshot,
        }),
      );
    }
  }

  function mediaUrl(assetId) {
    if (!assetId || !isManagedRuntime) return "";
    if (isTauri) {
      return `http://127.0.0.1:${runtimeInfo?.port || 3847}/media/${encodeURIComponent(assetId)}`;
    }
    if (isLanRuntime) {
      return `${window.location.origin}/media/${encodeURIComponent(assetId)}`;
    }
    return "";
  }

  async function persistMediaAsset(asset) {
    if (!isTauri || !asset?.blob) return;
    const bytes = Array.from(new Uint8Array(await asset.blob.arrayBuffer()));
    await invoke("save_media_asset", {
      id: asset.id,
      name: asset.name,
      category: asset.category,
      mimeType: asset.type || "application/octet-stream",
      bytes,
    });
  }

  async function deleteMediaAsset(assetId) {
    if (!isTauri || !assetId) return;
    try {
      await invoke("delete_media_asset", { id: assetId });
    } catch {
      // IndexedDB deletion still succeeds for the browser fallback.
    }
  }

  async function migrateMediaAssets() {
    if (!isTauri || !window.ScoreboardApp?.getMediaAssets) return;
    try {
      const assets = await window.ScoreboardApp.getMediaAssets();
      for (const asset of assets) {
        await persistMediaAsset(asset);
      }
    } catch {
      // Media remains available from IndexedDB if migration is interrupted.
    }
  }

  async function hydrateDesktopState() {
    if (!isTauri || isViewerPage) return;
    try {
      const saved = await invoke("load_state");
      if (saved) {
        window.ScoreboardApp?.applyExternalState(saved);
        lastOutboundState = JSON.stringify(saved);
      } else {
        await persistState(window.ScoreboardApp?.getState());
      }
    } catch {
      // localStorage remains the offline fallback.
    }
  }

  async function pollViewerState() {
    if (!isTauri || !isViewerPage) return;
    try {
      const saved = await invoke("load_state");
      if (!saved) return;
      const serialized = JSON.stringify(saved);
      if (serialized === lastViewerStateSnapshot) return;
      lastViewerStateSnapshot = serialized;
      window.ScoreboardViewer?.applyState(saved);
    } catch {
      // WebSocket remains the primary live path when the local server is ready.
    }
  }

  async function persistMatchArchives(archives) {
    if (!isTauri || !Array.isArray(archives)) return;
    try {
      await invoke("save_match_archives", { archives });
    } catch {
      // localStorage remains the browser fallback.
    }
  }

  async function hydrateMatchArchives() {
    if (!isTauri || !window.ScoreboardApp) return;
    try {
      const archives = await invoke("load_match_archives");
      if (Array.isArray(archives)) {
        window.ScoreboardApp.applyMatchArchives(archives);
      } else {
        await persistMatchArchives(window.ScoreboardApp.getMatchArchives());
      }
    } catch {
      // Existing localStorage archives remain available.
    }
  }

  async function initializeRuntime() {
    renderRoleInterface();
    wireDesktopControls();
    if (isTauri) {
      try {
        runtimeInfo = await invoke("runtime_info");
        const address = document.getElementById("desktopLocalAddress");
        if (address) address.textContent = `${runtimeInfo.localIp}:${runtimeInfo.port}`;
        const fieldUrl = document.getElementById("fieldControlUrl");
        const viewerUrl = document.getElementById("viewerUrl");
        if (fieldUrl) fieldUrl.textContent = runtimeInfo.fieldControlUrl;
        if (viewerUrl) viewerUrl.textContent = runtimeInfo.viewerUrl;
      } catch {
        runtimeInfo = { port: 3847 };
      }
      await hydrateDesktopState();
      await hydrateMatchArchives();
      await migrateMediaAssets();
      await refreshDevices();
      devicePollTimer = window.setInterval(refreshDevices, 2000);
      if (isViewerPage) {
        await pollViewerState();
        viewerStatePollTimer = window.setInterval(pollViewerState, 400);
      }
    }
    connectRealtime();
  }

  if (isViewerPage) {
    document.querySelector(".display-board")?.addEventListener("dblclick", async () => {
      if (isTauri) {
        try {
          await invoke("set_viewer_fullscreen", { fullscreen: true });
        } catch {
          // The browser fullscreen fallback below remains available.
        }
      } else if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
    });
  }

  window.addEventListener("beforeunload", () => {
    window.clearInterval(devicePollTimer);
    window.clearInterval(viewerStatePollTimer);
    window.clearTimeout(reconnectTimer);
    socket?.close();
  });

  async function saveExportFile(fileName, bytes, { reveal = true, openAfter = false } = {}) {
    if (!isTauri) return null;
    const path = await invoke("save_export_file", {
      fileName,
      bytes: Array.from(bytes),
    });
    if (openAfter && path) {
      try {
        await invoke("open_path", { path });
        return path;
      } catch {
        // Fall through to reveal if opening fails.
      }
    }
    if (reveal && path) {
      try {
        await invoke("reveal_path", { path });
      } catch {
        // Reveal is best-effort; the file is still written.
      }
    }
    return path;
  }

  window.ScoreboardDesktop = {
    isTauri,
    role,
    persistState,
    persistMatchArchives,
    persistMediaAsset,
    deleteMediaAsset,
    mediaUrl,
    openViewer,
    saveExportFile,
  };

  initializeRuntime();
})();

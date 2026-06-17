const sportConfig = {
  football: {
    label: "SEPAK BOLA",
    governingBody: "IFAB 2026/27",
    ruleSummary: "Gol bernilai 1, dua babak 45 menit, maksimal 5 pergantian dalam 3 kesempatan, VAR dan kartu.",
    timeControlTitle: "Waktu & Babak",
    foulControlTitle: "Pelanggaran, Disiplin & Restart",
    scoreValues: [1],
    periodFormat: "half",
    clockAvailable: true,
    timerModeSelectable: true,
    supportsKnockout: true,
    primaryCounter: null,
    secondaryCounter: null,
    periodName: "BABAK",
    periods: 2,
    defaultSeconds: 0,
    regulationSeconds: 45 * 60,
    timerDirection: "up",
    maxScore: 99,
    extraTimeSeconds: 15 * 60,
    extraPeriods: 2,
    extraPeriodName: "EXTRA TIME",
    reviewName: "VAR",
    reviewRequestedByTeam: false,
    substitutionLimit: 5,
    substitutionNote: "Maksimal 5 pemain dalam satu tampilan pergantian.",
    foulNote: "Istilah mengikuti IFAB: offence, caution, sending-off, dan restart pertandingan.",
    foulEvents: [
      ["yellow-card", "Caution · Kartu Kuning", "card", "YC"],
      ["red-card", "Sending-off · Kartu Merah", "danger", "RC"],
      ["penalty", "Penalty Kick", "danger", "PK"],
      ["direct-free-kick", "Tendangan Bebas Langsung", "info", "FK"],
      ["indirect-free-kick", "Tendangan Bebas Tidak Langsung", "info", "IFK"],
      ["throw-in", "Lemparan ke Dalam", "info", "TI"],
      ["corner", "Tendangan Sudut", "info", "CK"],
      ["offside", "Offside Offence", "warning", "OF"],
    ],
  },
  futsal: {
    label: "FUTSAL",
    governingBody: "FIFA Futsal",
    ruleSummary: "Gol bernilai 1, 2 × 20 menit stop-clock, 1 timeout per babak, foul terakumulasi dan pergantian rolling.",
    timeControlTitle: "Stop-clock & Babak",
    foulControlTitle: "Foul, Disiplin & Restart",
    scoreValues: [1],
    periodFormat: "half",
    clockAvailable: true,
    timerModeSelectable: false,
    supportsKnockout: true,
    primaryCounter: { label: "Timeout babak", shortLabel: "TO", max: 1 },
    secondaryCounter: { label: "Akumulasi foul", shortLabel: "AF", max: 99, warningAt: 5 },
    periodName: "BABAK",
    periods: 2,
    defaultSeconds: 20 * 60,
    regulationSeconds: 20 * 60,
    timerDirection: "down",
    maxScore: 99,
    extraTimeSeconds: 5 * 60,
    extraPeriods: 2,
    extraPeriodName: "EXTRA TIME",
    reviewName: "VIDEO SUPPORT",
    reviewRequestedByTeam: true,
    substitutionLimit: 5,
    substitutionNote: "Pergantian rolling tidak terbatas; tampilkan maksimal 5 pemain per kejadian.",
    foulNote: "Istilah mengikuti FIFA Futsal Laws: accumulated foul, disciplinary sanction, dan restart.",
    foulEvents: [
      ["accumulated-foul", "Accumulated Foul", "warning", "AF"],
      ["yellow-card", "Caution · Kartu Kuning", "card", "YC"],
      ["red-card", "Sending-off · Kartu Merah", "danger", "RC"],
      ["penalty", "Penalty Kick", "danger", "PK"],
      ["sixth-accumulated-foul", "Tendangan Bebas Foul ke-6+", "danger", "6F"],
      ["direct-free-kick", "Tendangan Bebas Langsung", "info", "FK"],
      ["kick-in", "Kick-in", "info", "KI"],
    ],
  },
  basketball: {
    label: "BASKET",
    governingBody: "FIBA 2024",
    ruleSummary: "Skor 1/2/3 poin, 4 × 10 menit, timeout teralokasi per paruh, team foul per kuarter dan overtime 5 menit.",
    timeControlTitle: "Game Clock & Kuarter",
    foulControlTitle: "Foul & Penalty",
    scoreValues: [1, 2, 3],
    periodFormat: "quarter",
    clockAvailable: true,
    timerModeSelectable: false,
    primaryCounter: { label: "Timeout terpakai", shortLabel: "TO", max: 3 },
    secondaryCounter: { label: "Team foul kuarter", shortLabel: "FOUL", max: 99, warningAt: 4 },
    periodName: "KUARTER",
    periods: 4,
    defaultSeconds: 10 * 60,
    regulationSeconds: 10 * 60,
    timerDirection: "down",
    maxScore: 999,
    extraTimeSeconds: 5 * 60,
    extraPeriods: 9,
    extraPeriodName: "OVERTIME",
    reviewName: "COACH'S CHALLENGE",
    reviewRequestedByTeam: true,
    substitutionLimit: 5,
    substitutionNote: "Pergantian tersedia saat substitution opportunity; maksimal 5 pemain per tampilan.",
    foulNote: "Kategori mengikuti FIBA; team foul adalah akumulasi kuarter dan free throw adalah penalty.",
    foulEvents: [
      ["personal-foul", "Personal Foul", "warning", "PF"],
      ["double-foul", "Double Foul", "warning", "DF"],
      ["team-control-foul", "Team Control Foul", "danger", "TC"],
      ["technical-foul", "Technical Foul", "card", "T"],
      ["unsportsmanlike", "Unsportsmanlike Foul", "danger", "U"],
      ["disqualifying-foul", "Disqualifying Foul", "danger", "D"],
      ["free-throws", "Free Throw(s) Awarded", "info", "FT"],
    ],
  },
  badminton: {
    label: "BADMINTON",
    governingBody: "BWF Laws",
    ruleSummary: "Best of 3 game, rally point 21, wajib selisih 2 hingga batas 30; tanpa match clock dan pergantian pemain.",
    timeControlTitle: "Game & Rally Point",
    foulControlTitle: "Fault, Let & Sanksi",
    scoreValues: [1],
    periodFormat: "game",
    clockAvailable: false,
    timerModeSelectable: false,
    primaryCounter: { label: "Challenge dipakai", shortLabel: "CH", max: 2 },
    secondaryCounter: null,
    periodName: "GAME",
    periods: 3,
    defaultSeconds: 0,
    regulationSeconds: 0,
    timerDirection: "none",
    maxScore: 30,
    extraTimeSeconds: 0,
    extraPeriods: 0,
    extraPeriodName: "",
    reviewName: "CHALLENGE",
    reviewRequestedByTeam: true,
    substitutionLimit: 0,
    substitutionNote: "Pergantian pemain tidak tersedia dalam pertandingan badminton.",
    setsToWin: 2,
    foulNote: "Istilah mengikuti BWF: fault, let, warning for misconduct, fault for misconduct, dan disqualification.",
    foulEvents: [
      ["fault", "Fault", "danger", "F"],
      ["service-fault", "Service Fault", "warning", "SF"],
      ["let", "Let", "info", "L"],
      ["warning", "Warning for Misconduct", "card", "W"],
      ["misconduct", "Fault for Misconduct", "danger", "FM"],
      ["disqualification", "Disqualification", "danger", "DQ"],
    ],
  },
  volleyball: {
    label: "BOLA VOLI",
    governingBody: "FIVB 2025–2028",
    ruleSummary: "Best of 5 set, 25 poin (set kelima 15), selisih 2, 2 timeout dan 6 pergantian reguler per set.",
    timeControlTitle: "Set & Rally Point",
    foulControlTitle: "Fault & Sanksi",
    scoreValues: [1],
    periodFormat: "set",
    clockAvailable: false,
    timerModeSelectable: false,
    primaryCounter: { label: "Timeout set", shortLabel: "TO", max: 2 },
    secondaryCounter: { label: "Substitusi set", shortLabel: "SUB", max: 6 },
    periodName: "SET",
    periods: 5,
    defaultSeconds: 0,
    regulationSeconds: 0,
    timerDirection: "none",
    maxScore: 99,
    extraTimeSeconds: 0,
    extraPeriods: 0,
    extraPeriodName: "",
    reviewName: "VIDEO CHALLENGE",
    reviewRequestedByTeam: true,
    substitutionLimit: 6,
    substitutionNote: "Maksimal 6 pergantian reguler per tim dalam satu set.",
    setsToWin: 3,
    foulNote: "Istilah mengikuti FIVB: playing faults, misconduct warning, penalty, expulsion, dan disqualification.",
    foulEvents: [
      ["service-fault", "Service Fault", "warning", "SF"],
      ["positional-fault", "Positional Fault", "warning", "PF"],
      ["rotation-fault", "Rotational Fault", "warning", "RF"],
      ["net-fault", "Player's Fault at Net", "danger", "NF"],
      ["attack-fault", "Attack Hit Fault", "danger", "AF"],
      ["block-fault", "Blocking Fault", "danger", "BF"],
      ["misconduct-warning", "Misconduct Warning", "card", "YC"],
      ["misconduct-penalty", "Misconduct Penalty", "danger", "RC"],
      ["expulsion", "Expulsion", "danger", "EXP"],
      ["disqualification", "Disqualification", "danger", "DQ"],
    ],
  },
};

const CAMERA_POPUP_ENABLED = false;
const isDesktopRuntime = typeof window.__TAURI__?.core?.invoke === "function";

const defaultState = {
  schemaVersion: 7,
  matchId: "",
  eventName: "",
  eventLogo: "",
  eventLogoAssetId: "",
  eventNameSize: 100,
  eventLogoSize: 100,
  sport: "football",
  homeName: "GARUDA FC",
  awayName: "RAJAWALI FC",
  homeScore: 0,
  awayScore: 0,
  homeSets: 0,
  awaySets: 0,
  homeLogo: "",
  awayLogo: "",
  homeLogoAssetId: "",
  awayLogoAssetId: "",
  homeLogoSize: 100,
  awayLogoSize: 100,
  homeLogoFit: "auto",
  awayLogoFit: "auto",
  homeColor: "#4d8dff",
  awayColor: "#ff4d5f",
  homeTimeouts: 0,
  awayTimeouts: 0,
  homeTeamFouls: 0,
  awayTeamFouls: 0,
  homeSubstitutions: 0,
  awaySubstitutions: 0,
  scoreHistory: [],
  matchStatus: "not-started",
  stateRevision: 0,
  stateUpdatedBy: "",
  periodFormat: "half",
  period: 1,
  seconds: 0,
  timerMode: "up",
  normalTimeSeconds: 45 * 60,
  extraTimeDurationSeconds: 5 * 60,
  footballExtraTimeEnabled: true,
  footballPenaltiesEnabled: false,
  firstHalfAddedTimeMinutes: 0,
  secondHalfAddedTimeMinutes: 0,
  addedTimeActive: false,
  addedTimeSeconds: 0,
  penaltyShootoutActive: false,
  homePenaltyScore: 0,
  awayPenaltyScore: 0,
  running: false,
  timerStartedAt: 0,
  timerBaseSeconds: 0,
  timerBaseAddedSeconds: 0,
  background: "midnight",
  scoreboardStyle: "modern",
  displayTemplate: "modern",
  displayRatio: "16:9",
  customRatioWidth: 16,
  customRatioHeight: 9,
  highContrast: false,
  modernPalette: "white",
  retroPalette: "cyan",
  backgroundImage: "",
  backgroundAssetId: "",
  backgroundMediaType: "",
  backgroundScale: 100,
  backgroundOverlay: 55,
  layoutPreset: "classic",
  layoutScale: 100,
  layoutGap: 100,
  layoutVertical: 0,
  extraTime: false,
  reviewStatus: "",
  substitutionActive: false,
  substitutionExpiresAt: 0,
  substitutionTeam: "home",
  substitutions: [],
  reviewTeam: "home",
  runningText: "",
  runningTextMessages: [],
  runningTextActive: false,
  videoLoop: true,
  videoPlaying: true,
  sponsorName: "",
  sponsorLogo: "",
  sponsorLogoAssetId: "",
  sponsorTemplate: "sport",
  sponsorNameSize: 100,
  sponsorLogoSize: 100,
  sponsorPresentedByText: "PRESENTED BY",
  sponsorMode: false,
  sponsorExpiresAt: 0,
  cameraOverlayActive: false,
  cameraSourceType: "camera",
  cameraDeviceId: "",
  cameraStreamUrl: "",
  cameraFilter: "none",
  cameraEmoji: "",
  buzzerAt: 0,
  foulActive: false,
  foulExpiresAt: 0,
  foulTeam: "home",
  foulType: "",
  foulLabel: "",
  foulTone: "warning",
  foulSymbol: "!",
};

const visualStateKeys = [
  "background",
  "scoreboardStyle",
  "displayTemplate",
  "displayRatio",
  "customRatioWidth",
  "customRatioHeight",
  "highContrast",
  "modernPalette",
  "retroPalette",
  "backgroundImage",
  "backgroundAssetId",
  "backgroundMediaType",
  "backgroundScale",
  "backgroundOverlay",
  "layoutPreset",
  "layoutScale",
  "layoutGap",
  "layoutVertical",
  "eventNameSize",
  "eventLogoSize",
  "videoLoop",
  "videoPlaying",
];

function getVisualState(source) {
  return Object.fromEntries(visualStateKeys.map((key) => [key, source[key]]));
}

let state = loadState();
let matchSetupDraft = {
  eventName: state.eventName,
  eventLogo: state.eventLogo,
  eventLogoAssetId: state.eventLogoAssetId,
};
let visualDraft = getVisualState(state);
let sponsorDraft = {
  sponsorName: state.sponsorName,
  sponsorLogo: state.sponsorLogo,
  sponsorLogoAssetId: state.sponsorLogoAssetId,
  sponsorTemplate: state.sponsorTemplate,
  sponsorNameSize: state.sponsorNameSize,
  sponsorLogoSize: state.sponsorLogoSize,
  sponsorPresentedByText: state.sponsorPresentedByText,
};
let visualDraftDirty = false;
let timerId = null;
let substitutionTimerId = null;
let foulTimerId = null;
let scoreboardWindow = null;
let visibleSubstitutionRows = 1;
const controllerViews = new Set(["match", "ticker", "visual"]);
const requestedControllerTab = new URLSearchParams(window.location.search).get("tab");
let activeControllerView = controllerViews.has(requestedControllerTab)
  ? requestedControllerTab
  : controllerViews.has(window.sessionStorage.getItem("skorkita-controller-view"))
    ? window.sessionStorage.getItem("skorkita-controller-view")
    : "match";
let savedMatches = loadSavedMatches();
let sponsorTimerId = null;
let cameraPreviewStream = null;
let cameraPeerConnection = null;
let pendingCameraCandidates = [];
let cameraFrameTimer = null;
let cameraFrameSending = false;
const cameraFrameCanvas = document.createElement("canvas");
const cameraSignalChannel =
  typeof BroadcastChannel === "function"
    ? new BroadcastChannel("skorkita-camera-signal")
    : null;
let mediaAssets = [];
const mediaUrlCache = new Map();
let storageWriteTimer = null;
let pendingStorageState = "";
const controllerTabId =
  window.sessionStorage.getItem("skorkita-controller-tab-id") ||
  `controller-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
window.sessionStorage.setItem("skorkita-controller-tab-id", controllerTabId);
const controllerStateChannel =
  typeof BroadcastChannel === "function"
    ? new BroadcastChannel("skorkita-controller-state")
    : null;
const CONTROLLER_LEASE_KEY = "skorkita-controller-lease";
const CONTROLLER_LEASE_DURATION = 5000;
let controllerLeaseTimer = null;
let controllerReadOnly = false;
let stablePageHeight = 0;

const $ = (id) => document.getElementById(id);
const elements = {
  homeName: $("homeName"),
  awayName: $("awayName"),
  homeNameDisplay: $("homeNameDisplay"),
  awayNameDisplay: $("awayNameDisplay"),
  homeScoreDisplay: $("homeScoreDisplay"),
  awayScoreDisplay: $("awayScoreDisplay"),
  homeScoreControl: $("homeScoreControl"),
  awayScoreControl: $("awayScoreControl"),
  homeLogo: $("homeLogo"),
  awayLogo: $("awayLogo"),
  homeLogoFrame: $("homeLogoFrame"),
  awayLogoFrame: $("awayLogoFrame"),
  timerDisplay: $("timerDisplay"),
  minuteInput: $("minuteInput"),
  secondInput: $("secondInput"),
  periodLabel: $("periodLabel"),
  periodControlTitle: $("periodControlTitle"),
  periodControlValue: $("periodControlValue"),
  matchStatus: $("matchStatus"),
  setStrip: $("setStrip"),
  homeSetDisplay: $("homeSetDisplay"),
  awaySetDisplay: $("awaySetDisplay"),
  overlayInput: $("overlayInput"),
  overlayValue: $("overlayValue"),
  backgroundScaleInput: $("backgroundScaleInput"),
  backgroundScaleValue: $("backgroundScaleValue"),
  layoutScaleInput: $("layoutScaleInput"),
  layoutScaleValue: $("layoutScaleValue"),
  layoutGapInput: $("layoutGapInput"),
  layoutGapValue: $("layoutGapValue"),
  layoutVerticalInput: $("layoutVerticalInput"),
  layoutVerticalValue: $("layoutVerticalValue"),
  reviewControlTitle: $("reviewControlTitle"),
};

function createMatchId() {
  return `match-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const MEDIA_DB_NAME = "skorkita-media-db";
const MEDIA_STORE_NAME = "media";
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

function openMediaDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(MEDIA_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(MEDIA_STORE_NAME)) {
        const store = database.createObjectStore(MEDIA_STORE_NAME, { keyPath: "id" });
        store.createIndex("category", "category");
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllMediaAssets() {
  const database = await openMediaDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE_NAME, "readonly");
    const request = transaction.objectStore(MEDIA_STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

async function getMediaAsset(id) {
  if (!id) return null;
  const database = await openMediaDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE_NAME, "readonly");
    const request = transaction.objectStore(MEDIA_STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

async function saveMediaAsset(file, category) {
  if (!file) return null;
  if (file.size > MAX_UPLOAD_SIZE) {
    alert("Ukuran file maksimal 10 MB.");
    return null;
  }
  const asset = {
    id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    category,
    type: file.type,
    size: file.size,
    createdAt: Date.now(),
    blob: file,
  };
  const database = await openMediaDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE_NAME, "readwrite");
    transaction.objectStore(MEDIA_STORE_NAME).put(asset);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
  await window.ScoreboardDesktop?.persistMediaAsset(asset);
  await refreshMediaLibrary();
  return asset;
}

async function deleteMediaAsset(id) {
  if (!id) return;
  const database = await openMediaDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(MEDIA_STORE_NAME, "readwrite");
    transaction.objectStore(MEDIA_STORE_NAME).delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
  await window.ScoreboardDesktop?.deleteMediaAsset(id);
  if (mediaUrlCache.has(id)) {
    URL.revokeObjectURL(mediaUrlCache.get(id));
    mediaUrlCache.delete(id);
  }
  await refreshMediaLibrary();
}

async function resolveMediaUrl(assetId, fallback = "") {
  if (!assetId) return fallback || "";
  if (mediaUrlCache.has(assetId)) return mediaUrlCache.get(assetId);
  try {
    const asset = await getMediaAsset(assetId);
    if (!asset?.blob) {
      return window.ScoreboardDesktop?.mediaUrl(assetId) || fallback || "";
    }
    const url = URL.createObjectURL(asset.blob);
    mediaUrlCache.set(assetId, url);
    return url;
  } catch {
    return window.ScoreboardDesktop?.mediaUrl(assetId) || fallback || "";
  }
}

function pruneMediaUrlCache(activeAssetIds) {
  const active = new Set(activeAssetIds.filter(Boolean));
  mediaUrlCache.forEach((url, assetId) => {
    if (active.has(assetId)) return;
    URL.revokeObjectURL(url);
    mediaUrlCache.delete(assetId);
  });
}

async function refreshMediaLibrary() {
  try {
    mediaAssets = await getAllMediaAssets();
  } catch {
    mediaAssets = [];
  }
  document.querySelectorAll("[data-media-library]").forEach((select) => {
    const selected = select.value;
    const category = select.dataset.mediaLibrary;
    const placeholder = select.options[0]?.textContent || "Pustaka media";
    select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${mediaAssets
      .filter((asset) => asset.category === category)
      .map((asset) => `<option value="${asset.id}">${escapeHtml(asset.name)} · ${(asset.size / 1024 / 1024).toFixed(1)} MB</option>`)
      .join("")}`;
    if ([...select.options].some((option) => option.value === selected)) select.value = selected;
  });
}

function loadSavedMatches() {
  try {
    const matches = JSON.parse(localStorage.getItem("skorkita-match-history") || "[]");
    return Array.isArray(matches) ? matches : [];
  } catch {
    return [];
  }
}

function saveMatchArchive() {
  try {
    const archives = savedMatches.slice(0, 20);
    localStorage.setItem("skorkita-match-history", JSON.stringify(archives));
    window.ScoreboardDesktop?.persistMatchArchives(archives);
    return true;
  } catch {
    alert("Penyimpanan browser penuh. Hapus background besar atau kurangi arsip pertandingan.");
    return false;
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("skorkita-state"));
    const merged = { ...defaultState, ...saved };
    if (!Array.isArray(merged.substitutions)) merged.substitutions = [];
    if (!Array.isArray(merged.scoreHistory)) merged.scoreHistory = [];
    if (!Array.isArray(saved?.runningTextMessages)) {
      merged.runningTextMessages = merged.runningText ? [merged.runningText] : [];
    }
    merged.runningTextMessages = merged.runningTextMessages
      .map((message) => String(message || "").trim())
      .filter(Boolean)
      .slice(0, 20);
    merged.runningText = merged.runningTextMessages.join("  •  ");
    if (!merged.runningTextMessages.length) merged.runningTextActive = false;
    if (!CAMERA_POPUP_ENABLED) merged.cameraOverlayActive = false;
    if (!merged.matchId) merged.matchId = createMatchId();
    if (!saved?.displayTemplate) {
      merged.displayTemplate = saved?.scoreboardStyle === "retro" ? "retro" : "modern";
    }
    if (!saved?.periodFormat) {
      merged.periodFormat =
        merged.sport === "basketball"
          ? "quarter"
          : merged.sport === "badminton" || merged.sport === "volleyball"
            ? "set"
            : "half";
    }
    const loadedConfig = sportConfig[merged.sport] || sportConfig.football;
    if (
      merged.sport === "volleyball" &&
      !Number.isFinite(saved?.homeSubstitutions) &&
      !Number.isFinite(saved?.awaySubstitutions)
    ) {
      merged.homeSubstitutions = Number(merged.homeTeamFouls || 0);
      merged.awaySubstitutions = Number(merged.awayTeamFouls || 0);
      merged.homeTeamFouls = 0;
      merged.awayTeamFouls = 0;
    }
    merged.periodFormat = loadedConfig.periodFormat;
    if (!loadedConfig.timerModeSelectable) {
      merged.timerMode = loadedConfig.timerDirection === "down" ? "down" : "up";
    }
    merged.schemaVersion = 7;
    if (merged.backgroundImage && !merged.backgroundMediaType) merged.backgroundMediaType = "image";
    if (!merged.timerMode || merged.timerMode === "none") {
      merged.timerMode = sportConfig[merged.sport]?.timerDirection === "down" ? "down" : "up";
    }
    if (!Number.isFinite(merged.normalTimeSeconds)) {
      merged.normalTimeSeconds = sportConfig[merged.sport]?.regulationSeconds || merged.seconds;
    }
    if (!Number.isFinite(merged.extraTimeDurationSeconds)) merged.extraTimeDurationSeconds = 5 * 60;
    ["timerStartedAt", "timerBaseSeconds", "timerBaseAddedSeconds"].forEach((key) => {
      if (!Number.isFinite(merged[key])) merged[key] = 0;
    });
    ["sponsorExpiresAt", "foulExpiresAt", "substitutionExpiresAt"].forEach((key) => {
      if (!Number.isFinite(merged[key])) merged[key] = 0;
    });
    expireTransientState(merged);
    if (merged.running && !merged.timerStartedAt) {
      merged.timerStartedAt = Date.now();
      merged.timerBaseSeconds = merged.seconds;
      merged.timerBaseAddedSeconds = merged.addedTimeSeconds;
    }
    return merged;
  } catch {
    return { ...defaultState, matchId: createMatchId() };
  }
}

function flushStateStorage() {
  if (!pendingStorageState) return;
  try {
    localStorage.setItem("skorkita-state", pendingStorageState);
  } catch {
    // Desktop SQLite and direct realtime sync remain available.
  }
  pendingStorageState = "";
  storageWriteTimer = null;
}

function scheduleStateStorage(serialized) {
  pendingStorageState = serialized;
  if (storageWriteTimer) return;
  storageWriteTimer = window.setTimeout(flushStateStorage, 100);
}

function saveState() {
  if (controllerReadOnly) return;
  state.schemaVersion = 7;
  state.stateRevision = Math.max(
    Number(state.stateRevision || 0) + 1,
    Date.now(),
  );
  state.stateUpdatedBy = controllerTabId;
  const serialized = JSON.stringify(state);
  scheduleStateStorage(serialized);
  if (scoreboardWindow && !scoreboardWindow.closed) {
    scoreboardWindow.postMessage(
      { type: "skorkita-state", state },
      getPostMessageTargetOrigin(),
    );
  }
  controllerStateChannel?.postMessage({
    type: "state",
    source: controllerTabId,
    state,
  });
  window.ScoreboardDesktop?.persistState(state);
  syncCameraStreamToScoreboard();
}

function applyExternalState(nextState) {
  if (!nextState || typeof nextState !== "object") return;
  if (
    Number(nextState.stateRevision || 0) &&
    Number(nextState.stateRevision || 0) <= Number(state.stateRevision || 0)
  ) {
    return;
  }
  const keepLocalTimer = Boolean(timerId && nextState.running);
  if (!keepLocalTimer) stopTimer();
  state = { ...defaultState, ...nextState };
  if (!Array.isArray(state.substitutions)) state.substitutions = [];
  if (!Array.isArray(state.scoreHistory)) state.scoreHistory = [];
  if (!Array.isArray(state.runningTextMessages)) state.runningTextMessages = [];
  if (!CAMERA_POPUP_ENABLED) state.cameraOverlayActive = false;
  expireTransientState(state);
  matchSetupDraft = {
    eventName: state.eventName,
    eventLogo: state.eventLogo,
    eventLogoAssetId: state.eventLogoAssetId,
  };
  visualDraft = getVisualState(state);
  sponsorDraft = {
    sponsorName: state.sponsorName,
    sponsorLogo: state.sponsorLogo,
    sponsorLogoAssetId: state.sponsorLogoAssetId,
    sponsorTemplate: state.sponsorTemplate,
    sponsorNameSize: state.sponsorNameSize,
    sponsorLogoSize: state.sponsorLogoSize,
    sponsorPresentedByText: state.sponsorPresentedByText,
  };
  visualDraftDirty = false;
  visibleSubstitutionRows = Math.max(1, state.substitutions.length);
  scheduleStateStorage(JSON.stringify(state));
  restoreRuntimeState();
  render();
}

function syncCameraStreamToScoreboard() {
  if (
    state.cameraSourceType === "screen" &&
    scoreboardWindow &&
    !scoreboardWindow.closed
  ) {
    try {
      if (typeof scoreboardWindow.setEntertainmentCameraStream === "function") {
        scoreboardWindow.setEntertainmentCameraStream(cameraPreviewStream);
        return;
      }
    } catch {
      // Fall through to WebRTC when direct same-origin access is unavailable.
    }
  }
  if (
    state.cameraSourceType === "screen" &&
    state.cameraOverlayActive &&
    cameraPreviewStream
  ) {
    startCameraPeerConnection();
  }
}

function stopCameraFrameRelay() {
  if (cameraFrameTimer) window.clearInterval(cameraFrameTimer);
  cameraFrameTimer = null;
  cameraFrameSending = false;
  if (scoreboardWindow && !scoreboardWindow.closed) {
    scoreboardWindow.postMessage(
      { type: "skorkita-camera-frame-close" },
      getPostMessageTargetOrigin(),
    );
  }
}

function startCameraFrameRelay() {
  stopCameraFrameRelay();
  if (
    state.cameraSourceType !== "camera" ||
    !cameraPreviewStream ||
    !scoreboardWindow ||
    scoreboardWindow.closed
  ) {
    return;
  }
  const preview = $("cameraPreviewVideo");
  cameraFrameCanvas.width = 960;
  cameraFrameCanvas.height = 540;
  const context = cameraFrameCanvas.getContext("2d", { alpha: false });
  const sendFrame = () => {
    if (
      cameraFrameSending ||
      !state.cameraOverlayActive ||
      !scoreboardWindow ||
      scoreboardWindow.closed ||
      preview.readyState < 2
    ) {
      return;
    }
    cameraFrameSending = true;
    context.drawImage(preview, 0, 0, cameraFrameCanvas.width, cameraFrameCanvas.height);
    scoreboardWindow.postMessage(
      {
        type: "skorkita-camera-frame",
        frame: cameraFrameCanvas.toDataURL("image/jpeg", 0.68),
      },
      getPostMessageTargetOrigin(),
    );
    cameraFrameSending = false;
  };
  sendFrame();
  cameraFrameTimer = window.setInterval(sendFrame, 125);
}

function closeCameraPeerConnection() {
  if (cameraPeerConnection) cameraPeerConnection.close();
  cameraPeerConnection = null;
  pendingCameraCandidates = [];
}

async function startCameraPeerConnection() {
  if (!cameraPreviewStream) return;
  if (
    cameraPeerConnection &&
    ["new", "connecting", "connected"].includes(cameraPeerConnection.connectionState)
  ) {
    return;
  }
  closeCameraPeerConnection();
  const connection = new RTCPeerConnection();
  cameraPeerConnection = connection;
  cameraPreviewStream.getTracks().forEach((track) => {
    connection.addTrack(track, cameraPreviewStream);
  });
  connection.addEventListener("icecandidate", (event) => {
    if (!event.candidate) return;
    const message = { type: "skorkita-camera-ice", candidate: event.candidate };
    if (scoreboardWindow && !scoreboardWindow.closed) {
      scoreboardWindow.postMessage(message, getPostMessageTargetOrigin());
    } else {
      cameraSignalChannel?.postMessage(message);
    }
  });
  try {
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    const message = {
      type: "skorkita-camera-offer",
      offer: connection.localDescription,
    };
    if (scoreboardWindow && !scoreboardWindow.closed) {
      scoreboardWindow.postMessage(message, getPostMessageTargetOrigin());
    } else {
      cameraSignalChannel?.postMessage(message);
    }
  } catch {
    closeCameraPeerConnection();
  }
}

function syncVisualPreview() {
  const frame = $("visualPreviewFrame");
  if (!frame?.contentWindow) return;
  fitVisualPreview();
  frame.contentWindow.postMessage(
    { type: "skorkita-preview-state", state: { ...state, ...visualDraft } },
    getPostMessageTargetOrigin(),
  );
}

let sponsorPreviewRequest = 0;

async function renderSponsorPreview() {
  const request = ++sponsorPreviewRequest;
  const source = await resolveMediaUrl(
    sponsorDraft.sponsorLogoAssetId,
    sponsorDraft.sponsorLogo,
  );
  if (request !== sponsorPreviewRequest) return;
  const screen = $("sponsorPreviewScreen");
  const logo = $("sponsorPreviewLogo");
  const name = $("sponsorPreviewName");
  const hasName = Boolean(sponsorDraft.sponsorName.trim());
  const hasLogo = Boolean(source);
  screen.dataset.template = sponsorDraft.sponsorTemplate || "sport";
  screen.dataset.sport = state.sport;
  const nameSize = (Number(sponsorDraft.sponsorNameSize) || 100) / 100;
  const logoSize = (Number(sponsorDraft.sponsorLogoSize) || 100) / 100;
  logo.src = source || "";
  logo.hidden = !hasLogo;
  logo.style.transform = `scale(${logoSize})`;
  name.textContent = sponsorDraft.sponsorName.trim();
  name.hidden = !hasName;
  name.style.fontSize = `${nameSize}em`;
  const kicker = $("sponsorPreviewKicker");
  const kickerText = (sponsorDraft.sponsorPresentedByText ?? "PRESENTED BY").trim();
  if (kicker) {
    kicker.textContent = kickerText;
    kicker.hidden = !kickerText;
  }
  $("sponsorPreviewEmpty").hidden = hasName || hasLogo;
  $("sponsorModeButton").disabled = !hasName && !hasLogo;
  // Sync sponsor tuning controls (avoid clobbering while user is typing).
  if (document.activeElement !== $("sponsorPresentedByInput")) {
    $("sponsorPresentedByInput").value = sponsorDraft.sponsorPresentedByText ?? "PRESENTED BY";
  }
  $("sponsorNameSizeInput").value = sponsorDraft.sponsorNameSize ?? 100;
  $("sponsorNameSizeValue").textContent = `${sponsorDraft.sponsorNameSize ?? 100}%`;
  $("sponsorLogoSizeInput").value = sponsorDraft.sponsorLogoSize ?? 100;
  $("sponsorLogoSizeValue").textContent = `${sponsorDraft.sponsorLogoSize ?? 100}%`;
}

function fitVisualPreview() {
  const screen = document.querySelector(".visual-preview-screen");
  const frame = $("visualPreviewFrame");
  if (!screen || !frame) return;
  const ratioWidth =
    visualDraft.displayRatio === "4:3"
      ? 4
      : visualDraft.displayRatio === "custom"
        ? Math.max(1, Number(visualDraft.customRatioWidth) || 16)
        : 16;
  const ratioHeight =
    visualDraft.displayRatio === "4:3"
      ? 3
      : visualDraft.displayRatio === "custom"
        ? Math.max(1, Number(visualDraft.customRatioHeight) || 9)
        : 9;
  const virtualWidth = 1280;
  const virtualHeight = Math.round(virtualWidth * ratioHeight / ratioWidth);
  screen.style.aspectRatio = `${ratioWidth} / ${ratioHeight}`;
  const scale = Math.min(
    screen.clientWidth / virtualWidth,
    screen.clientHeight / virtualHeight,
  );
  frame.style.width = `${virtualWidth}px`;
  frame.style.height = `${virtualHeight}px`;
  frame.style.transform = `scale(${scale})`;
}

function updateVisualDraft(changes) {
  Object.assign(visualDraft, changes);
  visualDraftDirty = visualStateKeys.some((key) => visualDraft[key] !== state[key]);
  render();
}

let scrollRestoreToken = 0;
function restoreScrollPosition(scrollX, scrollY) {
  const token = ++scrollRestoreToken;
  const apply = () => {
    if (token !== scrollRestoreToken) return;
    window.scrollTo(scrollX, scrollY);
  };
  window.requestAnimationFrame(() => {
    apply();
    window.requestAnimationFrame(apply);
  });
}

let scrollLockY = null;
let scrollLockX = null;
let scrollLockExpires = 0;
let scrollLockRafId = null;
function runScrollLockFrame() {
  scrollLockRafId = null;
  if (Date.now() > scrollLockExpires || scrollLockY == null) {
    scrollLockY = null;
    scrollLockX = null;
    return;
  }
  if (window.scrollY !== scrollLockY || window.scrollX !== scrollLockX) {
    console.log("[scroll-lock] correcting", { from: window.scrollY, to: scrollLockY });
    window.scrollTo(scrollLockX, scrollLockY);
  }
  scrollLockRafId = window.requestAnimationFrame(runScrollLockFrame);
}
function startScrollLock() {
  scrollLockX = window.scrollX;
  scrollLockY = window.scrollY;
  scrollLockExpires = Date.now() + 600;
  if (scrollLockRafId == null) {
    scrollLockRafId = window.requestAnimationFrame(runScrollLockFrame);
  }
}

const SCROLL_LOCK_SELECTOR =
  "button, [role='button'], a, [data-controller-target], [data-team], [data-counter], [data-action], [data-amount], [data-set-team], [data-apply-manual-score], [data-logo-fit-team], [data-app-role], [data-timer-mode]";
document.addEventListener("pointerdown", (event) => {
  if (event.target?.closest?.(SCROLL_LOCK_SELECTOR)) startScrollLock();
}, true);
document.addEventListener("click", (event) => {
  if (event.target?.closest?.(SCROLL_LOCK_SELECTOR)) startScrollLock();
}, true);

function stabilizePageHeight() {
  stablePageHeight = Math.max(
    stablePageHeight,
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    window.innerHeight,
  );
  document.documentElement.style.minHeight = `${stablePageHeight}px`;
  document.body.style.minHeight = `${stablePageHeight}px`;
}

function setControllerView(view) {
  if (!controllerViews.has(view)) return;
  const previousScrollX = window.scrollX;
  const previousScrollY = window.scrollY;
  stabilizePageHeight();
  activeControllerView = view;
  window.sessionStorage.setItem("skorkita-controller-view", view);
  document.querySelectorAll("[data-controller-view]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.controllerView === view);
  });
  document.querySelectorAll("[data-controller-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.controllerTarget === view);
    button.setAttribute("aria-pressed", String(button.dataset.controllerTarget === view));
  });
  if (view === "visual") window.requestAnimationFrame(syncVisualPreview);
  restoreScrollPosition(previousScrollX, previousScrollY);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(Math.max(0, totalSeconds) / 60);
  const seconds = Math.max(0, totalSeconds) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function expireTransientState(targetState) {
  const now = Date.now();
  [
    ["sponsorMode", "sponsorExpiresAt"],
    ["foulActive", "foulExpiresAt"],
    ["substitutionActive", "substitutionExpiresAt"],
  ].forEach(([activeKey, expiresKey]) => {
    if (targetState[activeKey] && Number(targetState[expiresKey] || 0) <= now) {
      targetState[activeKey] = false;
      targetState[expiresKey] = 0;
    }
  });
}

function clearSponsor() {
  if (sponsorTimerId) window.clearTimeout(sponsorTimerId);
  sponsorTimerId = null;
  state.sponsorMode = false;
  state.sponsorExpiresAt = 0;
  saveState();
  render();
}

function restoreTransientTimers() {
  if (sponsorTimerId) window.clearTimeout(sponsorTimerId);
  if (foulTimerId) window.clearTimeout(foulTimerId);
  if (substitutionTimerId) window.clearTimeout(substitutionTimerId);
  sponsorTimerId = null;
  foulTimerId = null;
  substitutionTimerId = null;
  const now = Date.now();
  if (state.sponsorMode && state.sponsorExpiresAt > now) {
    sponsorTimerId = window.setTimeout(
      clearSponsor,
      state.sponsorExpiresAt - now,
    );
  }
  if (state.foulActive && state.foulExpiresAt > now) {
    foulTimerId = window.setTimeout(
      clearFoul,
      state.foulExpiresAt - now,
    );
  }
  if (state.substitutionActive && state.substitutionExpiresAt > now) {
    substitutionTimerId = window.setTimeout(
      clearSubstitution,
      state.substitutionExpiresAt - now,
    );
  }
}

function getPostMessageTargetOrigin() {
  return window.location.origin === "null" ? "*" : window.location.origin;
}

function isTrustedMessageEvent(event, expectedSource = null) {
  const sameOrigin =
    event.origin === window.location.origin ||
    (window.location.origin === "null" && event.origin === "null");
  return sameOrigin && (!expectedSource || event.source === expectedSource);
}

function readControllerLease() {
  try {
    return JSON.parse(localStorage.getItem(CONTROLLER_LEASE_KEY) || "null");
  } catch {
    return null;
  }
}

function renderControllerLeaseState() {
  let banner = document.getElementById("controllerLeaseBanner");
  if (!controllerReadOnly) {
    banner?.remove();
    document.body.classList.remove("controller-read-only");
    return;
  }
  document.body.classList.add("controller-read-only");
  if (!banner) {
    banner = document.createElement("aside");
    banner.id = "controllerLeaseBanner";
    banner.className = "controller-lease-banner";
    banner.innerHTML =
      "<strong>Mode pantau</strong><span>Controller utama aktif di tab lain. Tutup tab utama atau tunggu beberapa detik untuk mengambil alih.</span>";
    document.body.appendChild(banner);
  }
}

function renewControllerLease() {
  const now = Date.now();
  const lease = readControllerLease();
  const anotherControllerActive =
    !isDesktopRuntime &&
    lease &&
    lease.id !== controllerTabId &&
    Number(lease.expiresAt || 0) > now;
  controllerReadOnly = Boolean(anotherControllerActive);
  if (!controllerReadOnly) {
    try {
      localStorage.setItem(
        CONTROLLER_LEASE_KEY,
        JSON.stringify({
          id: controllerTabId,
          expiresAt: now + CONTROLLER_LEASE_DURATION,
        }),
      );
    } catch {
      // A failed lease falls back to revision-based synchronization.
    }
  }
  renderControllerLeaseState();
}

function releaseControllerLease() {
  const lease = readControllerLease();
  if (lease?.id === controllerTabId) {
    localStorage.removeItem(CONTROLLER_LEASE_KEY);
  }
}

function getSecondaryCounterKey(team) {
  return state.sport === "volleyball"
    ? `${team}Substitutions`
    : `${team}TeamFouls`;
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = value == null ? "" : String(value);
  return element.innerHTML;
}

function getPeriodLabel(config) {
  const labels = {
    quarter: "KUARTER",
    half: "BABAK",
    set: "SET",
    game: "GAME",
  };
  return labels[state.periodFormat] || config.periodName;
}

function getCounterLimit(config, counterName) {
  if (state.sport === "basketball" && counterName === "primary") {
    if (state.extraTime) return 1;
    return state.period <= 2 ? 2 : 3;
  }
  return config[`${counterName}Counter`]?.max || 0;
}

function isMatchSetupDraftDirty() {
  return (
    matchSetupDraft.eventName !== state.eventName ||
    matchSetupDraft.eventLogo !== state.eventLogo ||
    matchSetupDraft.eventLogoAssetId !== state.eventLogoAssetId
  );
}

function resetSportCountersForNewPeriod(previousPeriod, nextPeriod) {
  if (previousPeriod === nextPeriod) return;
  if (state.sport === "futsal" || state.sport === "volleyball") {
    state.homeTimeouts = 0;
    state.awayTimeouts = 0;
    if (state.sport === "volleyball") {
      state.homeSubstitutions = 0;
      state.awaySubstitutions = 0;
    } else {
      state.homeTeamFouls = 0;
      state.awayTeamFouls = 0;
    }
  } else if (state.sport === "badminton") {
    state.homeTimeouts = 0;
    state.awayTimeouts = 0;
  } else if (state.sport === "basketball") {
    state.homeTeamFouls = 0;
    state.awayTeamFouls = 0;
    if (nextPeriod === 3 || state.extraTime) {
      state.homeTimeouts = 0;
      state.awayTimeouts = 0;
    }
  }
}

function renderSavedMatches() {
  const container = $("savedMatchList");
  if (!savedMatches.length) {
    container.innerHTML = "<p>Belum ada pertandingan tersimpan.</p>";
    return;
  }
  container.innerHTML = savedMatches
    .slice(0, 10)
    .map((match) => {
      const penalties = match.footballPenaltiesEnabled &&
        (match.penaltyShootoutActive || match.homePenaltyScore || match.awayPenaltyScore)
        ? ` (pen. ${match.homePenaltyScore || 0}-${match.awayPenaltyScore || 0})`
        : "";
      return `
      <article class="saved-match-item" data-match-id="${escapeHtml(match.matchId || "")}">
        <div>
          <strong>${escapeHtml(match.eventName || "Pertandingan")}</strong>
          <span>${escapeHtml(match.homeName)} ${match.homeScore} - ${match.awayScore}${penalties} ${escapeHtml(match.awayName)}</span>
          <small>${new Date(match.savedAt).toLocaleString("id-ID")} · ${escapeHtml(match.matchStatus)}</small>
        </div>
        <div class="saved-match-actions">
          <button type="button" data-archive-export-pdf="${escapeHtml(match.matchId || "")}">Ekspor PDF</button>
          <button type="button" data-archive-export-csv="${escapeHtml(match.matchId || "")}">Ekspor CSV</button>
          <button type="button" class="saved-match-delete" data-archive-delete="${escapeHtml(match.matchId || "")}">Hapus</button>
        </div>
      </article>
    `;
    })
    .join("");
}

function renderRunningTextQueue() {
  const messages = state.runningTextMessages;
  $("runningTextQueue").innerHTML = messages.length
    ? messages
        .map(
          (message, index) => `
            <article>
              <span>${index + 1}</span>
              <p>${escapeHtml(message)}</p>
              <button type="button" data-delete-running-text="${index}" aria-label="Hapus pesan ${index + 1}">Hapus</button>
            </article>
          `,
        )
        .join("")
    : "<p>Belum ada pesan dalam antrean.</p>";
  $("toggleRunningTextButton").disabled = !messages.length;
  $("toggleRunningTextButton").textContent = state.runningTextActive ? "Ⅱ Pause" : "▶ Play";
  $("toggleRunningTextButton").classList.toggle("active", state.runningTextActive);
  $("clearRunningTextButton").disabled = !messages.length;
}

function getCameraFilterValue(filter) {
  return {
    vivid: "saturate(1.45) contrast(1.12)",
    cool: "saturate(1.15) contrast(1.08) hue-rotate(175deg)",
    mono: "grayscale(1) contrast(1.18)",
    sepia: "sepia(0.82) contrast(1.08) saturate(1.2)",
  }[filter] || "none";
}

function renderCameraControls() {
  document.querySelector(".camera-controller-card").hidden = !CAMERA_POPUP_ENABLED;
  if (!CAMERA_POPUP_ENABLED) return;
  const isStream = state.cameraSourceType === "stream";
  const isCamera = state.cameraSourceType === "camera";
  $("cameraSourceType").value = state.cameraSourceType;
  $("cameraDeviceSelect").value = state.cameraDeviceId;
  $("cameraDeviceField").hidden = !isCamera;
  $("cameraStreamField").hidden = !isStream;
  if (document.activeElement !== $("cameraStreamUrl")) {
    $("cameraStreamUrl").value = state.cameraStreamUrl;
  }
  $("cameraFilterSelect").value = state.cameraFilter;
  $("cameraPreviewEmoji").textContent = state.cameraEmoji;
  document.querySelectorAll("[data-camera-emoji]").forEach((button) => {
    button.classList.toggle("active", button.dataset.cameraEmoji === state.cameraEmoji);
  });
  const preview = $("cameraPreviewVideo");
  preview.style.filter = getCameraFilterValue(state.cameraFilter);
  $("cameraPreviewPlaceholder").hidden = Boolean(preview.srcObject || preview.currentSrc);
  $("cameraPreviewStatus").textContent =
    preview.srcObject || preview.currentSrc ? "READY" : "OFFLINE";
  $("playCameraButton").disabled =
    isStream ? !state.cameraStreamUrl.trim() : !cameraPreviewStream;
  $("closeCameraButton").disabled = !state.cameraOverlayActive;
  $("playCameraButton").classList.toggle("active", state.cameraOverlayActive);
}

function getRallyStatus() {
  if (state.sport === "badminton") {
    if (state.homeScore === 29 && state.awayScore === 29) return "FINAL POINT";
    if (state.homeScore >= 20 && state.awayScore >= 20 && state.homeScore === state.awayScore) return "DEUCE";
    if (Math.max(state.homeScore, state.awayScore) >= 20 && Math.abs(state.homeScore - state.awayScore) === 1) {
      return "GAME POINT";
    }
  }
  if (state.sport === "volleyball") {
    const target = state.period === 5 ? 15 : 25;
    if (state.homeScore >= target - 1 && state.awayScore >= target - 1 && state.homeScore === state.awayScore) {
      return "DEUCE";
    }
    if (Math.max(state.homeScore, state.awayScore) >= target - 1 && Math.abs(state.homeScore - state.awayScore) === 1) {
      return "SET POINT";
    }
  }
  return "";
}

async function renderLogo(team) {
  const image = elements[`${team}Logo`];
  const frame = elements[`${team}LogoFrame`];
  const logo = await resolveMediaUrl(
    state[`${team}LogoAssetId`],
    state[`${team}Logo`],
  );
  image.src = logo || "";
  image.hidden = !logo;
  frame.querySelector(".logo-placeholder").hidden = Boolean(logo);
}

function render() {
  const previousScrollX = window.scrollX;
  const previousScrollY = window.scrollY;
  stabilizePageHeight();
  pruneMediaUrlCache([
    state.eventLogoAssetId,
    state.homeLogoAssetId,
    state.awayLogoAssetId,
    state.sponsorLogoAssetId,
    state.backgroundAssetId,
    matchSetupDraft.eventLogoAssetId,
    sponsorDraft.sponsorLogoAssetId,
    visualDraft.backgroundAssetId,
  ]);
  const config = sportConfig[state.sport];
  const periodName = getPeriodLabel(config);
  const periodText = state.penaltyShootoutActive
    ? "ADU PENALTI"
    : state.extraTime
      ? `${config.extraPeriodName} ${state.period}`
      : `${periodName} ${state.period}`;
  if (document.activeElement !== $("eventNameInput")) {
    $("eventNameInput").value = matchSetupDraft.eventName;
  }
  $("periodFormatSelect").value = state.periodFormat;
  $("matchDurationInput").value = Math.round(state.normalTimeSeconds / 60);
  $("periodFormatSelect").disabled = true;
  $("matchDurationField").hidden = !config.clockAvailable;
  $("sportRuleTitle").textContent = `${config.label} · ${config.governingBody}`;
  $("sportRuleSummary").textContent = config.ruleSummary;
  $("timeControlTitle").textContent = config.timeControlTitle;
  $("foulControlTitle").textContent = config.foulControlTitle;
  $("removeEventLogoButton").hidden =
    !matchSetupDraft.eventLogo && !matchSetupDraft.eventLogoAssetId;
  const matchSetupDirty = isMatchSetupDraftDirty();
  $("matchSetupDraftStatus").textContent = matchSetupDirty ? "DRAFT" : "LIVE";
  $("matchSetupDraftStatus").classList.toggle("is-draft", matchSetupDirty);
  $("applyMatchSetupButton").disabled = !matchSetupDirty;
  $("footballPhaseOptions").hidden = !config.supportsKnockout;
  $("knockoutPhaseLegend").textContent =
    `Fase knock-out ${state.sport === "futsal" ? "futsal" : "sepak bola"}`;
  $("knockoutExtraTimeLabel").textContent =
    `Gunakan extra time 2 × ${Math.round(config.extraTimeSeconds / 60)} menit`;
  $("footballExtraTimeEnabled").checked = state.footballExtraTimeEnabled;
  $("footballPenaltiesEnabled").checked = state.footballPenaltiesEnabled;
  $("firstHalfAddedTimeInput").value = state.firstHalfAddedTimeMinutes;
  $("secondHalfAddedTimeInput").value = state.secondHalfAddedTimeMinutes;
  $("normalAddedTimeSetup").hidden = !config.supportsKnockout;
  $("homeColorInput").value = state.homeColor;
  $("awayColorInput").value = state.awayColor;
  $("homeManualScore").value = state.homeScore;
  $("awayManualScore").value = state.awayScore;
  $("homeTimeoutsControl").textContent = state.homeTimeouts;
  $("awayTimeoutsControl").textContent = state.awayTimeouts;
  $("homeTeamFoulsControl").textContent = state[getSecondaryCounterKey("home")];
  $("awayTeamFoulsControl").textContent = state[getSecondaryCounterKey("away")];
  $("undoScoreButton").disabled = !state.scoreHistory.length;
  $("finishMatchButton").textContent =
    state.matchStatus === "finished" ? "Pertandingan Selesai" : "Selesaikan";
  $("finishMatchButton").disabled = state.matchStatus === "finished";
  elements.homeName.value = state.homeName;
  elements.awayName.value = state.awayName;
  elements.homeNameDisplay.textContent = state.homeName || "TIM A";
  elements.awayNameDisplay.textContent = state.awayName || "TIM B";
  elements.homeScoreDisplay.textContent = state.homeScore;
  elements.awayScoreDisplay.textContent = state.awayScore;
  elements.homeScoreControl.textContent = state.homeScore;
  elements.awayScoreControl.textContent = state.awayScore;
  elements.timerDisplay.textContent = state.penaltyShootoutActive
    ? "PEN"
    : config.timerDirection === "none"
      ? "VS"
      : formatTime(state.seconds);
  $("controllerAddedTime").hidden = !state.addedTimeActive;
  $("controllerAddedTime").textContent = `+${formatTime(state.addedTimeSeconds)}`;
  elements.minuteInput.value = Math.floor(state.seconds / 60);
  elements.secondInput.value = state.seconds % 60;
  elements.periodLabel.textContent = periodText;
  elements.periodControlTitle.textContent = state.extraTime ? config.extraPeriodName : periodName;
  elements.periodControlValue.textContent = state.period;
  elements.matchStatus.textContent = config.label;
  elements.homeSetDisplay.textContent = state.homeSets;
  elements.awaySetDisplay.textContent = state.awaySets;
  const isSetSport = state.sport === "badminton" || state.sport === "volleyball";
  elements.setStrip.hidden = !isSetSport;
  $("setStripLabel").textContent = state.sport === "badminton" ? "GAME" : "SET";
  elements.minuteInput.disabled = config.timerDirection === "none";
  elements.secondInput.disabled = config.timerDirection === "none";
  elements.timerDisplay.classList.toggle("running", state.running);
  const timerUnavailable = config.timerDirection === "none";
  $("startTimerButton").disabled = timerUnavailable || state.running;
  $("pauseTimerButton").disabled = timerUnavailable || !state.running;
  $("stopTimerButton").disabled = timerUnavailable;
  $("restartTimerButton").disabled = timerUnavailable;
  $("startTimerButton").classList.toggle("active", state.running);
  $("timerModeControl").hidden = !config.clockAvailable || !config.timerModeSelectable;
  $("matchClockInputs").hidden = !config.clockAvailable;
  $("transportControls").hidden = !config.clockAvailable;
  $("resetTimerButton").hidden = !config.clockAvailable;
  document.querySelectorAll("[data-timer-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.timerMode === state.timerMode);
  });
  $("extraTimeMinuteInput").value = Math.max(1, Math.round(state.extraTimeDurationSeconds / 60));
  elements.reviewControlTitle.textContent = config.reviewName;
  $("reviewControlDescription").textContent =
    config.reviewRequestedByTeam
      ? `Pilih tim pemohon lalu tampilkan status ${config.reviewName.toLowerCase()}.`
      : "VAR dijalankan oleh perangkat pertandingan, bukan diajukan oleh tim.";
  document.querySelector(".review-team-choice").hidden = !config.reviewRequestedByTeam;
  $("startReviewButton").innerHTML =
    `<span></span>${state.reviewStatus === "checking" ? "Sedang Memeriksa" : "Mulai Pemeriksaan"}`;
  $("startReviewButton").disabled = state.reviewStatus === "checking";
  $("acceptReviewButton").disabled = state.reviewStatus !== "checking";
  $("rejectReviewButton").disabled = state.reviewStatus !== "checking";
  $("clearReviewButton").disabled = !state.reviewStatus;
  $("clearSubstitutionButton").disabled = !state.substitutionActive;
  renderRunningTextQueue();
  renderCameraControls();
  ["home", "away"].forEach((team) => {
    $(`${team}LogoSize`).value = state[`${team}LogoSize`];
    $(`${team}LogoSizeValue`).textContent = `${state[`${team}LogoSize`]}%`;
  });
  document.querySelectorAll("[data-logo-fit-team]").forEach((button) => {
    button.classList.toggle(
      "active",
      state[`${button.dataset.logoFitTeam}LogoFit`] === button.dataset.logoFit,
    );
  });
  document.querySelectorAll("[data-sub-team]").forEach((button) => {
    button.classList.toggle("active", button.dataset.subTeam === state.substitutionTeam);
  });
  document.querySelectorAll("[data-review-team]").forEach((button) => {
    button.classList.toggle("active", button.dataset.reviewTeam === state.reviewTeam);
  });
  document.querySelectorAll("[data-foul-team]").forEach((button) => {
    button.classList.toggle("active", button.dataset.foulTeam === state.foulTeam);
  });
  document.querySelectorAll("[data-sub-entry]").forEach((entry, index) => {
    entry.hidden = index >= config.substitutionLimit || index >= visibleSubstitutionRows;
  });
  $("addSubstitutionButton").hidden =
    config.substitutionLimit === 0 || visibleSubstitutionRows >= config.substitutionLimit;
  $("substitutionRuleText").textContent = config.substitutionNote;
  $("substitutionCard").classList.toggle("disabled", config.substitutionLimit === 0);
  $("substitutionCard").hidden = config.substitutionLimit === 0;
  document.querySelector(".event-control-grid").classList.toggle(
    "single-event-card",
    config.substitutionLimit === 0,
  );
  $("showSubstitutionButton").disabled = config.substitutionLimit === 0;
  $("extraTimeButton").textContent = state.extraTime ? "Nonaktifkan" : "Aktifkan";
  $("extraTimeButton").classList.toggle("active", state.extraTime);
  $("extraTimeControl").classList.toggle("disabled", config.extraPeriods === 0);
  const extraTimeAvailable =
    config.extraPeriods > 0 &&
    (!config.supportsKnockout || state.footballExtraTimeEnabled);
  $("extraTimeControl").hidden = !extraTimeAvailable;
  $("extraTimeButton").disabled = !extraTimeAvailable;
  $("extraTimeLabel").textContent =
    state.sport === "basketball" ? "Overtime" : config.extraPeriods === 0 ? "Tidak tersedia" : "Extra Time";
  const penaltyAvailable = config.supportsKnockout && state.footballPenaltiesEnabled;
  $("penaltyControl").hidden = !penaltyAvailable;
  $("penaltyShootoutButton").textContent = state.penaltyShootoutActive
    ? "Tutup adu penalti"
    : "Mulai adu penalti";
  $("penaltyShootoutButton").classList.toggle("active", state.penaltyShootoutActive);
  $("homePenaltyScoreControl").textContent = state.homePenaltyScore;
  $("awayPenaltyScoreControl").textContent = state.awayPenaltyScore;
  $("homePenaltyLabel").textContent = state.homeName || "Tuan Rumah";
  $("awayPenaltyLabel").textContent = state.awayName || "Tim Tamu";
  document.querySelectorAll("[data-penalty-team]").forEach((button) => {
    button.disabled = !state.penaltyShootoutActive;
  });
  const addedTimeMinutes =
    state.period === 1 ? state.firstHalfAddedTimeMinutes : state.secondHalfAddedTimeMinutes;
  const normalAddedTimeAvailable =
    config.supportsKnockout &&
    !state.extraTime &&
    !state.penaltyShootoutActive &&
    state.period <= 2 &&
    addedTimeMinutes > 0;
  const normalTimeFinished =
    state.timerMode === "down"
      ? state.seconds === 0
      : state.seconds >= state.normalTimeSeconds;
  $("normalAddedTimeControl").hidden = !normalAddedTimeAvailable;
  $("normalAddedTimeValue").textContent = `+${formatTime(state.addedTimeSeconds)}`;
  $("normalAddedTimeButton").textContent = state.addedTimeActive
    ? "Tutup waktu tambahan normal"
    : normalTimeFinished
      ? `Mulai tambahan Babak ${state.period}`
      : `Tersedia setelah Babak ${state.period} selesai`;
  $("normalAddedTimeButton").classList.toggle("active", state.addedTimeActive);
  $("normalAddedTimeButton").disabled =
    normalAddedTimeAvailable && !state.addedTimeActive && !normalTimeFinished;
  elements.overlayInput.value = visualDraft.backgroundOverlay;
  elements.overlayValue.textContent = `${visualDraft.backgroundOverlay}%`;
  elements.backgroundScaleInput.value = visualDraft.backgroundScale;
  elements.backgroundScaleValue.textContent = `${visualDraft.backgroundScale}%`;
  elements.layoutScaleInput.value = visualDraft.layoutScale;
  elements.layoutScaleValue.textContent = `${visualDraft.layoutScale}%`;
  elements.layoutGapInput.value = visualDraft.layoutGap;
  elements.layoutGapValue.textContent = `${visualDraft.layoutGap}%`;
  elements.layoutVerticalInput.value = visualDraft.layoutVertical;
  elements.layoutVerticalValue.textContent =
    visualDraft.layoutVertical === 0
      ? "Tengah"
      : visualDraft.layoutVertical < 0
        ? `Naik ${Math.abs(visualDraft.layoutVertical)}%`
        : `Turun ${visualDraft.layoutVertical}%`;
  $("eventNameSizeInput").value = visualDraft.eventNameSize ?? 100;
  $("eventNameSizeValue").textContent = `${visualDraft.eventNameSize ?? 100}%`;
  $("eventLogoSizeInput").value = visualDraft.eventLogoSize ?? 100;
  $("eventLogoSizeValue").textContent = `${visualDraft.eventLogoSize ?? 100}%`;
  $("removeBackground").hidden =
    !visualDraft.backgroundImage && !visualDraft.backgroundAssetId;
  const rallyStatus = getRallyStatus();
  $("rallyRuleStatus").hidden = !isSetSport;
  $("rallyRuleText").textContent =
    state.sport === "badminton"
      ? "21 poin · selisih 2 · batas 30"
      : state.period === 5
        ? "15 poin · selisih 2"
        : "25 poin · selisih 2";
  $("rallyRuleStatus").classList.toggle("is-live", Boolean(rallyStatus));
  const isVideoBackground =
    visualDraft.backgroundMediaType === "video" && Boolean(visualDraft.backgroundImage);
  $("videoPlaybackControl").hidden = !isVideoBackground;
  $("toggleVideoPlayback").textContent = visualDraft.videoPlaying ? "Stop" : "Start";
  $("toggleVideoLoop").textContent = `Loop: ${visualDraft.videoLoop ? "ON" : "OFF"}`;
  $("modernPaletteOptions").hidden = visualDraft.scoreboardStyle === "retro";
  $("retroPaletteOptions").hidden = visualDraft.scoreboardStyle !== "retro";
  document.querySelectorAll("[data-modern-palette]").forEach((button) => {
    button.classList.toggle("active", button.dataset.modernPalette === visualDraft.modernPalette);
  });
  document.querySelectorAll("[data-retro-palette]").forEach((button) => {
    button.classList.toggle("active", button.dataset.retroPalette === visualDraft.retroPalette);
  });
  $("visualDraftStatus").textContent = visualDraftDirty ? "DRAFT" : "LIVE";
  $("visualDraftStatus").classList.toggle("is-draft", visualDraftDirty);
  $("visualGoLiveButton").disabled = !visualDraftDirty;
  $("foulRuleText").textContent = config.foulNote;
  $("clearFoulButton").disabled = !state.foulActive;
  $("foulEventOptions").innerHTML = config.foulEvents
    .map(([type, label, tone, symbol]) => `
      <button type="button" data-foul-event="${type}" data-foul-label="${label}" data-foul-tone="${tone}" data-foul-symbol="${symbol}">
        <b>${symbol}</b><span>${label}</span>
      </button>
    `)
    .join("");

  $("sportSelect").value = state.sport;
  document.querySelectorAll(".set-sport-only").forEach((button) => {
    button.hidden = !isSetSport;
    button.textContent = state.sport === "badminton" ? "+ Menang game" : "+ Menang set";
  });
  document.querySelectorAll("[data-team][data-amount]").forEach((button) => {
    const amount = Number(button.dataset.amount);
    if (amount > 0) button.hidden = !config.scoreValues.includes(amount);
  });
  document.querySelectorAll("[data-quick-points]").forEach((row) => {
    row.hidden = config.scoreValues.length === 1;
  });
  ["home", "away"].forEach((team) => {
    const primary = config.primaryCounter;
    const secondary = config.secondaryCounter;
    $(`${team}MatchCounters`).hidden = !primary && !secondary;
    $(`${team}PrimaryCounter`).hidden = !primary;
    $(`${team}SecondaryCounter`).hidden = !secondary;
    if (primary) $(`${team}PrimaryCounterLabel`).textContent = primary.label;
    if (secondary) $(`${team}SecondaryCounterLabel`).textContent = secondary.label;
    const primaryValue = Number(state[`${team}Timeouts`] || 0);
    const secondaryValue = Number(state[getSecondaryCounterKey(team)] || 0);
    const primaryLimit = getCounterLimit(config, "primary");
    const secondaryLimit = getCounterLimit(config, "secondary");
    document.querySelectorAll(`[data-counter="${team}Timeouts"]`).forEach((button) => {
      button.disabled = Number(button.dataset.counterAmount) > 0
        ? primaryValue >= primaryLimit
        : primaryValue <= 0;
    });
    document.querySelectorAll(`[data-counter="${team}TeamFouls"]`).forEach((button) => {
      button.disabled = Number(button.dataset.counterAmount) > 0
        ? secondaryValue >= secondaryLimit
        : secondaryValue <= 0;
    });
  });
  document.querySelectorAll("[data-background]").forEach((button) => {
    button.classList.toggle(
      "active",
      !visualDraft.backgroundImage &&
        !visualDraft.backgroundAssetId &&
        button.dataset.background === visualDraft.background,
    );
  });
  document.querySelectorAll("[data-display-template]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.displayTemplate === visualDraft.displayTemplate,
    );
  });
  $("displayRatioSelect").value = visualDraft.displayRatio;
  const customRatio = visualDraft.displayRatio === "custom";
  $("customRatioWidthInput").hidden = !customRatio;
  $("customRatioDivider").hidden = !customRatio;
  $("customRatioHeightInput").hidden = !customRatio;
  $("customRatioWidthInput").value = visualDraft.customRatioWidth;
  $("customRatioHeightInput").value = visualDraft.customRatioHeight;
  $("highContrastInput").checked = Boolean(visualDraft.highContrast);
  if (document.activeElement !== $("sponsorNameInput")) {
    $("sponsorNameInput").value = sponsorDraft.sponsorName;
  }
  $("removeSponsorLogoButton").hidden =
    !sponsorDraft.sponsorLogo && !sponsorDraft.sponsorLogoAssetId;
  document.querySelectorAll("[data-sponsor-template]").forEach((button) => {
    button.classList.toggle("active", button.dataset.sponsorTemplate === sponsorDraft.sponsorTemplate);
  });
  $("sponsorModeButton").classList.toggle("active", state.sponsorMode);
  document.querySelectorAll("[data-layout-preset]").forEach((button) => {
    button.classList.toggle("active", button.dataset.layoutPreset === visualDraft.layoutPreset);
  });
  renderLogo("home");
  renderLogo("away");
  renderSavedMatches();
  renderSponsorPreview();
  window.requestAnimationFrame(syncVisualPreview);
  stabilizePageHeight();
  restoreScrollPosition(previousScrollX, previousScrollY);
}

function getTimerClock(now = Date.now()) {
  if (!state.running || !state.timerStartedAt) {
    return {
      seconds: state.seconds,
      addedTimeSeconds: state.addedTimeSeconds,
      finished: false,
    };
  }
  const elapsed = Math.max(0, Math.floor((now - state.timerStartedAt) / 1000));
  if (state.addedTimeActive) {
    const targetMinutes =
      state.period === 1 ? state.firstHalfAddedTimeMinutes : state.secondHalfAddedTimeMinutes;
    const target = targetMinutes * 60;
    const addedTimeSeconds = Math.min(
      target,
      Number(state.timerBaseAddedSeconds || 0) + elapsed,
    );
    return {
      seconds: state.timerBaseSeconds,
      addedTimeSeconds,
      finished: addedTimeSeconds >= target,
    };
  }
  const phaseDuration = state.extraTime
    ? state.extraTimeDurationSeconds
    : state.normalTimeSeconds;
  const baseSeconds = Number(state.timerBaseSeconds || 0);
  const seconds =
    state.timerMode === "down"
      ? Math.max(0, baseSeconds - elapsed)
      : Math.min(phaseDuration, baseSeconds + elapsed);
  return {
    seconds,
    addedTimeSeconds: state.addedTimeSeconds,
    finished:
      state.timerMode === "down" ? seconds <= 0 : seconds >= phaseDuration,
  };
}

function syncTimerClock(now = Date.now()) {
  const clock = getTimerClock(now);
  state.seconds = clock.seconds;
  state.addedTimeSeconds = clock.addedTimeSeconds;
  if (clock.finished && state.running) {
    state.running = false;
    state.timerStartedAt = 0;
    state.timerBaseSeconds = state.seconds;
    state.timerBaseAddedSeconds = state.addedTimeSeconds;
    state.matchStatus = "paused";
  }
  return clock;
}

function stopTimer() {
  syncTimerClock();
  state.running = false;
  state.timerStartedAt = 0;
  state.timerBaseSeconds = state.seconds;
  state.timerBaseAddedSeconds = state.addedTimeSeconds;
  if (timerId) window.clearInterval(timerId);
  timerId = null;
}

function startTimerLoop() {
  if (timerId) window.clearInterval(timerId);
  let lastRenderedSecond = -1;
  timerId = window.setInterval(() => {
    const clock = syncTimerClock();
    const visibleSecond = state.addedTimeActive
      ? state.addedTimeSeconds
      : state.seconds;
    if (visibleSecond === lastRenderedSecond && state.running) return;
    lastRenderedSecond = visibleSecond;
    saveState();
    render();
    if (!state.running && timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }, 250);
}

function startTimer() {
  if (state.running || sportConfig[state.sport].timerDirection === "none") return;
  state.running = true;
  state.matchStatus = "live";
  state.timerStartedAt = Date.now();
  state.timerBaseSeconds = state.seconds;
  state.timerBaseAddedSeconds = state.addedTimeSeconds;
  startTimerLoop();
}

function restoreRuntimeState() {
  expireTransientState(state);
  restoreTransientTimers();
  if (state.running) {
    const wasRunning = state.running;
    syncTimerClock();
    if (state.running) {
      startTimerLoop();
    } else if (wasRunning) {
      saveState();
    }
  } else if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function setScore(team, amount) {
  const key = `${team}Score`;
  const maxScore = sportConfig[state.sport].maxScore;
  const previousScore = state[key];
  const nextScore = Math.min(maxScore, Math.max(0, previousScore + amount));
  if (nextScore === previousScore) return;
  state[key] = nextScore;
  state.scoreHistory.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    type: "score",
    team,
    amount: nextScore - previousScore,
    previousScore,
    newScore: nextScore,
    period: state.period,
    seconds: state.seconds,
  });
  state.matchStatus = state.matchStatus === "not-started" ? "live" : state.matchStatus;
  saveState();
  render();
}

function setManualScore(team, score) {
  const key = `${team}Score`;
  const maxScore = sportConfig[state.sport].maxScore;
  const nextScore = Math.min(maxScore, Math.max(0, Number(score) || 0));
  const previousScore = state[key];
  if (nextScore === previousScore) return;
  state[key] = nextScore;
  state.scoreHistory.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    type: "manual-score",
    team,
    amount: nextScore - previousScore,
    previousScore,
    newScore: nextScore,
    period: state.period,
    seconds: state.seconds,
  });
  saveState();
  render();
}

function setSport(sport) {
  stopTimer();
  if (foulTimerId) window.clearTimeout(foulTimerId);
  foulTimerId = null;
  const previousSport = state.sport;
  state.sport = sport;
  const config = sportConfig[sport];
  state.period = 1;
  state.extraTime = false;
  state.reviewStatus = "";
  state.substitutionActive = false;
  state.substitutionExpiresAt = 0;
  state.substitutions = [];
  state.reviewTeam = "home";
  state.foulActive = false;
  state.foulExpiresAt = 0;
  state.foulTeam = "home";
  state.addedTimeActive = false;
  state.addedTimeSeconds = 0;
  state.penaltyShootoutActive = false;
  state.homePenaltyScore = 0;
  state.awayPenaltyScore = 0;
  state.periodFormat = config.periodFormat;
  visibleSubstitutionRows = 1;
  state.seconds = config.defaultSeconds;
  state.timerMode = config.timerDirection === "down" ? "down" : "up";
  state.normalTimeSeconds = config.regulationSeconds;
  state.extraTimeDurationSeconds = config.extraTimeSeconds || 5 * 60;
  state.homeTimeouts = 0;
  state.awayTimeouts = 0;
  state.homeTeamFouls = 0;
  state.awayTeamFouls = 0;
  state.homeSubstitutions = 0;
  state.awaySubstitutions = 0;
  if (previousSport !== sport) {
    state.homeScore = 0;
    state.awayScore = 0;
    state.homeSets = 0;
    state.awaySets = 0;
    state.scoreHistory = [];
    state.matchStatus = "not-started";
  }
  saveState();
  render();
}

async function handleLogo(team, file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    alert("File logo harus berupa gambar.");
    return;
  }
  const asset = await saveMediaAsset(file, "team-logo");
  if (!asset) return;
  state[`${team}Logo`] = "";
  state[`${team}LogoAssetId`] = asset.id;
  $(`${team}FileName`).textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB`;
  saveState();
  render();
}

async function handleBackground(file) {
  if (!file) return;
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type === "video/mp4" || file.type === "video/webm";
  if (!isImage && !isVideo) {
    alert("Gunakan file gambar, MP4, atau WebM.");
    return;
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    alert("Ukuran background maksimal 10 MB.");
    return;
  }
  if (isVideo) {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      if (!Number.isFinite(video.duration) || video.duration > 5.05) {
        alert("Durasi video maksimal 5 detik.");
        return;
      }
      saveMediaAsset(file, "background").then((asset) => {
        if (!asset) return;
        updateVisualDraft({
          backgroundImage: "",
          backgroundAssetId: asset.id,
          backgroundMediaType: "video",
          backgroundScale: 100,
          videoLoop: true,
          videoPlaying: true,
        });
        $("backgroundFileName").textContent =
          `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB · ${video.duration.toFixed(1)} detik`;
      });
    };
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      alert("Video tidak dapat dibaca.");
    };
    video.src = objectUrl;
    return;
  }
  const asset = await saveMediaAsset(file, "background");
  if (!asset) return;
  updateVisualDraft({
    backgroundImage: "",
    backgroundAssetId: asset.id,
    backgroundMediaType: "image",
    backgroundScale: 100,
  });
  $("backgroundFileName").textContent =
    `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB`;
}

document.addEventListener("click", (event) => {
  const anchor = event.target.closest?.("a[href]");
  if (!anchor) return;
  const href = anchor.getAttribute("href") || "";
  if (href === "#" || href.startsWith("#")) event.preventDefault();
}, true);

$("sportSelect").addEventListener("change", (event) => {
  setSport(event.target.value);
});

document.querySelectorAll("[data-controller-target]").forEach((button) => {
  button.type = "button";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    setControllerView(button.dataset.controllerTarget);
  });
});

document.addEventListener(
  "click",
  (event) => {
    const button = event.target.closest?.("[data-controller-target]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    setControllerView(button.dataset.controllerTarget);
  },
  true,
);

document.querySelectorAll("[data-team][data-amount]").forEach((button) => {
  button.addEventListener("click", () => {
    setScore(button.dataset.team, Number(button.dataset.amount));
  });
});

document.querySelectorAll("[data-apply-manual-score]").forEach((button) => {
  button.addEventListener("click", () => {
    const team = button.dataset.applyManualScore;
    setManualScore(team, $(`${team}ManualScore`).value);
  });
});

document.querySelectorAll("[data-counter]").forEach((button) => {
  button.addEventListener("click", () => {
    const requestedKey = button.dataset.counter;
    const team = requestedKey.startsWith("home") ? "home" : "away";
    const key = requestedKey.endsWith("TeamFouls")
      ? getSecondaryCounterKey(team)
      : requestedKey;
    const amount = Number(button.dataset.counterAmount);
    const config = sportConfig[state.sport];
    const counterName = requestedKey.endsWith("Timeouts") ? "primary" : "secondary";
    if (!config[`${counterName}Counter`]) return;
    state[key] = Math.min(
      getCounterLimit(config, counterName),
      Math.max(0, Number(state[key] || 0) + amount),
    );
    saveState();
    render();
  });
});

document.querySelectorAll("[data-set-team]").forEach((button) => {
  button.addEventListener("click", () => {
    const config = sportConfig[state.sport];
    const key = `${button.dataset.setTeam}Sets`;
    state[key] = Math.min(config.setsToWin || 2, state[key] + 1);
    state.homeScore = 0;
    state.awayScore = 0;
    const matchComplete =
      state.homeSets >= config.setsToWin || state.awaySets >= config.setsToWin;
    if (!matchComplete) {
      const previousPeriod = state.period;
      state.period = Math.min(config.periods, state.homeSets + state.awaySets + 1);
      resetSportCountersForNewPeriod(previousPeriod, state.period);
    }
    saveState();
    render();
  });
});

document.querySelectorAll("[data-background]").forEach((button) => {
  button.addEventListener("click", () => {
    updateVisualDraft({
      background: button.dataset.background,
      backgroundImage: "",
      backgroundAssetId: "",
      backgroundMediaType: "",
    });
    $("backgroundFileName").textContent = "Foto/video maks. 10 MB · video maks. 5 detik";
    $("backgroundInput").value = "";
  });
});

document.querySelectorAll("[data-display-template]").forEach((button) => {
  button.addEventListener("click", () => {
    const template = button.dataset.displayTemplate;
    updateVisualDraft({
      displayTemplate: template,
      scoreboardStyle: template === "retro" ? "retro" : "modern",
      highContrast: template === "led" ? true : visualDraft.highContrast,
    });
  });
});

document.querySelectorAll("[data-modern-palette]").forEach((button) => {
  button.addEventListener("click", () => {
    updateVisualDraft({ modernPalette: button.dataset.modernPalette });
  });
});

document.querySelectorAll("[data-retro-palette]").forEach((button) => {
  button.addEventListener("click", () => {
    updateVisualDraft({ retroPalette: button.dataset.retroPalette });
  });
});

document.querySelectorAll("[data-layout-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    updateVisualDraft({ layoutPreset: button.dataset.layoutPreset });
  });
});

$("backgroundInput").addEventListener("change", (event) => {
  handleBackground(event.target.files[0]);
});

$("displayRatioSelect").addEventListener("change", (event) => {
  updateVisualDraft({ displayRatio: event.target.value });
});

["customRatioWidthInput", "customRatioHeightInput"].forEach((id) => {
  $(id).addEventListener("change", () => {
    updateVisualDraft({
      customRatioWidth: Math.max(1, Number($("customRatioWidthInput").value) || 16),
      customRatioHeight: Math.max(1, Number($("customRatioHeightInput").value) || 9),
    });
  });
});

$("highContrastInput").addEventListener("change", (event) => {
  updateVisualDraft({ highContrast: event.target.checked });
});

$("removeBackground").addEventListener("click", () => {
  updateVisualDraft({ backgroundImage: "", backgroundAssetId: "", backgroundMediaType: "" });
  $("backgroundInput").value = "";
  $("backgroundFileName").textContent = "Foto/video maks. 10 MB · video maks. 5 detik";
});

elements.overlayInput.addEventListener("input", (event) => {
  updateVisualDraft({ backgroundOverlay: Number(event.target.value) });
});

elements.backgroundScaleInput.addEventListener("input", (event) => {
  updateVisualDraft({ backgroundScale: Number(event.target.value) });
});

elements.layoutScaleInput.addEventListener("input", (event) => {
  updateVisualDraft({ layoutScale: Number(event.target.value) });
});

elements.layoutGapInput.addEventListener("input", (event) => {
  updateVisualDraft({ layoutGap: Number(event.target.value) });
});

elements.layoutVerticalInput.addEventListener("input", (event) => {
  updateVisualDraft({ layoutVertical: Number(event.target.value) });
});

$("eventNameSizeInput").addEventListener("input", (event) => {
  updateVisualDraft({ eventNameSize: Number(event.target.value) });
});

$("eventLogoSizeInput").addEventListener("input", (event) => {
  updateVisualDraft({ eventLogoSize: Number(event.target.value) });
});

$("sponsorNameSizeInput").addEventListener("input", (event) => {
  sponsorDraft.sponsorNameSize = Number(event.target.value);
  render();
});

$("sponsorLogoSizeInput").addEventListener("input", (event) => {
  sponsorDraft.sponsorLogoSize = Number(event.target.value);
  render();
});

$("sponsorPresentedByInput").addEventListener("input", (event) => {
  sponsorDraft.sponsorPresentedByText = event.target.value;
  render();
});

$("toggleVideoPlayback").addEventListener("click", () => {
  updateVisualDraft({ videoPlaying: !visualDraft.videoPlaying });
});

$("toggleVideoLoop").addEventListener("click", () => {
  updateVisualDraft({ videoLoop: !visualDraft.videoLoop });
});

$("visualGoLiveButton").addEventListener("click", () => {
  Object.assign(state, visualDraft);
  visualDraftDirty = false;
  saveState();
  render();
});

$("visualPreviewFrame").addEventListener("load", syncVisualPreview);
window.addEventListener("resize", fitVisualPreview);

function syncMatchSetup() {
  const durationMinutes = Math.min(180, Math.max(0, Number($("matchDurationInput").value) || 0));
  state.periodFormat = $("periodFormatSelect").value;
  state.normalTimeSeconds = durationMinutes * 60;
  if (!state.running && !state.extraTime) {
    state.seconds = state.timerMode === "down" ? state.normalTimeSeconds : Math.min(state.seconds, state.normalTimeSeconds);
  }
  saveState();
  render();
}

$("eventNameInput").addEventListener("input", (event) => {
  matchSetupDraft.eventName = event.target.value;
  render();
});
$("periodFormatSelect").addEventListener("change", syncMatchSetup);
$("matchDurationInput").addEventListener("change", syncMatchSetup);

$("eventLogoInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file?.type.startsWith("image/")) {
    if (file) alert("File logo event harus berupa gambar.");
    return;
  }
  saveMediaAsset(file, "event-logo").then((asset) => {
    if (!asset) return;
    matchSetupDraft.eventLogo = "";
    matchSetupDraft.eventLogoAssetId = asset.id;
    render();
  });
});

$("removeEventLogoButton").addEventListener("click", () => {
  matchSetupDraft.eventLogo = "";
  matchSetupDraft.eventLogoAssetId = "";
  $("eventLogoInput").value = "";
  render();
});

$("applyMatchSetupButton").addEventListener("click", () => {
  state.eventName = matchSetupDraft.eventName.trim();
  state.eventLogo = matchSetupDraft.eventLogo;
  state.eventLogoAssetId = matchSetupDraft.eventLogoAssetId;
  matchSetupDraft.eventName = state.eventName;
  saveState();
  render();
});

$("footballExtraTimeEnabled").addEventListener("change", (event) => {
  state.footballExtraTimeEnabled = event.target.checked;
  if (!state.footballExtraTimeEnabled && state.extraTime) {
    stopTimer();
    state.extraTime = false;
    state.period = 1;
    state.seconds = state.timerMode === "down" ? state.normalTimeSeconds : 0;
  }
  saveState();
  render();
});

$("footballPenaltiesEnabled").addEventListener("change", (event) => {
  state.footballPenaltiesEnabled = event.target.checked;
  if (!state.footballPenaltiesEnabled) {
    state.penaltyShootoutActive = false;
    state.homePenaltyScore = 0;
    state.awayPenaltyScore = 0;
  }
  saveState();
  render();
});

["firstHalfAddedTimeInput", "secondHalfAddedTimeInput"].forEach((id, index) => {
  $(id).addEventListener("change", (event) => {
    const key = index === 0 ? "firstHalfAddedTimeMinutes" : "secondHalfAddedTimeMinutes";
    state[key] = Math.min(30, Math.max(0, Number(event.target.value) || 0));
    if (state.addedTimeActive && state.period === index + 1) {
      state.addedTimeSeconds = Math.min(state.addedTimeSeconds, state[key] * 60);
    }
    saveState();
    render();
  });
});

$("sponsorNameInput").addEventListener("input", (event) => {
  sponsorDraft.sponsorName = event.target.value;
  renderSponsorPreview();
});

$("sponsorLogoInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file?.type.startsWith("image/")) {
    if (file) alert("File logo sponsor harus berupa gambar.");
    return;
  }
  saveMediaAsset(file, "sponsor-logo").then((asset) => {
    if (!asset) return;
    sponsorDraft.sponsorLogo = "";
    sponsorDraft.sponsorLogoAssetId = asset.id;
    render();
  });
});

$("removeSponsorLogoButton").addEventListener("click", () => {
  sponsorDraft.sponsorLogo = "";
  sponsorDraft.sponsorLogoAssetId = "";
  $("sponsorLogoInput").value = "";
  render();
});

$("sponsorModeButton").addEventListener("click", () => {
  const hasSponsorContent =
    Boolean(sponsorDraft.sponsorName.trim()) ||
    Boolean(sponsorDraft.sponsorLogo) ||
    Boolean(sponsorDraft.sponsorLogoAssetId);
  if (!hasSponsorContent) {
    alert("Isi nama sponsor atau pilih logo sponsor terlebih dahulu.");
    return;
  }
  if (sponsorTimerId) window.clearTimeout(sponsorTimerId);
  sponsorTimerId = null;
  state.sponsorName = sponsorDraft.sponsorName.trim();
  state.sponsorLogo = sponsorDraft.sponsorLogo;
  state.sponsorLogoAssetId = sponsorDraft.sponsorLogoAssetId;
  state.sponsorTemplate = sponsorDraft.sponsorTemplate;
  state.sponsorNameSize = Number(sponsorDraft.sponsorNameSize) || 100;
  state.sponsorLogoSize = Number(sponsorDraft.sponsorLogoSize) || 100;
  state.sponsorPresentedByText = sponsorDraft.sponsorPresentedByText;
  state.sponsorMode = false;
  state.sponsorExpiresAt = 0;
  saveState();
  render();
  window.requestAnimationFrame(() => {
    state.sponsorMode = true;
    state.sponsorExpiresAt = Date.now() + 4000;
    saveState();
    render();
    restoreTransientTimers();
  });
});

document.querySelectorAll("[data-sponsor-template]").forEach((button) => {
  button.addEventListener("click", () => {
    sponsorDraft.sponsorTemplate = button.dataset.sponsorTemplate;
    render();
  });
});

async function applyMediaAssetToTarget(target, asset) {
  if (!asset) return;
  if (target === "eventLogo") {
    matchSetupDraft.eventLogo = "";
    matchSetupDraft.eventLogoAssetId = asset.id;
  } else if (target === "homeLogo" || target === "awayLogo") {
    const team = target.startsWith("home") ? "home" : "away";
    state[`${team}Logo`] = "";
    state[`${team}LogoAssetId`] = asset.id;
    $(`${team}FileName`).textContent = asset.name;
    saveState();
  } else if (target === "sponsorLogo") {
    sponsorDraft.sponsorLogo = "";
    sponsorDraft.sponsorLogoAssetId = asset.id;
  } else if (target === "background") {
    updateVisualDraft({
      backgroundImage: "",
      backgroundAssetId: asset.id,
      backgroundMediaType: asset.type.startsWith("video/") ? "video" : "image",
      backgroundScale: 100,
      videoLoop: true,
      videoPlaying: true,
    });
    $("backgroundFileName").textContent = asset.name;
  }
  render();
}

document.querySelectorAll("[data-use-media]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = button.dataset.useMedia;
    const select = document.querySelector(`[data-media-target="${target}"]`);
    const asset = mediaAssets.find((item) => item.id === select?.value);
    if (!asset) {
      alert("Pilih file dari pustaka terlebih dahulu.");
      return;
    }
    await applyMediaAssetToTarget(target, asset);
  });
});

document.querySelectorAll("[data-delete-media]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = button.dataset.deleteMedia;
    const select = document.querySelector(`[data-media-target="${target}"]`);
    const assetId = select?.value;
    if (!assetId) {
      alert("Pilih file yang akan dihapus.");
      return;
    }
    if (!confirm("Hapus file ini dari pustaka media?")) return;
    if (matchSetupDraft.eventLogoAssetId === assetId) matchSetupDraft.eventLogoAssetId = "";
    if (state.eventLogoAssetId === assetId) state.eventLogoAssetId = "";
    ["home", "away"].forEach((team) => {
      if (state[`${team}LogoAssetId`] === assetId) state[`${team}LogoAssetId`] = "";
    });
    if (sponsorDraft.sponsorLogoAssetId === assetId) sponsorDraft.sponsorLogoAssetId = "";
    if (state.sponsorLogoAssetId === assetId) state.sponsorLogoAssetId = "";
    if (visualDraft.backgroundAssetId === assetId) {
      visualDraft.backgroundAssetId = "";
      visualDraft.backgroundMediaType = "";
    }
    if (state.backgroundAssetId === assetId) {
      state.backgroundAssetId = "";
      state.backgroundMediaType = "";
    }
    await deleteMediaAsset(assetId);
    visualDraftDirty = visualStateKeys.some((key) => visualDraft[key] !== state[key]);
    saveState();
    render();
  });
});

["home", "away"].forEach((team) => {
  elements[`${team}Name`].addEventListener("input", (event) => {
    state[`${team}Name`] = event.target.value.toUpperCase();
    saveState();
    render();
  });
  $(`${team}LogoInput`).addEventListener("change", (event) => {
    handleLogo(team, event.target.files[0]);
  });
  $(`${team}LogoSize`).addEventListener("input", (event) => {
    state[`${team}LogoSize`] = Number(event.target.value);
    saveState();
    render();
  });
  $(`${team}ColorInput`).addEventListener("input", (event) => {
    state[`${team}Color`] = event.target.value;
    saveState();
    render();
  });
});

document.querySelectorAll("[data-logo-fit-team]").forEach((button) => {
  button.addEventListener("click", () => {
    state[`${button.dataset.logoFitTeam}LogoFit`] = button.dataset.logoFit;
    saveState();
    render();
  });
});

$("startTimerButton").addEventListener("click", () => {
  startTimer();
  saveState();
  render();
});

function phaseStartSeconds() {
  const duration = state.extraTime ? state.extraTimeDurationSeconds : state.normalTimeSeconds;
  return state.timerMode === "down" ? duration : 0;
}

$("pauseTimerButton").addEventListener("click", () => {
  stopTimer();
  state.matchStatus = state.addedTimeActive
    ? "paused"
    : state.seconds === phaseStartSeconds() ? "not-started" : "paused";
  saveState();
  render();
});

$("stopTimerButton").addEventListener("click", () => {
  stopTimer();
  if (state.addedTimeActive) {
    state.addedTimeActive = false;
    state.addedTimeSeconds = 0;
  }
  state.seconds = phaseStartSeconds();
  state.matchStatus = "not-started";
  saveState();
  render();
});

$("restartTimerButton").addEventListener("click", () => {
  stopTimer();
  if (state.addedTimeActive) {
    state.addedTimeSeconds = 0;
    state.seconds = state.timerMode === "down" ? 0 : state.normalTimeSeconds;
  } else {
    state.seconds = phaseStartSeconds();
  }
  startTimer();
  saveState();
  render();
});

function updateTimeFromInputs() {
  stopTimer();
  state.matchStatus = "paused";
  const minutes = Math.min(99, Math.max(0, Number(elements.minuteInput.value) || 0));
  const seconds = Math.min(59, Math.max(0, Number(elements.secondInput.value) || 0));
  state.seconds = minutes * 60 + seconds;
  state.timerBaseSeconds = state.seconds;
  saveState();
  render();
}

elements.minuteInput.addEventListener("change", updateTimeFromInputs);
elements.secondInput.addEventListener("change", updateTimeFromInputs);

document.querySelectorAll("[data-timer-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!sportConfig[state.sport].timerModeSelectable) return;
    stopTimer();
    state.timerMode = button.dataset.timerMode;
    const phaseDuration = state.extraTime
      ? state.extraTimeDurationSeconds
      : state.normalTimeSeconds;
    state.seconds = state.timerMode === "down" ? phaseDuration : 0;
    saveState();
    render();
  });
});

$("extraTimeMinuteInput").addEventListener("change", (event) => {
  stopTimer();
  const minutes = Math.min(99, Math.max(1, Number(event.target.value) || 1));
  state.extraTimeDurationSeconds = minutes * 60;
  if (state.extraTime) {
    state.seconds = state.timerMode === "down" ? state.extraTimeDurationSeconds : 0;
  }
  saveState();
  render();
});

$("previousPeriod").addEventListener("click", () => {
  stopTimer();
  state.period = Math.max(1, state.period - 1);
  state.addedTimeActive = false;
  state.addedTimeSeconds = 0;
  saveState();
  render();
});

$("nextPeriod").addEventListener("click", () => {
  stopTimer();
  const config = sportConfig[state.sport];
  const max = state.extraTime ? config.extraPeriods : config.periods;
  const previousPeriod = state.period;
  state.period = Math.min(max, state.period + 1);
  state.addedTimeActive = false;
  state.addedTimeSeconds = 0;
  if (state.period !== previousPeriod) {
    const duration = state.extraTime
      ? state.extraTimeDurationSeconds
      : state.normalTimeSeconds;
    state.seconds = state.timerMode === "down" ? duration : 0;
  }
  resetSportCountersForNewPeriod(previousPeriod, state.period);
  saveState();
  render();
});

$("extraTimeButton").addEventListener("click", () => {
  const config = sportConfig[state.sport];
  if (
    config.extraPeriods === 0 ||
    (config.supportsKnockout && !state.footballExtraTimeEnabled)
  ) return;
  stopTimer();
  state.addedTimeActive = false;
  state.addedTimeSeconds = 0;
  state.extraTime = !state.extraTime;
  state.period = 1;
  if (state.sport === "basketball") {
    state.homeTimeouts = 0;
    state.awayTimeouts = 0;
    state.homeTeamFouls = 0;
    state.awayTeamFouls = 0;
  }
  state.seconds = state.extraTime
    ? state.timerMode === "down" ? state.extraTimeDurationSeconds : 0
    : state.timerMode === "down" ? state.normalTimeSeconds : 0;
  saveState();
  render();
});

$("penaltyShootoutButton").addEventListener("click", () => {
  if (!sportConfig[state.sport].supportsKnockout || !state.footballPenaltiesEnabled) return;
  stopTimer();
  state.addedTimeActive = false;
  state.addedTimeSeconds = 0;
  state.penaltyShootoutActive = !state.penaltyShootoutActive;
  if (state.penaltyShootoutActive) state.extraTime = false;
  state.matchStatus = state.penaltyShootoutActive ? "paused" : state.matchStatus;
  saveState();
  render();
});

$("normalAddedTimeButton").addEventListener("click", () => {
  const config = sportConfig[state.sport];
  if (!config.supportsKnockout || state.extraTime || state.penaltyShootoutActive) return;
  const minutes =
    state.period === 1 ? state.firstHalfAddedTimeMinutes : state.secondHalfAddedTimeMinutes;
  if (!minutes) return;
  stopTimer();
  state.addedTimeActive = !state.addedTimeActive;
  if (state.addedTimeActive) {
    state.addedTimeSeconds = 0;
    state.seconds = state.timerMode === "down" ? 0 : state.normalTimeSeconds;
    startTimer();
  }
  saveState();
  render();
});

document.querySelectorAll("[data-penalty-team]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!state.penaltyShootoutActive) return;
    const key = `${button.dataset.penaltyTeam}PenaltyScore`;
    state[key] = Math.min(
      99,
      Math.max(0, Number(state[key] || 0) + Number(button.dataset.penaltyAmount)),
    );
    saveState();
    render();
  });
});

$("startReviewButton").addEventListener("click", () => {
  if (foulTimerId) window.clearTimeout(foulTimerId);
  foulTimerId = null;
  state.foulActive = false;
  state.foulExpiresAt = 0;
  state.reviewStatus = "checking";
  stopTimer();
  saveState();
  render();
});

$("acceptReviewButton").addEventListener("click", () => {
  state.reviewStatus = "accepted";
  saveState();
  render();
});

$("rejectReviewButton").addEventListener("click", () => {
  state.reviewStatus = "rejected";
  saveState();
  render();
});

$("clearReviewButton").addEventListener("click", () => {
  state.reviewStatus = "";
  saveState();
  render();
});

document.querySelectorAll("[data-sub-team]").forEach((button) => {
  button.addEventListener("click", () => {
    state.substitutionTeam = button.dataset.subTeam;
    saveState();
    render();
  });
});

document.querySelectorAll("[data-review-team]").forEach((button) => {
  button.addEventListener("click", () => {
    state.reviewTeam = button.dataset.reviewTeam;
    saveState();
    render();
  });
});

document.querySelectorAll("[data-foul-team]").forEach((button) => {
  button.addEventListener("click", () => {
    state.foulTeam = button.dataset.foulTeam;
    saveState();
    render();
  });
});

function clearFoul() {
  if (foulTimerId) window.clearTimeout(foulTimerId);
  foulTimerId = null;
  state.foulActive = false;
  state.foulExpiresAt = 0;
  saveState();
  render();
}

$("foulEventOptions").addEventListener("click", (event) => {
  const button = event.target.closest("[data-foul-event]");
  if (!button) return;
  if (foulTimerId) window.clearTimeout(foulTimerId);
  state.reviewStatus = "";
  state.substitutionActive = false;
  state.substitutionExpiresAt = 0;
  state.foulType = button.dataset.foulEvent;
  state.foulLabel = button.dataset.foulLabel;
  state.foulTone = button.dataset.foulTone;
  state.foulSymbol = button.dataset.foulSymbol;
  state.foulActive = true;
  state.foulExpiresAt = Date.now() + 4000;
  state.scoreHistory.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    type: "foul",
    foulType: button.dataset.foulEvent,
    foulLabel: button.dataset.foulLabel,
    foulSymbol: button.dataset.foulSymbol,
    period: state.period,
    seconds: state.seconds,
  });
  saveState();
  render();
  restoreTransientTimers();
});

$("clearFoulButton").addEventListener("click", clearFoul);

function clearSubstitution() {
  if (substitutionTimerId) window.clearTimeout(substitutionTimerId);
  substitutionTimerId = null;
  state.substitutionActive = false;
  state.substitutionExpiresAt = 0;
  saveState();
  render();
}

$("showSubstitutionButton").addEventListener("click", () => {
  const limit = sportConfig[state.sport].substitutionLimit;
  const entries = [...document.querySelectorAll("[data-sub-entry]")]
    .slice(0, limit)
    .map((entry) => ({
      out: entry.querySelector("[data-player-out]").value.trim().toUpperCase(),
      in: entry.querySelector("[data-player-in]").value.trim().toUpperCase(),
    }));
  const incomplete = entries.some((entry) => (entry.out && !entry.in) || (!entry.out && entry.in));
  const substitutions = entries.filter((entry) => entry.out && entry.in);
  if (incomplete) {
    alert("Setiap baris yang digunakan harus memiliki pemain keluar dan pemain masuk.");
    return;
  }
  if (!substitutions.length) {
    alert("Isi minimal satu pasangan pemain keluar dan pemain masuk.");
    return;
  }
  if (substitutionTimerId) window.clearTimeout(substitutionTimerId);
  if (foulTimerId) window.clearTimeout(foulTimerId);
  foulTimerId = null;
  state.foulActive = false;
  state.foulExpiresAt = 0;
  state.substitutions = substitutions;
  state.substitutionActive = true;
  state.substitutionExpiresAt = Date.now() + 6000;
  if (state.sport === "volleyball") {
    const key = `${state.substitutionTeam}Substitutions`;
    state[key] = Math.min(6, Number(state[key] || 0) + substitutions.length);
  }
  saveState();
  render();
  restoreTransientTimers();
});

$("clearSubstitutionButton").addEventListener("click", clearSubstitution);

$("addSubstitutionButton").addEventListener("click", () => {
  const limit = sportConfig[state.sport].substitutionLimit;
  visibleSubstitutionRows = Math.min(limit, visibleSubstitutionRows + 1);
  render();
});

document.querySelectorAll("[data-remove-sub]").forEach((button) => {
  button.addEventListener("click", () => {
    const removeIndex = Number(button.dataset.removeSub);
    const entries = [...document.querySelectorAll("[data-sub-entry]")];
    const values = entries.slice(0, visibleSubstitutionRows).map((entry) => ({
      out: entry.querySelector("[data-player-out]").value,
      in: entry.querySelector("[data-player-in]").value,
    }));
    values.splice(removeIndex, 1);
    visibleSubstitutionRows = Math.max(1, visibleSubstitutionRows - 1);
    entries.forEach((entry, index) => {
      const value = values[index] || { out: "", in: "" };
      entry.querySelector("[data-player-out]").value = value.out;
      entry.querySelector("[data-player-in]").value = value.in;
    });
    render();
  });
});

$("showRunningTextButton").addEventListener("click", () => {
  const message = $("runningTextInput").value.trim();
  if (!message) {
    alert("Isi pesan running text terlebih dahulu.");
    return;
  }
  if (state.runningTextMessages.length >= 20) {
    alert("Maksimal 20 pesan dalam antrean running text.");
    return;
  }
  state.runningTextMessages.push(message);
  state.runningText = state.runningTextMessages.join("  •  ");
  state.runningTextActive = true;
  $("runningTextInput").value = "";
  saveState();
  render();
});

$("runningTextInput").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  $("showRunningTextButton").click();
});

$("toggleRunningTextButton").addEventListener("click", () => {
  if (!state.runningTextMessages.length) return;
  state.runningTextActive = !state.runningTextActive;
  saveState();
  render();
});

$("runningTextQueue").addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-running-text]");
  if (!button) return;
  state.runningTextMessages.splice(Number(button.dataset.deleteRunningText), 1);
  state.runningText = state.runningTextMessages.join("  •  ");
  if (!state.runningTextMessages.length) state.runningTextActive = false;
  saveState();
  render();
});

$("clearRunningTextButton").addEventListener("click", () => {
  state.runningTextMessages = [];
  state.runningText = "";
  state.runningTextActive = false;
  $("runningTextInput").value = "";
  saveState();
  render();
});

async function refreshCameraDevices() {
  if (!navigator.mediaDevices?.enumerateDevices) return;
  const devices = (await navigator.mediaDevices.enumerateDevices())
    .filter((device) => device.kind === "videoinput");
  const selected = state.cameraDeviceId || $("cameraDeviceSelect").value;
  $("cameraDeviceSelect").innerHTML =
    '<option value="">Kamera default</option>' +
    devices
      .map((device, index) =>
        `<option value="${escapeHtml(device.deviceId)}">${escapeHtml(device.label || `Kamera ${index + 1}`)}</option>`,
      )
      .join("");
  if ([...$("cameraDeviceSelect").options].some((option) => option.value === selected)) {
    $("cameraDeviceSelect").value = selected;
  }
}

function stopCameraPreview(renderAfter = true) {
  stopCameraFrameRelay();
  closeCameraPeerConnection();
  if (cameraPreviewStream) {
    cameraPreviewStream.getTracks().forEach((track) => track.stop());
    cameraPreviewStream = null;
  }
  const preview = $("cameraPreviewVideo");
  preview.pause();
  preview.srcObject = null;
  preview.removeAttribute("src");
  preview.load();
  $("stopCameraPreviewButton").disabled = true;
  syncCameraStreamToScoreboard();
  if (renderAfter) render();
}

$("cameraSourceType").addEventListener("change", (event) => {
  stopCameraPreview();
  state.cameraSourceType = event.target.value;
  state.cameraOverlayActive = false;
  saveState();
  render();
});

$("cameraStreamUrl").addEventListener("input", (event) => {
  state.cameraStreamUrl = event.target.value.trim();
  saveState();
  renderCameraControls();
});

$("cameraDeviceSelect").addEventListener("change", (event) => {
  state.cameraDeviceId = event.target.value;
  saveState();
});

$("cameraFilterSelect").addEventListener("change", (event) => {
  state.cameraFilter = event.target.value;
  saveState();
  render();
});

document.querySelectorAll("[data-camera-emoji]").forEach((button) => {
  button.addEventListener("click", () => {
    state.cameraEmoji = button.dataset.cameraEmoji;
    saveState();
    render();
  });
});

$("startCameraPreviewButton").addEventListener("click", async () => {
  stopCameraPreview();
  try {
    const preview = $("cameraPreviewVideo");
    if (state.cameraSourceType === "stream") {
      if (!state.cameraStreamUrl) {
        alert("Masukkan URL stream dari NDI Bridge terlebih dahulu.");
        return;
      }
      preview.src = state.cameraStreamUrl;
      await preview.play();
    } else {
      const constraints =
        state.cameraSourceType === "screen"
          ? null
          : {
              video: {
                deviceId: $("cameraDeviceSelect").value
                  ? { exact: $("cameraDeviceSelect").value }
                  : undefined,
                width: { ideal: 1920 },
                height: { ideal: 1080 },
              },
              audio: false,
            };
      cameraPreviewStream =
        state.cameraSourceType === "screen"
          ? await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
          : await navigator.mediaDevices.getUserMedia(constraints);
      preview.srcObject = cameraPreviewStream;
      await preview.play();
      if (state.cameraSourceType === "camera") {
        state.cameraDeviceId =
          cameraPreviewStream.getVideoTracks()[0]?.getSettings().deviceId ||
          $("cameraDeviceSelect").value ||
          "";
        saveState();
      }
      cameraPreviewStream.getVideoTracks()[0]?.addEventListener("ended", () => {
        state.cameraOverlayActive = false;
        stopCameraPreview();
        saveState();
      });
      await refreshCameraDevices();
    }
    $("stopCameraPreviewButton").disabled = false;
    render();
  } catch (error) {
    alert(`Sumber video tidak dapat dibuka: ${error.message || "izin kamera ditolak"}`);
    render();
  }
});

$("stopCameraPreviewButton").addEventListener("click", () => {
  state.cameraOverlayActive = false;
  stopCameraPreview();
  saveState();
});

$("playCameraButton").addEventListener("click", () => {
  if (state.cameraSourceType !== "stream" && !cameraPreviewStream) {
    alert("Aktifkan preview kamera terlebih dahulu.");
    return;
  }
  if (state.cameraSourceType === "stream" && !state.cameraStreamUrl) {
    alert("Masukkan URL stream terlebih dahulu.");
    return;
  }
  if (!scoreboardWindow || scoreboardWindow.closed) {
    scoreboardWindow = window.open("scoreboard.html", "skorkita-scoreboard");
    if (!scoreboardWindow) {
      alert("Izinkan pop-up agar camera output dapat dibuka di scoreboard.");
      return;
    }
  }
  if (state.cameraSourceType === "camera") {
    state.cameraDeviceId =
      cameraPreviewStream?.getVideoTracks()[0]?.getSettings().deviceId ||
      $("cameraDeviceSelect").value ||
      state.cameraDeviceId;
  }
  state.cameraOverlayActive = true;
  saveState();
  scoreboardWindow.focus();
  if (state.cameraSourceType === "camera") startCameraFrameRelay();
  [100, 350, 800].forEach((delay) => {
    window.setTimeout(syncCameraStreamToScoreboard, delay);
  });
  render();
});

$("closeCameraButton").addEventListener("click", () => {
  state.cameraOverlayActive = false;
  stopCameraFrameRelay();
  closeCameraPeerConnection();
  if (scoreboardWindow && !scoreboardWindow.closed) {
    scoreboardWindow.postMessage(
      { type: "skorkita-camera-close" },
      getPostMessageTargetOrigin(),
    );
  } else {
    cameraSignalChannel?.postMessage({ type: "skorkita-camera-close" });
  }
  saveState();
  render();
});

$("resetTimerButton").addEventListener("click", () => {
  stopTimer();
  state.seconds = phaseStartSeconds();
  state.matchStatus = "not-started";
  saveState();
  render();
});

function resetMatchData() {
  stopTimer();
  if (foulTimerId) window.clearTimeout(foulTimerId);
  foulTimerId = null;
  state.homeScore = 0;
  state.awayScore = 0;
  state.homeSets = 0;
  state.awaySets = 0;
  state.homePenaltyScore = 0;
  state.awayPenaltyScore = 0;
  state.penaltyShootoutActive = false;
  state.addedTimeActive = false;
  state.addedTimeSeconds = 0;
  state.period = 1;
  state.extraTime = false;
  state.reviewStatus = "";
  state.substitutionActive = false;
  state.substitutionExpiresAt = 0;
  state.substitutions = [];
  state.reviewTeam = "home";
  state.foulActive = false;
  state.foulExpiresAt = 0;
  state.foulTeam = "home";
  state.homeTimeouts = 0;
  state.awayTimeouts = 0;
  state.homeTeamFouls = 0;
  state.awayTeamFouls = 0;
  state.homeSubstitutions = 0;
  state.awaySubstitutions = 0;
  state.scoreHistory = [];
  state.matchStatus = "not-started";
  state.matchId = createMatchId();
  state.cameraOverlayActive = false;
  state.sponsorMode = false;
  state.sponsorExpiresAt = 0;
  state.runningTextMessages = [];
  state.runningText = "";
  state.runningTextActive = false;
  state.timerMode = sportConfig[state.sport].timerDirection === "down" ? "down" : "up";
  state.seconds = phaseStartSeconds();
  saveState();
  render();
}

$("resetButton").addEventListener("click", () => {
  const dialog = $("resetConfirmDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else if (confirm("Reset skor dan waktu pertandingan ini?")) resetMatchData();
});

$("resetConfirmDialog").addEventListener("close", () => {
  if ($("resetConfirmDialog").returnValue === "confirm") resetMatchData();
});

$("undoScoreButton").addEventListener("click", () => {
  const action = state.scoreHistory.pop();
  if (!action) return;
  state[`${action.team}Score`] = action.previousScore;
  saveState();
  render();
});

$("buzzerButton").addEventListener("click", () => {
  state.buzzerAt = Date.now();
  saveState();
  render();
});

$("finishMatchButton").addEventListener("click", () => {
  stopTimer();
  state.matchStatus = "finished";
  saveState();
  archiveCurrentMatch();
  render();
});

// Export buttons for the LIVE match use the embedded-logo snapshot.
async function exportCurrentMatch(kind) {
  const snapshot = await getMatchSnapshot();
  if (kind === "csv") exportMatchCsv(snapshot);
  else exportMatchPdf(snapshot);
}

async function assetToDataUrl(assetId, fallback = "") {
  if (!assetId) return fallback || "";
  try {
    const asset = await getMediaAsset(assetId);
    if (!asset?.blob) return fallback || "";
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => resolve(fallback || "");
      reader.readAsDataURL(asset.blob);
    });
  } catch {
    return fallback || "";
  }
}

async function getMatchSnapshot() {
  const penaltyResult = state.footballPenaltiesEnabled &&
    (state.penaltyShootoutActive || state.homePenaltyScore || state.awayPenaltyScore)
    ? ` (pen. ${state.homePenaltyScore}-${state.awayPenaltyScore})`
    : "";
  // Embed logos as data URLs so the archive stays self-contained even if the
  // underlying media asset is later removed. The large background is dropped.
  const [homeLogo, awayLogo, eventLogo] = await Promise.all([
    assetToDataUrl(state.homeLogoAssetId, state.homeLogo),
    assetToDataUrl(state.awayLogoAssetId, state.awayLogo),
    assetToDataUrl(state.eventLogoAssetId, state.eventLogo),
  ]);
  return {
    ...state,
    backgroundImage: "",
    backgroundAssetId: "",
    homeLogo,
    awayLogo,
    eventLogo,
    savedAt: new Date().toISOString(),
    finalResult: `${state.homeScore}-${state.awayScore}${penaltyResult}`,
  };
}

async function archiveCurrentMatch() {
  const snapshot = await getMatchSnapshot();
  const existingIndex = savedMatches.findIndex((match) => match.matchId === state.matchId);
  if (existingIndex >= 0) savedMatches.splice(existingIndex, 1);
  savedMatches.unshift(snapshot);
  if (!saveMatchArchive()) savedMatches.shift();
  renderSavedMatches();
}

$("saveMatchButton").addEventListener("click", () => {
  archiveCurrentMatch();
});

async function saveExportedFile(fileName, content, mimeType) {
  // Desktop (Tauri): write to Downloads via native filesystem and reveal it.
  if (window.ScoreboardDesktop?.isTauri && window.ScoreboardDesktop?.saveExportFile) {
    try {
      const bytes = new TextEncoder().encode(content);
      const path = await window.ScoreboardDesktop.saveExportFile(fileName, bytes);
      if (path) alert(`File tersimpan di:\n${path}`);
      return;
    } catch (error) {
      alert(`Gagal menyimpan file: ${error}`);
      return;
    }
  }
  // Browser fallback: trigger a normal download.
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function exportMatchCsv(match) {
  const teamName = (team) => team === "home" ? (match.homeName || "TIM A") : (match.awayName || "TIM B");
  const rows = [
    ["timestamp", "type", "team", "label_or_amount", "previous_score", "new_score", "period", "clock"],
    ...(match.scoreHistory || []).map((entry) => [
      entry.timestamp,
      entry.type,
      entry.team ? teamName(entry.team) : "",
      entry.type === "foul"
        ? (entry.foulLabel || entry.foulType || "")
        : (entry.amount > 0 ? `+${entry.amount}` : String(entry.amount ?? "")),
      entry.previousScore ?? "",
      entry.newScore ?? "",
      entry.period ?? "",
      formatTime(entry.seconds ?? 0),
    ]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const fileName = `${(match.eventName || "match").replace(/[^\w\s-]/g, "").trim() || "match"}-history.csv`;
  saveExportedFile(fileName, "﻿" + csv, "text/csv;charset=utf-8");
}

const SKORKITA_LOGO_SVG = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="width:36px;height:36px;vertical-align:middle"><rect width="64" height="64" rx="14" fill="#d8ff3e"/><text x="32" y="44" font-family="Arial Black,Arial,sans-serif" font-size="38" font-weight="900" text-anchor="middle" fill="#0a0a0a">S</text></svg>`;

async function exportMatchPdf(match) {
  const penaltyResult = match.footballPenaltiesEnabled &&
    (match.penaltyShootoutActive || match.homePenaltyScore || match.awayPenaltyScore)
    ? ` <small>(pen. ${match.homePenaltyScore || 0} - ${match.awayPenaltyScore || 0})</small>`
    : "";
  const eventLogoSource = await resolveMediaUrl(match.eventLogoAssetId, match.eventLogo);
  const homeLogoSource = await resolveMediaUrl(match.homeLogoAssetId, match.homeLogo);
  const awayLogoSource = await resolveMediaUrl(match.awayLogoAssetId, match.awayLogo);
  const history = match.scoreHistory || [];
  const teamName = (team) => team === "home" ? (match.homeName || "TIM A") : (match.awayName || "TIM B");
  const eventRow = (entry) => {
    const clock = escapeHtml(formatTime(entry.seconds ?? 0));
    const periode = `P${entry.period ?? "-"}`;
    if (entry.type === "foul") {
      return `<tr><td>${clock}</td><td>${periode}</td><td class="badge badge-foul">${escapeHtml(entry.foulLabel || entry.foulType || "Foul")}</td><td>—</td><td>—</td></tr>`;
    }
    const team = entry.team ? escapeHtml(teamName(entry.team)) : "—";
    const amount = entry.amount > 0 ? `+${entry.amount}` : String(entry.amount ?? "");
    const label = entry.type === "manual-score" ? "Set skor manual" : "Skor";
    return `<tr><td>${clock}</td><td>${periode}</td><td class="badge">${escapeHtml(label)}</td><td>${team}</td><td><b>${entry.newScore ?? "—"}</b> <small>(${amount})</small></td></tr>`;
  };
  const reportHtml = `<!doctype html>
<html><head><meta charset="utf-8"><title>${escapeHtml(match.eventName || "Hasil Pertandingan")}</title>
<style>
  *{box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;padding:42px 56px;color:#1a1a1a;background:#fff}
  .brandbar{display:flex;align-items:center;gap:10px;color:#444;font-weight:700;letter-spacing:3px;font-size:11px;padding-bottom:14px;border-bottom:2px solid #d8ff3e;margin-bottom:30px}
  header.match-head{text-align:center;margin-bottom:30px}
  header.match-head img.event-logo{max-height:64px;max-width:160px;margin-bottom:12px;object-fit:contain}
  header.match-head h1{margin:0 0 4px;font-size:26px;letter-spacing:1px}
  header.match-head .meta{color:#666;font-size:13px;margin-top:8px}
  .scoreline{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;margin:30px 0 12px;padding:24px;border:1px solid #e5e5e5;border-radius:14px;background:#fafafa}
  .team{text-align:center}
  .team img{max-height:88px;max-width:120px;object-fit:contain;margin-bottom:8px}
  .team h2{margin:0;font-size:20px;letter-spacing:1px}
  .team .role{color:#999;font-size:11px;letter-spacing:2px;margin-top:4px}
  .center-score{font-size:64px;font-weight:900;letter-spacing:2px;color:#111;line-height:1}
  .center-score small{display:block;font-size:14px;color:#666;margin-top:8px;font-weight:600;letter-spacing:1px}
  h3{margin-top:36px;margin-bottom:14px;font-size:15px;letter-spacing:3px;color:#444;text-transform:uppercase}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th,td{padding:10px 12px;border-bottom:1px solid #ececec;text-align:left}
  thead th{background:#f4f4f4;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555}
  .badge{display:inline-block;padding:3px 9px;background:#eef6ff;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:1px;color:#0858a8}
  .badge-foul{background:#fff2dc;color:#a35700}
  .empty{padding:24px;text-align:center;color:#999;font-style:italic}
  footer{margin-top:48px;padding-top:18px;border-top:1px solid #eee;color:#888;font-size:11px;display:flex;justify-content:space-between}
  .actions{margin-top:24px;text-align:center}
  .actions button{padding:10px 28px;font-size:14px;background:#d8ff3e;color:#0a0a0a;border:0;border-radius:8px;font-weight:700;letter-spacing:1px;cursor:pointer}
  @media print{.actions{display:none}}
</style></head><body>
<div class="brandbar">${SKORKITA_LOGO_SVG}<span>SKORKITA · LAPORAN PERTANDINGAN</span></div>
<header class="match-head">
  ${eventLogoSource ? `<img class="event-logo" src="${eventLogoSource}" alt="">` : ""}
  <h1>${escapeHtml(match.eventName || "Hasil Pertandingan")}</h1>
  <div class="meta">${escapeHtml(match.sport?.toUpperCase() || "")} · ${escapeHtml(match.matchStatus || "")} · disimpan ${new Date(match.savedAt || Date.now()).toLocaleString("id-ID")}</div>
</header>
<div class="scoreline">
  <div class="team">
    ${homeLogoSource ? `<img src="${homeLogoSource}" alt="">` : ""}
    <h2>${escapeHtml(match.homeName || "TIM A")}</h2>
    <div class="role">TUAN RUMAH</div>
  </div>
  <div class="center-score">${match.homeScore ?? 0} : ${match.awayScore ?? 0}${penaltyResult}<small>${escapeHtml(match.finalResult || "")}</small></div>
  <div class="team">
    ${awayLogoSource ? `<img src="${awayLogoSource}" alt="">` : ""}
    <h2>${escapeHtml(match.awayName || "TIM B")}</h2>
    <div class="role">TIM TAMU</div>
  </div>
</div>
<h3>Timeline Pertandingan</h3>
${history.length
  ? `<table><thead><tr><th>Waktu</th><th>Periode</th><th>Event</th><th>Tim</th><th>Skor</th></tr></thead><tbody>${history.map(eventRow).join("")}</tbody></table>`
  : `<div class="empty">Tidak ada event yang tercatat untuk pertandingan ini.</div>`}
<footer>
  <span>Dibuat oleh SkorKita Offline Scoreboard</span>
  <span>${new Date().toLocaleString("id-ID")}</span>
</footer>
</body></html>`;
  exportReportHtml(reportHtml, match.eventName || "match");
}

async function exportReportHtml(html, baseName) {
  // Desktop (Tauri): WebView blocks window.open AND iframe.print() is a no-op.
  // Save the styled report as an .html file and open it in the default browser,
  // where the user can print to PDF reliably.
  if (window.ScoreboardDesktop?.isTauri && window.ScoreboardDesktop?.saveExportFile) {
    const autoPrint = html.replace(
      "</body>",
      `<script>window.addEventListener("load",function(){setTimeout(function(){window.print();},600);});<\/script></body>`,
    );
    const fileName = `${(baseName || "match").replace(/[^\w\s-]/g, "").trim() || "match"}-laporan.html`;
    try {
      const bytes = new TextEncoder().encode(autoPrint);
      await window.ScoreboardDesktop.saveExportFile(fileName, bytes, {
        reveal: false,
        openAfter: true,
      });
    } catch (error) {
      alert(`Gagal membuat laporan: ${error}`);
    }
    return;
  }
  printHtmlReport(html);
}

// Print an HTML report using a hidden iframe (browser only). The native print
// dialog lets the user choose "Save as PDF".
function printHtmlReport(html) {
  const existing = document.getElementById("__report_print_frame");
  if (existing) existing.remove();
  const frame = document.createElement("iframe");
  frame.id = "__report_print_frame";
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
  document.body.appendChild(frame);
  const doc = frame.contentWindow?.document;
  if (!doc) {
    alert("Gagal menyiapkan laporan untuk dicetak.");
    return;
  }
  doc.open();
  doc.write(html);
  doc.close();
  const triggerPrint = () => {
    try {
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } catch (error) {
      alert(`Gagal mencetak laporan: ${error}`);
    }
  };
  // Wait for fonts/images (logos) to settle before invoking the print dialog.
  const images = Array.from(doc.images || []);
  const pending = images.filter((img) => !img.complete);
  if (!pending.length) {
    window.setTimeout(triggerPrint, 300);
    return;
  }
  let remaining = pending.length;
  const done = () => {
    remaining -= 1;
    if (remaining <= 0) window.setTimeout(triggerPrint, 200);
  };
  pending.forEach((img) => {
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });
  // Safety timeout in case an image never fires.
  window.setTimeout(triggerPrint, 1800);
}

$("exportCsvButton").addEventListener("click", () => {
  exportCurrentMatch("csv");
});

$("exportPdfButton").addEventListener("click", () => {
  exportCurrentMatch("pdf");
});

let archivePendingDeleteId = null;

$("savedMatchList").addEventListener("click", (event) => {
  const target = event.target.closest(
    "button[data-archive-export-pdf], button[data-archive-export-csv], button[data-archive-delete]",
  );
  if (!target) return;
  if (target.dataset.archiveExportPdf !== undefined) {
    const match = savedMatches.find((m) => m.matchId === target.dataset.archiveExportPdf);
    if (match) exportMatchPdf(match);
    return;
  }
  if (target.dataset.archiveExportCsv !== undefined) {
    const match = savedMatches.find((m) => m.matchId === target.dataset.archiveExportCsv);
    if (match) exportMatchCsv(match);
    return;
  }
  if (target.dataset.archiveDelete !== undefined) {
    const match = savedMatches.find((m) => m.matchId === target.dataset.archiveDelete);
    if (!match) return;
    archivePendingDeleteId = match.matchId;
    $("deleteArchiveText").textContent =
      `Arsip "${match.eventName || "Tanpa nama"}" (${match.homeName} ${match.homeScore}-${match.awayScore} ${match.awayName}) ` +
      `beserta log gol, foul, dan logo akan dihapus permanen.`;
    const dialog = $("deleteArchiveDialog");
    if (typeof dialog.showModal === "function") dialog.showModal();
  }
});

$("deleteArchiveDialog").addEventListener("close", () => {
  const dialog = $("deleteArchiveDialog");
  const matchId = archivePendingDeleteId;
  archivePendingDeleteId = null;
  if (dialog.returnValue !== "confirm" || !matchId) return;
  const idx = savedMatches.findIndex((m) => m.matchId === matchId);
  if (idx >= 0) {
    savedMatches.splice(idx, 1);
    saveMatchArchive();
    renderSavedMatches();
  }
});

$("openScoreboardButton").addEventListener("click", (event) => {
  event.preventDefault();
  if (window.ScoreboardDesktop?.openViewer) {
    window.ScoreboardDesktop.openViewer(false);
    return;
  }
  scoreboardWindow = window.open("scoreboard.html", "skorkita-scoreboard");
  window.setTimeout(() => saveState(), 350);
});

document.querySelector(".topbar-display-link").addEventListener("click", (event) => {
  event.preventDefault();
  $("openScoreboardButton").click();
});

function handleCameraSignal(message) {
  if (
    message?.type === "skorkita-camera-answer" &&
    message.answer &&
    cameraPeerConnection
  ) {
    cameraPeerConnection
      .setRemoteDescription(message.answer)
      .then(() => Promise.all(
        pendingCameraCandidates.splice(0).map((candidate) =>
          cameraPeerConnection.addIceCandidate(candidate),
        ),
      ))
      .catch(closeCameraPeerConnection);
  }
  if (
    message?.type === "skorkita-camera-ice" &&
    message.candidate &&
    cameraPeerConnection
  ) {
    if (cameraPeerConnection.remoteDescription) {
      cameraPeerConnection.addIceCandidate(message.candidate).catch(() => {});
    } else {
      pendingCameraCandidates.push(message.candidate);
    }
  }
}

cameraSignalChannel?.addEventListener("message", (event) => {
  handleCameraSignal(event.data);
});

window.addEventListener("message", (event) => {
  if (!isTrustedMessageEvent(event)) return;
  if (event.data?.type === "skorkita-request-state") {
    if (event.source) scoreboardWindow = event.source;
    saveState();
    window.setTimeout(syncCameraStreamToScoreboard, 150);
  }
  handleCameraSignal(event.data);
});

controllerStateChannel?.addEventListener("message", (event) => {
  if (event.data?.type !== "state" || event.data.source === controllerTabId) return;
  applyExternalState(event.data.state);
});

window.addEventListener("storage", (event) => {
  if (event.key === CONTROLLER_LEASE_KEY) {
    renewControllerLease();
    return;
  }
  if (event.key !== "skorkita-state" || !event.newValue) return;
  try {
    applyExternalState(JSON.parse(event.newValue));
  } catch {
    // Ignore partially written or invalid external state.
  }
});

window.addEventListener("visibilitychange", () => {
  if (!document.hidden && state.running) {
    syncTimerClock();
    saveState();
    render();
  }
});

window.addEventListener("beforeunload", () => {
  syncTimerClock();
  pendingStorageState = JSON.stringify(state);
  flushStateStorage();
  releaseControllerLease();
  if (controllerLeaseTimer) window.clearInterval(controllerLeaseTimer);
  controllerStateChannel?.close();
  mediaUrlCache.forEach((url) => URL.revokeObjectURL(url));
  mediaUrlCache.clear();
});

window.addEventListener("keydown", (event) => {
  if (controllerReadOnly) return;
  if (event.target.matches("input, select")) return;
  if (event.key.toLowerCase() === "a") setScore("home", 1);
  if (event.key.toLowerCase() === "l") setScore("away", 1);
  if (event.code === "Space") {
    event.preventDefault();
    if (state.running) $("pauseTimerButton").click();
    else $("startTimerButton").click();
  }
});

renewControllerLease();
controllerLeaseTimer = window.setInterval(renewControllerLease, 2000);
setControllerView(activeControllerView);
restoreRuntimeState();
render();
refreshMediaLibrary();
if (CAMERA_POPUP_ENABLED) refreshCameraDevices();

window.ScoreboardApp = {
  getState: () => JSON.parse(JSON.stringify(state)),
  getMediaAssets: getAllMediaAssets,
  getMatchArchives: () => JSON.parse(JSON.stringify(savedMatches)),
  applyMatchArchives(archives) {
    if (!Array.isArray(archives)) return;
    savedMatches = archives.slice(0, 20);
    try {
      localStorage.setItem("skorkita-match-history", JSON.stringify(savedMatches));
    } catch {
      // SQLite remains the durable archive.
    }
    renderSavedMatches();
  },
  applyExternalState,
  setControllerView,
};

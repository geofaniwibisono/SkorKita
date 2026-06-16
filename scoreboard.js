const displaySportConfig = {
  football: {
    periodName: "BABAK", extraPeriodName: "EXTRA TIME", timerDirection: "up", reviewName: "VAR",
    primaryStat: null, secondaryStat: null, reviewRequester: false,
  },
  futsal: {
    periodName: "BABAK", extraPeriodName: "EXTRA TIME", timerDirection: "down", reviewName: "VIDEO SUPPORT",
    primaryStat: "TIMEOUT", secondaryStat: "AKUM. FOUL", secondaryWarningAt: 5, reviewRequester: true,
  },
  basketball: {
    periodName: "KUARTER", extraPeriodName: "OVERTIME", timerDirection: "down", reviewName: "COACH'S CHALLENGE",
    primaryStat: "TIMEOUT", secondaryStat: "FOUL", secondaryWarningAt: 4, reviewRequester: true,
  },
  badminton: {
    periodName: "GAME", extraPeriodName: "", timerDirection: "none", reviewName: "CHALLENGE",
    primaryStat: "CHALLENGE", secondaryStat: null, reviewRequester: true,
  },
  volleyball: {
    periodName: "SET", extraPeriodName: "", timerDirection: "none", reviewName: "VIDEO CHALLENGE",
    primaryStat: "TIMEOUT", secondaryStat: "SUBSTITUSI", reviewRequester: true,
  },
};

const CAMERA_POPUP_ENABLED = false;

const displayDefaults = {
  schemaVersion: 7,
  matchId: "",
  eventName: "",
  eventLogo: "",
  eventLogoAssetId: "",
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
  periodFormat: "half",
  matchStatus: "not-started",
  period: 1,
  seconds: 0,
  timerMode: "up",
  normalTimeSeconds: 0,
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
  eventNameSize: 100,
  eventLogoSize: 100,
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

const isPreviewMode = new URLSearchParams(window.location.search).has("preview");
let lastSavedState = "";
let lastBuzzerAt = 0;
let previousScores = { home: null, away: null };
let entertainmentCameraStream = null;
let scoreboardCameraStream = null;
let scoreboardCameraRequestKey = "";
let scoreboardCameraPendingKey = "";
let cameraFrameActive = false;
let cameraPeerConnection = null;
let pendingCameraCandidates = [];
const cameraSignalChannel =
  typeof BroadcastChannel === "function"
    ? new BroadcastChannel("skorkita-camera-signal")
    : null;
const displayStateChannel =
  typeof BroadcastChannel === "function"
    ? new BroadcastChannel("skorkita-controller-state")
    : null;
const mediaUrlCache = new Map();
let displayClockTimer = null;

function getDisplayMessageTargetOrigin() {
  return window.location.origin === "null" ? "*" : window.location.origin;
}

function isTrustedDisplayMessage(event) {
  const sameOrigin =
    event.origin === window.location.origin ||
    (window.location.origin === "null" && event.origin === "null");
  const knownSource =
    event.source === window.opener ||
    event.source === window.parent ||
    event.source === window;
  return sameOrigin && knownSource;
}

function openDisplayMediaDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("skorkita-media-db", 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("media")) {
        const store = database.createObjectStore("media", { keyPath: "id" });
        store.createIndex("category", "category");
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function resolveDisplayMediaUrl(assetId, fallback = "") {
  if (!assetId) return fallback || "";
  if (mediaUrlCache.has(assetId)) return mediaUrlCache.get(assetId);
  try {
    const database = await openDisplayMediaDatabase();
    const asset = await new Promise((resolve, reject) => {
      const transaction = database.transaction("media", "readonly");
      const request = transaction.objectStore("media").get(assetId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => database.close();
    });
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

function pruneDisplayMediaUrlCache(state) {
  const active = new Set(
    [
      state.eventLogoAssetId,
      state.homeLogoAssetId,
      state.awayLogoAssetId,
      state.sponsorLogoAssetId,
      state.backgroundAssetId,
    ].filter(Boolean),
  );
  mediaUrlCache.forEach((url, assetId) => {
    if (active.has(assetId)) return;
    URL.revokeObjectURL(url);
    mediaUrlCache.delete(assetId);
  });
}

function getSavedState() {
  try {
    const saved = localStorage.getItem("skorkita-state") || "";
    const parsed = JSON.parse(saved || "{}");
    const state = { ...displayDefaults, ...parsed };
    if (
      state.sport === "volleyball" &&
      !Number.isFinite(parsed.homeSubstitutions) &&
      !Number.isFinite(parsed.awaySubstitutions)
    ) {
      state.homeSubstitutions = Number(state.homeTeamFouls || 0);
      state.awaySubstitutions = Number(state.awayTeamFouls || 0);
      state.homeTeamFouls = 0;
      state.awayTeamFouls = 0;
    }
    if (state.running && !state.timerStartedAt) {
      state.timerStartedAt = Date.now();
      state.timerBaseSeconds = state.seconds;
      state.timerBaseAddedSeconds = state.addedTimeSeconds;
    }
    if (state.backgroundImage && !state.backgroundMediaType) state.backgroundMediaType = "image";
    if (!parsed.displayTemplate) {
      state.displayTemplate = parsed.scoreboardStyle === "retro" ? "retro" : "modern";
    }
    return { saved, state };
  } catch {
    return { saved: "", state: { ...displayDefaults } };
  }
}

function formatDisplayTime(totalSeconds) {
  const minutes = Math.floor(Math.max(0, totalSeconds) / 60);
  const seconds = Math.max(0, totalSeconds) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getDisplayClock(state, now = Date.now()) {
  if (!state.running || !state.timerStartedAt) {
    return {
      seconds: state.seconds,
      addedTimeSeconds: state.addedTimeSeconds,
    };
  }
  const elapsed = Math.max(0, Math.floor((now - state.timerStartedAt) / 1000));
  if (state.addedTimeActive) {
    const targetMinutes =
      state.period === 1 ? state.firstHalfAddedTimeMinutes : state.secondHalfAddedTimeMinutes;
    return {
      seconds: state.timerBaseSeconds,
      addedTimeSeconds: Math.min(
        targetMinutes * 60,
        Number(state.timerBaseAddedSeconds || 0) + elapsed,
      ),
    };
  }
  const duration = state.extraTime
    ? state.extraTimeDurationSeconds
    : state.normalTimeSeconds;
  return {
    seconds:
      state.timerMode === "down"
        ? Math.max(0, Number(state.timerBaseSeconds || 0) - elapsed)
        : Math.min(duration, Number(state.timerBaseSeconds || 0) + elapsed),
    addedTimeSeconds: state.addedTimeSeconds,
  };
}

function updateDisplayClock() {
  const config =
    displaySportConfig[currentDisplayState.sport] || displaySportConfig.football;
  const clock = getDisplayClock(currentDisplayState);
  const timer = document.getElementById("timerDisplay");
  timer.textContent = currentDisplayState.penaltyShootoutActive
    ? "PEN"
    : config.timerDirection === "none"
      ? "VS"
      : formatDisplayTime(clock.seconds);
  timer.classList.toggle("running", Boolean(currentDisplayState.running));
  const addedTimeDisplay = document.getElementById("addedTimeDisplay");
  addedTimeDisplay.hidden = !currentDisplayState.addedTimeActive;
  addedTimeDisplay.textContent = `+${formatDisplayTime(clock.addedTimeSeconds)}`;
}

function transientVisible(active, expiresAt) {
  return Boolean(active && Number(expiresAt || 0) > Date.now());
}

function updateDisplayTransientOverlays() {
  document
    .getElementById("substitutionOverlay")
    .classList.toggle(
      "is-visible",
      transientVisible(
        currentDisplayState.substitutionActive,
        currentDisplayState.substitutionExpiresAt,
      ),
    );
  document
    .getElementById("foulOverlay")
    .classList.toggle(
      "is-visible",
      transientVisible(
        currentDisplayState.foulActive,
        currentDisplayState.foulExpiresAt,
      ),
    );
  document
    .getElementById("sponsorOverlay")
    .classList.toggle(
      "is-visible",
      transientVisible(
        currentDisplayState.sponsorMode,
        currentDisplayState.sponsorExpiresAt,
      ),
    );
}

function getDisplayRallyStatus(state) {
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

function getDisplayPeriodName(state, config) {
  const labels = {
    quarter: "KUARTER",
    half: "BABAK",
    set: "SET",
    game: "GAME",
  };
  return labels[state.periodFormat] || config.periodName;
}

function playBuzzer() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = 220;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.32, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.7);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.72);
    oscillator.onended = () => context.close();
  } catch {
    // Some browsers require an interaction on the display before audio is allowed.
  }
}

async function updateDisplayLogo(team, logo, assetId) {
  const image = document.getElementById(`${team}Logo`);
  const placeholder = document
    .getElementById(`${team}LogoFrame`)
    .querySelector(".logo-placeholder");
  const source = await resolveDisplayMediaUrl(assetId, logo);
  image.src = source || "";
  image.hidden = !source;
  placeholder.hidden = Boolean(source);
  image.onload = () => applyLogoFit(team);
}

function applyLogoFit(team) {
  const image = document.getElementById(`${team}Logo`);
  const mode = currentDisplayState[`${team}LogoFit`] || "auto";
  const manualSize = Number(currentDisplayState[`${team}LogoSize`]) || 100;
  const ratio = image.naturalWidth && image.naturalHeight
    ? image.naturalWidth / image.naturalHeight
    : 1;
  let autoFactor = 1;
  if (mode === "auto") {
    if (ratio > 1.8) autoFactor = 0.78;
    else if (ratio < 0.62) autoFactor = 0.82;
    else if (ratio > 1.35 || ratio < 0.78) autoFactor = 0.9;
  }
  const renderedSize = 82 * (manualSize / 100) * autoFactor;
  image.style.width = `${renderedSize}%`;
  image.style.height = `${renderedSize}%`;
  image.style.objectFit = mode === "cover" ? "cover" : "contain";
}

let currentDisplayState = { ...displayDefaults };

function applyOutputRatio(width, height) {
  const board = document.querySelector(".display-board");
  const shell = document.querySelector(".display-shell");
  const virtualWidth = 1280;
  const virtualHeight = Math.round((virtualWidth * height) / width);
  const scale = Math.min(
    window.innerWidth / virtualWidth,
    window.innerHeight / virtualHeight,
  );
  const renderedW = virtualWidth * scale;
  const renderedH = virtualHeight * scale;
  if (shell) {
    shell.style.display = "block";
    shell.style.minHeight = "100vh";
    shell.style.height = "100vh";
    shell.style.position = "relative";
    shell.style.overflow = "hidden";
  }
  board.style.minHeight = "0";
  board.style.position = "absolute";
  board.style.top = `${(window.innerHeight - renderedH) / 2}px`;
  board.style.left = `${(window.innerWidth - renderedW) / 2}px`;
  board.style.width = `${virtualWidth}px`;
  board.style.height = `${virtualHeight}px`;
  board.style.transformOrigin = "top left";
  board.style.transform = `scale(${scale})`;
  const minDim = Math.min(virtualWidth, virtualHeight);
  const maxDim = Math.max(virtualWidth, virtualHeight);
  board.style.setProperty("--board-w", `${virtualWidth}px`);
  board.style.setProperty("--board-h", `${virtualHeight}px`);
  board.style.setProperty("--board-min-dim", `${minDim}px`);
  board.style.setProperty("--board-max-dim", `${maxDim}px`);
}

function renderDisplay(state) {
  currentDisplayState = state;
  pruneDisplayMediaUrlCache(state);
  const config = displaySportConfig[state.sport] || displaySportConfig.football;
  const periodName = getDisplayPeriodName(state, config);
  document.getElementById("periodLabel").textContent = state.penaltyShootoutActive
    ? "ADU PENALTI"
    : state.extraTime
      ? `${config.extraPeriodName} ${state.period}`
      : `${periodName} ${state.period}`;
  const eventNameEl = document.getElementById("eventNameDisplay");
  eventNameEl.textContent = state.eventName || "PERTANDINGAN";
  eventNameEl.style.fontSize = `${(Number(state.eventNameSize) || 100) / 100}em`;
  const eventLogo = document.getElementById("eventLogoDisplay");
  const eventLogoScale = (Number(state.eventLogoSize) || 100) / 100;
  resolveDisplayMediaUrl(state.eventLogoAssetId, state.eventLogo).then((source) => {
    eventLogo.src = source || "";
    eventLogo.hidden = !source;
    eventLogo.style.transform = `scale(${eventLogoScale})`;
  });
  document.getElementById("homeNameDisplay").textContent = state.homeName || "TIM A";
  document.getElementById("awayNameDisplay").textContent = state.awayName || "TIM B";
  ["home", "away"].forEach((team) => {
    const scoreElement = document.getElementById(`${team}ScoreDisplay`);
    const nextScore = state[`${team}Score`];
    if (previousScores[team] !== null && previousScores[team] !== nextScore) {
      scoreElement.classList.remove("score-changed");
      void scoreElement.offsetWidth;
      scoreElement.classList.add("score-changed");
    }
    scoreElement.textContent = nextScore;
    previousScores[team] = nextScore;
  });
  document.getElementById("homeSetDisplay").textContent = state.homeSets;
  document.getElementById("awaySetDisplay").textContent = state.awaySets;
  document.getElementById("homeTimeoutsDisplay").textContent = state.homeTimeouts;
  document.getElementById("awayTimeoutsDisplay").textContent = state.awayTimeouts;
  document.getElementById("homeTeamFoulsDisplay").textContent =
    state.sport === "volleyball" ? state.homeSubstitutions : state.homeTeamFouls;
  document.getElementById("awayTeamFoulsDisplay").textContent =
    state.sport === "volleyball" ? state.awaySubstitutions : state.awayTeamFouls;
  ["home", "away"].forEach((team) => {
    document.getElementById(`${team}PrimaryStat`).hidden = !config.primaryStat;
    document.getElementById(`${team}SecondaryStat`).hidden = !config.secondaryStat;
    document.getElementById(`${team}PrimaryStatLabel`).textContent = config.primaryStat || "";
    document.getElementById(`${team}SecondaryStatLabel`).textContent = config.secondaryStat || "";
    document.getElementById(`${team}SecondaryStat`).classList.toggle(
      "is-warning",
      Boolean(
        config.secondaryWarningAt &&
          state[`${team}TeamFouls`] >= config.secondaryWarningAt,
      ),
    );
  });

  updateDisplayClock();
  const rallyStatus = getDisplayRallyStatus(state);
  const rallyStatusElement = document.getElementById("rallyStatus");
  rallyStatusElement.hidden = !rallyStatus;
  rallyStatusElement.textContent = rallyStatus;

  const setStrip = document.getElementById("setStrip");
  setStrip.hidden = state.sport !== "badminton" && state.sport !== "volleyball";
  document.getElementById("setStripLabel").textContent =
    state.sport === "badminton" ? "GAME" : "SET";
  const penaltyStrip = document.getElementById("penaltyStrip");
  penaltyStrip.hidden = !state.penaltyShootoutActive;
  document.getElementById("homePenaltyScoreDisplay").textContent = state.homePenaltyScore;
  document.getElementById("awayPenaltyScoreDisplay").textContent = state.awayPenaltyScore;
  const board = document.querySelector(".display-board");
  board.dataset.template = state.displayTemplate || "modern";
  board.dataset.style = state.scoreboardStyle || "modern";
  board.dataset.layout = state.layoutPreset || "classic";
  board.dataset.palette = state.scoreboardStyle === "retro"
    ? state.retroPalette || "cyan"
    : state.modernPalette || "white";
  board.dataset.background =
    state.backgroundImage || state.backgroundAssetId ? "media" : state.background;
  board.dataset.sport = state.sport;
  board.dataset.highContrast = state.highContrast ? "true" : "false";
  board.style.setProperty("--home-color", state.homeColor || "#4d8dff");
  board.style.setProperty("--away-color", state.awayColor || "#ff4d5f");
  const ratioWidth =
    state.displayRatio === "4:3"
      ? 4
      : state.displayRatio === "custom"
        ? Math.max(1, Number(state.customRatioWidth) || 16)
        : 16;
  const ratioHeight =
    state.displayRatio === "4:3"
      ? 3
      : state.displayRatio === "custom"
        ? Math.max(1, Number(state.customRatioHeight) || 9)
        : 9;
  board.style.setProperty("--display-ratio", `${ratioWidth} / ${ratioHeight}`);
  applyOutputRatio(ratioWidth, ratioHeight);
  board.style.setProperty("--background-overlay", Number(state.backgroundOverlay) / 100);
  board.style.setProperty("--layout-scale", (Number(state.layoutScale) || 100) / 100);
  const layoutGap = Number(state.layoutGap) || 100;
  board.style.setProperty("--layout-gap", `${layoutGap * 0.4}px`);
  board.style.setProperty("--layout-row-gap", `${layoutGap * 0.18}px`);
  board.style.setProperty(
    "--layout-vertical",
    `${((Number(state.layoutVertical) || 0) / 100) * 12}vh`,
  );
  const customImage = document.getElementById("customBackgroundImage");
  const customVideo = document.getElementById("customBackgroundVideo");
  const scale = (Number(state.backgroundScale) || 100) / 100;
  const hasBackgroundMedia = Boolean(state.backgroundImage || state.backgroundAssetId);
  customImage.hidden = state.backgroundMediaType !== "image" || !hasBackgroundMedia;
  customVideo.hidden = state.backgroundMediaType !== "video" || !hasBackgroundMedia;
  customImage.style.transform = `scale(${scale})`;
  customVideo.style.transform = `scale(${scale})`;
  resolveDisplayMediaUrl(state.backgroundAssetId, state.backgroundImage).then((source) => {
    if (!customImage.hidden) customImage.src = source;
    if (!customVideo.hidden) {
      if (customVideo.src !== source) customVideo.src = source;
      customVideo.loop = Boolean(state.videoLoop);
      if (state.videoPlaying) {
        if (customVideo.ended) customVideo.currentTime = 0;
        customVideo.play().catch(() => {});
      } else {
        customVideo.pause();
      }
    }
  });
  if (customVideo.hidden) {
    customVideo.pause();
    if (customVideo.src) customVideo.removeAttribute("src");
  }
  const reviewOverlay = document.getElementById("reviewOverlay");
  const reviewLabels = {
    checking: {
      title: `CHECKING ${config.reviewName}`,
      result: "Keputusan sedang diperiksa",
    },
    accepted: {
      title: `${config.reviewName} DITERIMA`,
      result: "KEPUTUSAN DIUBAH",
    },
    rejected: {
      title: `${config.reviewName} DITOLAK`,
      result: "KEPUTUSAN TETAP",
    },
  };
  reviewOverlay.classList.toggle("is-visible", Boolean(state.reviewStatus));
  reviewOverlay.dataset.status = state.reviewStatus;
  if (state.reviewStatus) {
    document.getElementById("reviewStatusText").textContent = reviewLabels[state.reviewStatus].title;
    document.getElementById("reviewResultText").textContent = reviewLabels[state.reviewStatus].result;
  }
  document.getElementById("reviewRequester").textContent =
    `DIAJUKAN OLEH ${state.reviewTeam === "away" ? state.awayName : state.homeName}`;
  document.querySelector(".review-requester").hidden = !config.reviewRequester;
  const reviewTeam = state.reviewTeam === "away" ? "away" : "home";
  const reviewLogo = document.getElementById("reviewTeamLogo");
  const reviewPlaceholder = document.getElementById("reviewTeamLogoPlaceholder");
  resolveDisplayMediaUrl(
    state[`${reviewTeam}LogoAssetId`],
    state[`${reviewTeam}Logo`],
  ).then((source) => {
    reviewLogo.src = source || "";
    reviewLogo.hidden = !source;
    reviewPlaceholder.hidden = Boolean(source);
  });
  reviewPlaceholder.textContent = reviewTeam === "away" ? "A" : "H";
  const substitutionOverlay = document.getElementById("substitutionOverlay");
  substitutionOverlay.classList.toggle(
    "is-visible",
    transientVisible(state.substitutionActive, state.substitutionExpiresAt),
  );
  document.getElementById("substitutionTeamName").textContent =
    state.substitutionTeam === "away" ? state.awayName : state.homeName;
  const substitutions = Array.isArray(state.substitutions) ? state.substitutions : [];
  document.getElementById("playersOutList").innerHTML = substitutions
    .map((substitution, index) => `
      <div class="switch-player">
        <span>${index + 1}</span>
        <b>${escapeDisplayText(substitution.out)}</b>
      </div>
    `)
    .join("");
  document.getElementById("playersInList").innerHTML = substitutions
    .map((substitution, index) => `
      <div class="switch-player">
        <span>${index + 1}</span>
        <b>${escapeDisplayText(substitution.in)}</b>
      </div>
    `)
    .join("");
  const foulOverlay = document.getElementById("foulOverlay");
  foulOverlay.classList.toggle(
    "is-visible",
    transientVisible(state.foulActive, state.foulExpiresAt),
  );
  foulOverlay.dataset.tone = state.foulTone || "warning";
  document.getElementById("foulEventSymbol").textContent = state.foulSymbol || "!";
  document.getElementById("foulEventText").textContent = state.foulLabel || "MATCH EVENT";
  const foulTeam = state.foulTeam === "away" ? "away" : "home";
  document.getElementById("foulTeamName").textContent =
    foulTeam === "away" ? state.awayName : state.homeName;
  const foulLogo = document.getElementById("foulTeamLogo");
  const foulPlaceholder = document.getElementById("foulTeamLogoPlaceholder");
  resolveDisplayMediaUrl(
    state[`${foulTeam}LogoAssetId`],
    state[`${foulTeam}Logo`],
  ).then((source) => {
    foulLogo.src = source || "";
    foulLogo.hidden = !source;
    foulPlaceholder.hidden = Boolean(source);
  });
  foulPlaceholder.textContent = foulTeam === "away" ? "A" : "H";
  const runningTextBar = document.getElementById("runningTextBar");
  const runningMessages = Array.isArray(state.runningTextMessages) && state.runningTextMessages.length
    ? state.runningTextMessages
    : state.runningText
      ? [state.runningText]
      : [];
  const runningText = runningMessages.join("   ◆   ");
  runningTextBar.classList.toggle("is-visible", Boolean(state.runningTextActive && runningText));
  document.getElementById("runningTextDisplay").textContent = runningText;
  document.getElementById("runningTextDuplicate").textContent = runningText;
  const sponsorOverlay = document.getElementById("sponsorOverlay");
  sponsorOverlay.classList.toggle(
    "is-visible",
    transientVisible(state.sponsorMode, state.sponsorExpiresAt),
  );
  sponsorOverlay.dataset.template = state.sponsorTemplate || "sport";
  sponsorOverlay.dataset.sport = state.sport;
  const sponsorKicker = document.getElementById("sponsorKickerDisplay");
  if (sponsorKicker) {
    const kickerText = (state.sponsorPresentedByText ?? "PRESENTED BY").trim();
    sponsorKicker.textContent = kickerText;
    sponsorKicker.hidden = !kickerText;
  }
  const sponsorName = document.getElementById("sponsorNameDisplay");
  sponsorName.textContent = state.sponsorName || "";
  sponsorName.hidden = !state.sponsorName;
  sponsorName.style.fontSize = `${(Number(state.sponsorNameSize) || 100) / 100}em`;
  const sponsorLogo = document.getElementById("sponsorLogoDisplay");
  const sponsorLogoScale = (Number(state.sponsorLogoSize) || 100) / 100;
  resolveDisplayMediaUrl(state.sponsorLogoAssetId, state.sponsorLogo).then((source) => {
    sponsorLogo.src = source || "";
    sponsorLogo.hidden = !source;
    sponsorLogo.style.transform = `scale(${sponsorLogoScale})`;
  });
  const cameraOverlay = document.getElementById("cameraOverlay");
  const cameraVideo = document.getElementById("cameraOutputVideo");
  const cameraFrame = document.getElementById("cameraOutputFrame");
  const cameraHasSource =
    state.cameraSourceType === "stream"
      ? Boolean(state.cameraStreamUrl)
      : state.cameraSourceType === "camera"
        ? cameraFrameActive || Boolean(scoreboardCameraStream)
        : Boolean(entertainmentCameraStream);
  const cameraIsActive = Boolean(
    CAMERA_POPUP_ENABLED && state.cameraOverlayActive,
  );
  cameraOverlay.classList.toggle("is-visible", cameraIsActive);
  cameraOverlay.dataset.filter = state.cameraFilter || "none";
  document.getElementById("cameraOutputEmoji").textContent = state.cameraEmoji || "";
  document.getElementById("cameraOutputTitle").textContent = state.eventName || "LIVE EVENT";
  document.getElementById("cameraOutputPlaceholder").hidden = cameraHasSource;
  if (state.cameraSourceType === "stream") {
    cameraFrame.hidden = true;
    cameraVideo.hidden = false;
    if (cameraVideo.srcObject) cameraVideo.srcObject = null;
    if (cameraVideo.getAttribute("src") !== state.cameraStreamUrl) {
      cameraVideo.src = state.cameraStreamUrl || "";
    }
  } else if (state.cameraSourceType === "screen") {
    cameraFrame.hidden = true;
    cameraVideo.hidden = false;
    cameraVideo.removeAttribute("src");
    cameraVideo.srcObject = entertainmentCameraStream;
  }
  if (state.cameraSourceType === "camera") {
    cameraFrame.hidden = !cameraFrameActive;
    cameraVideo.hidden = cameraFrameActive;
  }
  if (
    state.cameraSourceType === "camera" &&
    cameraIsActive &&
    !cameraFrameActive
  ) {
    window.setTimeout(() => {
      if (
        CAMERA_POPUP_ENABLED &&
        !cameraFrameActive &&
        currentDisplayState.cameraOverlayActive
      ) {
        ensureScoreboardCamera(currentDisplayState);
      }
    }, 1200);
  } else if (state.cameraSourceType !== "camera" || !cameraIsActive) {
    stopScoreboardCamera();
  }
  if (cameraIsActive && cameraHasSource) {
    cameraVideo.play().catch(() => {});
  }
  if (state.buzzerAt && lastBuzzerAt && state.buzzerAt !== lastBuzzerAt) {
    playBuzzer();
  }
  lastBuzzerAt = state.buzzerAt || lastBuzzerAt;
  updateDisplayLogo("home", state.homeLogo, state.homeLogoAssetId);
  updateDisplayLogo("away", state.awayLogo, state.awayLogoAssetId);
  ["home", "away"].forEach((team) => {
    applyLogoFit(team);
  });
}

function stopScoreboardCamera() {
  if (scoreboardCameraStream) {
    scoreboardCameraStream.getTracks().forEach((track) => track.stop());
  }
  scoreboardCameraStream = null;
  scoreboardCameraRequestKey = "";
  scoreboardCameraPendingKey = "";
  const video = document.getElementById("cameraOutputVideo");
  if (currentDisplayState.cameraSourceType === "camera") video.srcObject = null;
}

async function ensureScoreboardCamera(state) {
  const requestKey = state.cameraDeviceId || "default";
  if (scoreboardCameraStream && scoreboardCameraRequestKey === requestKey) return;
  if (scoreboardCameraPendingKey === requestKey) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    document.getElementById("cameraOutputPlaceholder").textContent =
      "KAMERA MEMERLUKAN LOCALHOST / HTTPS";
    return;
  }
  scoreboardCameraRequestKey = requestKey;
  const placeholder = document.getElementById("cameraOutputPlaceholder");
  placeholder.hidden = false;
  placeholder.textContent = "MENGHUBUNGKAN KAMERA...";
  stopScoreboardCamera();
  scoreboardCameraRequestKey = requestKey;
  scoreboardCameraPendingKey = requestKey;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: state.cameraDeviceId ? { exact: state.cameraDeviceId } : undefined,
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
      audio: false,
    });
    if (
      !currentDisplayState.cameraOverlayActive ||
      currentDisplayState.cameraSourceType !== "camera" ||
      scoreboardCameraRequestKey !== requestKey
    ) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    scoreboardCameraStream = stream;
    scoreboardCameraPendingKey = "";
    const video = document.getElementById("cameraOutputVideo");
    video.removeAttribute("src");
    video.srcObject = stream;
    placeholder.hidden = true;
    await video.play();
  } catch {
    scoreboardCameraStream = null;
    scoreboardCameraPendingKey = "";
    placeholder.hidden = false;
    placeholder.textContent = "IZINKAN AKSES KAMERA DI TAB SCOREBOARD";
  }
}

function closeCameraPeerConnection() {
  if (cameraPeerConnection) cameraPeerConnection.close();
  cameraPeerConnection = null;
  pendingCameraCandidates = [];
  entertainmentCameraStream = null;
  cameraFrameActive = false;
  document.getElementById("cameraOutputFrame").removeAttribute("src");
  stopScoreboardCamera();
  const video = document.getElementById("cameraOutputVideo");
  if (currentDisplayState.cameraSourceType !== "stream") video.srcObject = null;
  renderDisplay(currentDisplayState);
}

window.setEntertainmentCameraStream = (stream) => {
  closeCameraPeerConnection();
  entertainmentCameraStream = stream || null;
  const video = document.getElementById("cameraOutputVideo");
  if (currentDisplayState.cameraSourceType !== "stream") {
    video.removeAttribute("src");
    video.srcObject = entertainmentCameraStream;
    document.getElementById("cameraOutputPlaceholder").hidden =
      Boolean(entertainmentCameraStream);
    if (currentDisplayState.cameraOverlayActive && entertainmentCameraStream) {
      video.play().catch(() => {});
    }
  }
  renderDisplay(currentDisplayState);
};

function escapeDisplayText(value) {
  const element = document.createElement("span");
  element.textContent = value || "";
  return element.innerHTML;
}

function syncDisplay() {
  const current = getSavedState();
  if (current.saved !== lastSavedState) {
    lastSavedState = current.saved;
    renderDisplay(current.state);
  }
}

if (!isPreviewMode) {
  window.addEventListener("storage", (event) => {
    if (event.key === "skorkita-state") syncDisplay();
  });
  displayStateChannel?.addEventListener("message", (event) => {
    if (event.data?.type === "state" && event.data.state) {
      renderDisplay({ ...displayDefaults, ...event.data.state });
    }
  });
}

async function handleCameraSignal(message, replyTarget = null) {
  if (message?.type === "skorkita-camera-offer" && message.offer) {
    closeCameraPeerConnection();
    const connection = new RTCPeerConnection();
    cameraPeerConnection = connection;
    const sendReply = (reply) => {
      if (replyTarget) {
        replyTarget.postMessage(reply, getDisplayMessageTargetOrigin());
      }
      else cameraSignalChannel?.postMessage(reply);
    };
    connection.addEventListener("track", (trackEvent) => {
      entertainmentCameraStream =
        trackEvent.streams[0] || new MediaStream([trackEvent.track]);
      const video = document.getElementById("cameraOutputVideo");
      video.removeAttribute("src");
      video.srcObject = entertainmentCameraStream;
      document.getElementById("cameraOutputPlaceholder").hidden = true;
      video.play().catch(() => {});
      renderDisplay(currentDisplayState);
    });
    connection.addEventListener("icecandidate", (iceEvent) => {
      if (!iceEvent.candidate) return;
      sendReply({ type: "skorkita-camera-ice", candidate: iceEvent.candidate });
    });
    try {
      await connection.setRemoteDescription(message.offer);
      await Promise.all(
        pendingCameraCandidates.splice(0).map((candidate) =>
          connection.addIceCandidate(candidate),
        ),
      );
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      sendReply({
        type: "skorkita-camera-answer",
        answer: connection.localDescription,
      });
    } catch {
      closeCameraPeerConnection();
    }
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
  if (message?.type === "skorkita-camera-close") {
    closeCameraPeerConnection();
  }
}

cameraSignalChannel?.addEventListener("message", (event) => {
  handleCameraSignal(event.data);
});

window.addEventListener("message", (event) => {
  if (!isTrustedDisplayMessage(event)) return;
  if (event.data?.type === "skorkita-state" && event.data.state) {
    renderDisplay({ ...displayDefaults, ...event.data.state });
  }
  if (
    isPreviewMode &&
    event.data?.type === "skorkita-preview-state" &&
    event.data.state
  ) {
    renderDisplay({ ...displayDefaults, ...event.data.state });
  }
  if (event.data?.type === "skorkita-fullscreen") {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  if (event.data?.type === "skorkita-minimize") {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    window.blur();
  }
  if (event.data?.type === "skorkita-camera-frame" && event.data.frame) {
    cameraFrameActive = true;
    stopScoreboardCamera();
    const frame = document.getElementById("cameraOutputFrame");
    const video = document.getElementById("cameraOutputVideo");
    frame.src = event.data.frame;
    frame.hidden = false;
    video.hidden = true;
    document.getElementById("cameraOutputPlaceholder").hidden = true;
  }
  if (event.data?.type === "skorkita-camera-frame-close") {
    cameraFrameActive = false;
    const frame = document.getElementById("cameraOutputFrame");
    frame.removeAttribute("src");
    frame.hidden = true;
  }
  handleCameraSignal(event.data, event.source);
});

window.addEventListener("resize", () => {
  const state = currentDisplayState;
  const width =
    state.displayRatio === "4:3"
      ? 4
      : state.displayRatio === "custom"
        ? Math.max(1, Number(state.customRatioWidth) || 16)
        : 16;
  const height =
    state.displayRatio === "4:3"
      ? 3
      : state.displayRatio === "custom"
        ? Math.max(1, Number(state.customRatioHeight) || 9)
        : 9;
  applyOutputRatio(width, height);
});

const fullscreenButton = document.getElementById("displayFullscreen");
const fullscreenBoard = document.querySelector(".display-board");
Object.assign(fullscreenButton.style, {
  top: "auto",
  right: "auto",
  bottom: "84px",
  left: "20px",
});

function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

function syncFullscreenButton() {
  const active =
    Boolean(getFullscreenElement()) ||
    fullscreenBoard.classList.contains("is-viewport-fullscreen");
  fullscreenButton.title = active ? "Keluar fullscreen" : "Fullscreen";
  fullscreenButton.setAttribute(
    "aria-label",
    active ? "Keluar fullscreen" : "Fullscreen",
  );
  window.dispatchEvent(new Event("resize"));
}

fullscreenButton.addEventListener("click", async () => {
  if (getFullscreenElement()) {
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
    if (exitFullscreen) {
      try {
        await Promise.resolve(exitFullscreen.call(document));
      } catch {
        // The viewport fallback below still restores the normal layout.
      }
    }
    fullscreenBoard.classList.remove("is-viewport-fullscreen");
    syncFullscreenButton();
    return;
  }

  if (fullscreenBoard.classList.contains("is-viewport-fullscreen")) {
    fullscreenBoard.classList.remove("is-viewport-fullscreen");
    syncFullscreenButton();
    return;
  }

  const requestFullscreen =
    fullscreenBoard.requestFullscreen || fullscreenBoard.webkitRequestFullscreen;
  if (requestFullscreen) {
    try {
      await requestFullscreen.call(fullscreenBoard);
    } catch {
      fullscreenBoard.classList.add("is-viewport-fullscreen");
    }
  } else {
    fullscreenBoard.classList.add("is-viewport-fullscreen");
  }
  syncFullscreenButton();
});

document.addEventListener("fullscreenchange", syncFullscreenButton);
document.addEventListener("webkitfullscreenchange", syncFullscreenButton);

const initial = getSavedState();
lastSavedState = initial.saved;
renderDisplay(initial.state);
displayClockTimer = window.setInterval(() => {
  updateDisplayClock();
  updateDisplayTransientOverlays();
}, 250);
window.ScoreboardViewer = {
  applyState(nextState) {
    if (!nextState || typeof nextState !== "object") return;
    const merged = { ...displayDefaults, ...nextState };
    try {
      localStorage.setItem("skorkita-state", JSON.stringify(merged));
      lastSavedState = JSON.stringify(merged);
    } catch {
      // The desktop database or LAN server still owns the durable state.
    }
    renderDisplay(merged);
  },
};
if (window.opener && !isPreviewMode) {
  window.opener.postMessage(
    { type: "skorkita-request-state" },
    getDisplayMessageTargetOrigin(),
  );
}

window.addEventListener("beforeunload", () => {
  if (displayClockTimer) window.clearInterval(displayClockTimer);
  displayStateChannel?.close();
  mediaUrlCache.forEach((url) => URL.revokeObjectURL(url));
  mediaUrlCache.clear();
});

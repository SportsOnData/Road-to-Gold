/*
  ROAD TO GOLD · ANALÍTICA
  GA4 con consentimiento básico. No se carga Google Analytics hasta aceptar.
*/

const RTG_ANALYTICS_ID = "G-8CJYNBJT00";
const RTG_ANALYTICS_VERSION = "beta_analytics_1";
const RTG_ANALYTICS_CONSENT_KEY = "roadToGoldAnalyticsConsent";

let rtgAnalyticsEnabled = false;
let rtgAnalyticsLoaded = false;
let rtgAnalyticsRunActive = false;
let rtgAnalyticsStage = "menu";
let rtgAnalyticsRunNumber = 0;

function obtenerModoAnalitica() {
  if (typeof modoJuegoActual === "undefined") return "unknown";
  if (modoJuegoActual === MODO_CARRERA) return "career";
  if (modoJuegoActual === MODO_DESAFIO_DIARIO) return "daily";
  return "quick";
}

function parametrosContextoAnalitica(extra = {}) {
  const parametros = {
    game_version: RTG_ANALYTICS_VERSION,
    mode: obtenerModoAnalitica(),
    run_number: rtgAnalyticsRunNumber
  };

  if (obtenerModoAnalitica() === "daily" && typeof configuracionDesafioEnCurso !== "undefined" && configuracionDesafioEnCurso) {
    parametros.challenge_id = configuracionDesafioEnCurso.desafioId || "";
    parametros.attempt_number = configuracionDesafioEnCurso.numeroIntento || 0;
  }

  if (obtenerModoAnalitica() === "career" && typeof estadoCarrera !== "undefined" && estadoCarrera) {
    parametros.career_level = estadoCarrera.nivel || 1;
    parametros.edition_number = (estadoCarrera.juegosDisputados || 0) + (rtgAnalyticsRunActive ? 1 : 0);
  }

  return { ...parametros, ...extra };
}

function registrarEventoAnalitica(nombre, parametros = {}) {
  if (!rtgAnalyticsEnabled || typeof window.gtag !== "function") return;
  window.gtag("event", nombre, parametrosContextoAnalitica(parametros));
}

function iniciarRunAnalitica(extra = {}) {
  rtgAnalyticsRunNumber += 1;
  rtgAnalyticsRunActive = true;
  rtgAnalyticsStage = "sports";
  registrarEventoAnalitica("game_start", extra);
}

function cambiarEtapaAnalitica(etapa, evento = null, extra = {}) {
  rtgAnalyticsStage = etapa;
  if (evento) registrarEventoAnalitica(evento, extra);
}

function completarRunAnalitica(extra = {}) {
  registrarEventoAnalitica("game_complete", extra);
  rtgAnalyticsRunActive = false;
  rtgAnalyticsStage = "results";
}

function registrarAbandonoAnalitica(motivo = "exit") {
  if (!rtgAnalyticsRunActive) return;
  registrarEventoAnalitica("game_abandon", {
    abandon_stage: rtgAnalyticsStage,
    abandon_reason: motivo,
    transport_type: "beacon"
  });
  rtgAnalyticsRunActive = false;
}

function cargarGoogleAnalytics() {
  if (rtgAnalyticsLoaded) return;
  rtgAnalyticsLoaded = true;
  rtgAnalyticsEnabled = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(RTG_ANALYTICS_ID)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", RTG_ANALYTICS_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  registrarEventoAnalitica("game_open");
}

function borrarCookiesAnalitica() {
  document.cookie.split(";").forEach(cookie => {
    const nombre = cookie.split("=")[0].trim();
    if (nombre === "_ga" || nombre.startsWith("_ga_")) {
      document.cookie = `${nombre}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  });
}

function mostrarPreferenciasAnalitica() {
  document.querySelector("#avisoAnalitica")?.classList.remove("oculto");
}

function ocultarPreferenciasAnalitica() {
  document.querySelector("#avisoAnalitica")?.classList.add("oculto");
}

function aceptarAnalitica() {
  localStorage.setItem(RTG_ANALYTICS_CONSENT_KEY, "granted");

  if (rtgAnalyticsLoaded && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    rtgAnalyticsEnabled = true;
  } else {
    cargarGoogleAnalytics();
  }

  ocultarPreferenciasAnalitica();
}

function rechazarAnalitica() {
  localStorage.setItem(RTG_ANALYTICS_CONSENT_KEY, "denied");
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
  rtgAnalyticsEnabled = false;
  borrarCookiesAnalitica();
  ocultarPreferenciasAnalitica();
}

function inicializarAnaliticaRoadToGold() {
  const consentimiento = localStorage.getItem(RTG_ANALYTICS_CONSENT_KEY);
  if (consentimiento === "granted") cargarGoogleAnalytics();
  else if (consentimiento !== "denied") mostrarPreferenciasAnalitica();

  document.querySelector("#botonAceptarAnalitica")?.addEventListener("click", aceptarAnalitica);
  document.querySelector("#botonRechazarAnalitica")?.addEventListener("click", rechazarAnalitica);
  document.querySelector("#botonPreferenciasAnalitica")?.addEventListener("click", mostrarPreferenciasAnalitica);
}

window.addEventListener("pagehide", () => {
  if (rtgAnalyticsRunActive) registrarAbandonoAnalitica("pagehide");
});

document.addEventListener("DOMContentLoaded", inicializarAnaliticaRoadToGold);

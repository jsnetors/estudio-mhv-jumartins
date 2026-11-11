/**
 * Script Principal - Ju Martins Estética Facial
 * Estúdio Maria Helena Vaz &bull; Minimalista & Rápido
 *
 * Responsabilidades:
 *  1. Resolver a origem da visita (UTM da bio/stories/anúncio) e carimbar essa
 *     origem na mensagem do WhatsApp, para a Ju saber de onde veio o contato.
 *  2. Disparar os eventos de conversão (Meta Pixel, GA4 e dataLayer).
 *  3. Micro-interações de navegação.
 */

const WHATSAPP_NUMBER = "555192513647";
const ORIGIN_STORAGE_KEY = "mhv_origin_v1";

/* Rótulos humanos: traduz o slug da campanha em texto legível na conversa */
const SOURCE_LABELS = {
  instagram: "Instagram",
  ig: "Instagram",
  meta: "Meta Ads",
  facebook: "Facebook",
  google: "Google",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  qr: "QR code",
  linktree: "link na bio",
};

const MEDIUM_LABELS = {
  bio: "bio do perfil",
  story: "stories",
  stories: "stories",
  feed: "feed",
  post: "feed",
  reels: "reels",
  destaque: "destaques",
  highlight: "destaques",
  dm: "direct",
  direct: "direct",
  ads: "anúncio",
  paid: "anúncio",
  cpc: "anúncio",
  organic: "orgânico",
  organico: "orgânico",
};

document.addEventListener("DOMContentLoaded", () => {
  const origin = resolveOrigin();
  applyOriginToLinks(origin);
  initTrackingListeners(origin);
  initHeaderScroll();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   ORIGEM DA VISITA
   -------------------------------------------------------------------------- */

/**
 * Lê a origem da URL (utm_* ou ?ref=) e guarda na sessão para não se perder
 * quando o visitante navega ou recarrega. Sem UTM, mantém o que já existe.
 * @returns {{source: string, medium: string, campaign: string, content: string}}
 */
function resolveOrigin() {
  const params = new URLSearchParams(window.location.search);
  const read = (key) => (params.get(key) || "").trim().replace(/\s+/g, " ").slice(0, 60);

  const origin = {
    source: read("utm_source"),
    medium: read("utm_medium"),
    campaign: read("utm_campaign"),
    content: read("utm_content"),
  };

  if (!origin.source && !origin.medium && !origin.campaign) {
    const ref = read("ref") || read("origem");
    if (ref) origin.source = ref;
  }

  const hasOrigin = Object.values(origin).some(Boolean);

  if (hasOrigin) {
    try {
      sessionStorage.setItem(ORIGIN_STORAGE_KEY, JSON.stringify(origin));
    } catch (error) {
      /* modo privado / storage bloqueado: segue sem persistir */
    }
    return origin;
  }

  try {
    const stored = JSON.parse(sessionStorage.getItem(ORIGIN_STORAGE_KEY) || "null");
    if (stored && typeof stored === "object") return stored;
  } catch (error) {
    /* storage corrompido: ignora */
  }

  return { source: "", medium: "", campaign: "", content: "" };
}

/**
 * Converte a origem em uma frase curta e humana.
 * @param {object} origin
 * @returns {string} ex.: "Instagram (bio do perfil · setembro)"
 */
function describeOrigin(origin) {
  if (!origin || (!origin.source && !origin.campaign && !origin.medium)) return "";

  const source = SOURCE_LABELS[origin.source] || titleCase(origin.source) || "Instagram";
  const medium = MEDIUM_LABELS[origin.medium] || humanizeSlug(origin.medium);
  const campaign = humanizeSlug(origin.campaign);

  const details = [medium, campaign].filter(Boolean);
  return details.length ? `${source} (${details.join(" · ")})` : source;
}

/**
 * Acrescenta a origem na mensagem de todos os links de WhatsApp da página.
 * Feito no carregamento (e não no clique) para não depender de window.open.
 */
function applyOriginToLinks(origin) {
  const label = describeOrigin(origin);

  window.__mhvOrigin = {
    source: origin.source || "",
    medium: origin.medium || "",
    campaign: origin.campaign || "",
    content: origin.content || "",
    label,
  };

  document.body.dataset.origin = label || "organico";

  if (!label) return;

  const suffix = `\n\nVim pelo ${label}.`;

  document.querySelectorAll(`a[href*="wa.me/${WHATSAPP_NUMBER}"]`).forEach((link) => {
    try {
      const url = new URL(link.href);
      const current = url.searchParams.get("text") || "Olá, Ju Martins! Gostaria de agendar um horário no Estúdio MHV.";
      url.searchParams.set("text", current + suffix);
      // URLSearchParams usa "+" para espaço; o WhatsApp espera %20
      link.href = url.toString().replace(/\+/g, "%20");
    } catch (error) {
      /* href inválido: mantém o original */
    }
  });
}

/* --------------------------------------------------------------------------
   TRACKING DE CONVERSÃO (Meta Pixel / GA4 / GTM)
   -------------------------------------------------------------------------- */

/**
 * @param {object} origin origem resolvida no carregamento
 */
function initTrackingListeners(origin) {
  document.body.addEventListener("click", (event) => {
    const trigger = event.target.closest(".js-whatsapp-trigger");
    if (!trigger) return;

    const serviceName = trigger.getAttribute("data-service") || "Avaliação Geral";
    const servicePrice = parseFloat(trigger.getAttribute("data-price") || 0);
    const placement = trigger.getAttribute("data-placement") || "general";
    const label = describeOrigin(origin);

    trackLead({
      service: serviceName,
      value: servicePrice,
      placement,
      origin,
      method: "whatsapp",
    });

    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        content_name: serviceName,
        value: servicePrice,
        currency: "BRL",
        button_placement: placement,
        traffic_source: origin.source || "direto",
        traffic_medium: origin.medium || "none",
        campaign: origin.campaign || "sem-campanha",
        origin_label: label,
      });
    }

    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        event_label: serviceName,
        value: servicePrice,
        currency: "BRL",
        button_placement: placement,
        traffic_source: origin.source || "direto",
        traffic_medium: origin.medium || "none",
        campaign: origin.campaign || "sem-campanha",
      });
    }
  });
}

/**
 * Empurra o evento padronizado no dataLayer (GTM) e mantém um histórico
 * em memória para depuração (window.__mhvLeads).
 * @param {object} lead
 */
function trackLead(lead) {
  window.dataLayer = window.dataLayer || [];

  const payload = {
    event: lead.method === "form" ? "lead_form_submit" : "whatsapp_conversion",
    service_name: lead.service,
    service_price: lead.value,
    button_placement: lead.placement,
    lead_method: lead.method,
    traffic_source: lead.origin.source || "direto",
    traffic_medium: lead.origin.medium || "none",
    campaign: lead.origin.campaign || "sem-campanha",
    origin_label: describeOrigin(lead.origin),
  };

  window.dataLayer.push(payload);

  window.__mhvLeads = window.__mhvLeads || [];
  window.__mhvLeads.push(payload);

  return payload;
}

/* --------------------------------------------------------------------------
   MICRO-INTERAÇÕES
   -------------------------------------------------------------------------- */

/** Sombra sutil no header ao rolar a página */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const checkScroll = () => {
    header.style.boxShadow = window.scrollY > 20 ? "0 4px 20px rgba(0, 0, 0, 0.04)" : "none";
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();
}

/** Rolagem suave para âncoras internas, respeitando o header fixo */
function initSmoothScroll() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 70;

      window.scrollTo({
        top: offset,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  });
}

/* --------------------------------------------------------------------------
   HELPERS
   -------------------------------------------------------------------------- */

function titleCase(value) {
  if (!value) return "";
  return value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function humanizeSlug(value) {
  if (!value) return "";
  return decodeURIComponent(value).replace(/[-_+]+/g, " ").trim().toLowerCase();
}

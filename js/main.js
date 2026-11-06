/**
 * Script Principal - Ju Martins Estética Facial
 * Estúdio Maria Helena Vaz &bull; Minimalista & Rápido
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initSmoothScroll();
  initTrackingListeners();
});

/**
 * Rastreamento de Conversões Meta Pixel & Google Analytics (Anti-Dropoff)
 */
function initTrackingListeners() {
  document.body.addEventListener("click", (e) => {
    const trigger = e.target.closest(".js-whatsapp-trigger");
    if (!trigger) return;

    const serviceName = trigger.getAttribute("data-service") || "Avaliação Geral";
    const servicePrice = parseFloat(trigger.getAttribute("data-price") || 0);
    const placement = trigger.getAttribute("data-placement") || "general";

    // Disparo Meta Pixel (Lead Event)
    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        content_name: serviceName,
        value: servicePrice,
        currency: "BRL",
        button_placement: placement
      });
    }

    // Disparo Google Tag / GA4
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        event_label: serviceName,
        value: servicePrice,
        currency: "BRL"
      });
    }

    // Disparo DataLayer para GTM
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "whatsapp_conversion",
        service_name: serviceName,
        service_price: servicePrice,
        button_placement: placement
      });
    }
  });
}

/**
 * Efeito sutil no header ao rolar a página
 */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.04)";
    } else {
      header.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();
}

/**
 * Rolagem suave para links internos (#)
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

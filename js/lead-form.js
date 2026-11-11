/**
 * Formulário de captura de contato (lead) — Ju Martins | Estúdio MHV
 *
 * Regras:
 *  - Nunca perde contato: se o endpoint falhar ou não estiver configurado,
 *    os dados são levados para o WhatsApp da Ju.
 *  - Consentimento LGPD explícito, com versão do texto registrada.
 *  - Sem dependências; funciona com <dialog> nativo (fallback por atributo).
 */

const LEAD_DIALOG_ID = "lead-dialog";
const LEAD_FORM_ID = "lead-form";
const CONSENT_VERSION = (window.SITE_LEADS && window.SITE_LEADS.consentVersion) || "1.0";
const LEAD_ENDPOINT = (window.SITE_LEADS && window.SITE_LEADS.endpoint) || "";
const WHATSAPP_LEAD_BASE = "https://wa.me/555192513647";

let lastFocusedElement = null;

document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById(LEAD_DIALOG_ID);
  const form = document.getElementById(LEAD_FORM_ID);
  if (!dialog || !form) return;

  initOpeners(dialog);
  initCloseButtons(dialog);
  initPhoneMask(form);
  initSubmit(dialog, form);
});

/* --------------------------------------------------------------------------
   ABERTURA E FECHAMENTO
   -------------------------------------------------------------------------- */

function initOpeners(dialog) {
  document.querySelectorAll("[data-open-lead]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      // O fallback é um link para o WhatsApp; com JS, abrimos o formulário
      event.preventDefault();
      openDialog(dialog);
    });
  });
}

function openDialog(dialog) {
  lastFocusedElement = document.activeElement;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
    dialog.classList.add("is-fallback-open");
  }

  document.body.classList.add("has-lead-open");

  const firstField = dialog.querySelector("input[name='nome']");
  if (firstField) window.setTimeout(() => firstField.focus(), 60);

  // Fecha ao clicar fora do cartão
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
}

function initCloseButtons(dialog) {
  dialog.querySelectorAll("[data-close-lead]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(dialog));
  });
}

function closeDialog(dialog) {
  if (typeof dialog.close === "function" && dialog.open) {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
    dialog.classList.remove("is-fallback-open");
  }

  document.body.classList.remove("has-lead-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

/* --------------------------------------------------------------------------
   MÁSCARA E VALIDAÇÃO
   -------------------------------------------------------------------------- */

function initPhoneMask(form) {
  const input = form.querySelector("input[name='whatsapp']");
  if (!input) return;

  input.addEventListener("input", () => {
    const digits = input.value.replace(/\D/g, "").slice(0, 11);
    input.value = formatPhone(digits);
  });
}

/** (51) 92513-647 | (51) 3251-3647 */
function formatPhone(digits) {
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  if (rest.length <= 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

function digitsOnly(value) {
  return (value || "").replace(/\D/g, "");
}

/**
 * Valida os campos e pinta os erros.
 * @returns {{valid: boolean, data?: object, firstInvalid?: HTMLElement}}
 */
function validateForm(form) {
  const fields = {
    nome: form.querySelector("input[name='nome']"),
    whatsapp: form.querySelector("input[name='whatsapp']"),
    consent: form.querySelector("input[name='consent']"),
  };

  const errors = [];
  let firstInvalid = null;

  const mark = (field, message) => {
    if (!field) return;
    field.setAttribute("aria-invalid", "true");
    field.closest(".lead-field")?.classList.add("has-error");
    errors.push(message);
    if (!firstInvalid) firstInvalid = field;
  };

  Object.values(fields).forEach((field) => {
    if (!field) return;
    field.removeAttribute("aria-invalid");
    field.closest(".lead-field")?.classList.remove("has-error");
  });

  const name = (fields.nome?.value || "").trim();
  if (name.length < 2) mark(fields.nome, "Informe seu nome.");
  else if (name.length > 80) mark(fields.nome, "Nome muito longo.");

  const phoneDigits = digitsOnly(fields.whatsapp?.value);
  if (phoneDigits.length < 10) mark(fields.whatsapp, "Informe o WhatsApp com DDD.");
  else if (phoneDigits.length > 11) mark(fields.whatsapp, "WhatsApp com dígitos a mais.");
  else if (phoneDigits.length === 11 && phoneDigits.charAt(2) !== "9") {
    mark(fields.whatsapp, "Celular deve começar com 9 após o DDD.");
  } else if (/^0+$/.test(phoneDigits)) mark(fields.whatsapp, "Número inválido.");

  if (!fields.consent?.checked) mark(fields.consent, "Precisamos do seu consentimento para entrar em contato.");

  if (errors.length) return { valid: false, firstInvalid, errors };

  return {
    valid: true,
    data: {
      nome: name.replace(/\s+/g, " "),
      whatsapp: fields.whatsapp.value.trim(),
      whatsapp_digits: phoneDigits,
      whatsapp_e164: phoneDigits.length === 11 ? `+55${phoneDigits}` : `+55${phoneDigits}`,
      procedimento: form.querySelector("select[name='procedimento']")?.value || "",
      mensagem: (form.querySelector("textarea[name='mensagem']")?.value || "").trim().slice(0, 280),
      consent: true,
      consent_version: CONSENT_VERSION,
      honeypot: (form.querySelector("input[name='website']")?.value || "").slice(0, 40),
    },
  };
}

/* --------------------------------------------------------------------------
   ENVIO
   -------------------------------------------------------------------------- */

function initSubmit(dialog, form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const result = validateForm(form);
    const errorBox = form.querySelector(".lead-error");

    if (!result.valid) {
      if (errorBox) {
        errorBox.textContent = result.errors[0];
        errorBox.hidden = false;
      }
      result.firstInvalid?.focus();
      return;
    }

    if (errorBox) errorBox.hidden = true;

    const submitButton = form.querySelector("button[type='submit']");
    const originalLabel = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    const payload = buildPayload(result.data);

    try {
      if (!LEAD_ENDPOINT) throw new Error("endpoint-nao-configurado");

      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        // text/plain evita o preflight de CORS, que o Apps Script não responde
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) throw new Error(data.error || "falha-no-envio");

      finishLead(dialog, form, payload, { delivered: true });
    } catch (error) {
      // Rede/planilha fora do ar: leva o contato para o WhatsApp sem perder nada
      finishLead(dialog, form, payload, { delivered: false });
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}

function buildPayload(fields) {
  const origin = window.__mhvOrigin || { source: "", medium: "", campaign: "", label: "" };

  return {
    ...fields,
    origem: {
      source: origin.source,
      medium: origin.medium,
      campaign: origin.campaign,
      content: origin.content,
      label: origin.label,
    },
    pagina: window.location.pathname + window.location.search,
    enviado_em: new Date().toISOString(),
    user_agent: (navigator.userAgent || "").slice(0, 180),
  };
}

/**
 * Mostra a confirmação, dispara o evento de lead e (no fallback) abre o WhatsApp.
 */
function finishLead(dialog, form, payload, { delivered }) {
  const success = dialog.querySelector(".lead-success");
  const title = success?.querySelector(".lead-success-title");
  const text = success?.querySelector(".lead-success-text");
  const whatsappLink = success?.querySelector(".lead-success-whatsapp");
  const firstName = payload.nome.split(" ")[0];

  const waMessage =
    `Olá, Ju! Sou ${payload.nome}. ` +
    (payload.procedimento ? `Tenho interesse em ${payload.procedimento}. ` : "Gostaria de uma orientação sobre qual procedimento é ideal para mim. ") +
    `Meu WhatsApp é ${payload.whatsapp}.` +
    (payload.origem && payload.origem.label ? `\n\nVim pelo ${payload.origem.label}.` : "");

  if (whatsappLink) {
    whatsappLink.href = `${WHATSAPP_LEAD_BASE}?text=${encodeURIComponent(waMessage)}`;
  }

  if (typeof trackLead === "function") {
    trackLead({
      service: payload.procedimento || "Orientação de Procedimento",
      value: 0,
      placement: "lead_form",
      origin: payload.origem || {},
      method: "form",
    });
  }

  if (typeof fbq === "function") {
    fbq("track", "Lead", {
      content_name: payload.procedimento || "Formulário — Orientação",
      value: 0,
      currency: "BRL",
      button_placement: "lead_form",
      lead_method: delivered ? "form" : "form_whatsapp",
      campaign: payload.origem?.campaign || "sem-campanha",
    });
  }

  if (typeof gtag === "function") {
    gtag("event", "generate_lead", {
      event_label: payload.procedimento || "Formulário — Orientação",
      value: 0,
      currency: "BRL",
      button_placement: "lead_form",
      lead_method: delivered ? "form" : "form_whatsapp",
    });
  }

  if (title) title.textContent = `${firstName}, recebido!`;
  if (text) {
    text.textContent = delivered
      ? "Já está com a Ju Martins. Ela vai te chamar no WhatsApp em até 1 dia útil para entender sua pele e indicar o procedimento."
      : "Abrimos o WhatsApp com seus dados preenchidos — só falta você enviar a mensagem para a Ju receber.";
  }

  form.hidden = true;
  if (success) {
    success.hidden = false;
    success.querySelector(".lead-success-close")?.focus();
  }

  if (!delivered) {
    window.open(whatsappLink ? whatsappLink.href : WHATSAPP_LEAD_BASE, "_blank", "noopener");
  }
}

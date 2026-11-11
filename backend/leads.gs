/**
 * Estúdio MHV — Recebimento de leads do formulário
 * ---------------------------------------------------
 * Cole este arquivo no Apps Script vinculado a uma planilha do Google e
 * publique como Web App (ver backend/README.md).
 *
 * O que ele faz:
 *  - valida nome, WhatsApp e consentimento;
 *  - ignora bots (campo honeypot preenchido);
 *  - evita duplicata quando a pessoa clica duas vezes no envio;
 *  - grava uma linha por lead, com a origem da visita (UTM).
 */

// ⚠️ Configuração -----------------------------------------------------------
// Deixe vazio para usar a planilha à qual o script está vinculado.
const SPREADSHEET_ID = "";
const SHEET_NAME = "Leads";
const CONSENT_VERSION_MIN = "1.0";
const DEDUPE_WINDOW_MINUTES = 5;

const HEADERS = [
  "lead_id",
  "recebido_em",
  "nome",
  "whatsapp",
  "whatsapp_e164",
  "procedimento",
  "mensagem",
  "consentimento",
  "versao_consentimento",
  "origem",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "pagina",
  "user_agent",
];

// ---------------------------------------------------------------------------

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || "{}";
    const body = JSON.parse(raw);

    if (body.honeypot) return respond({ ok: true, skipped: "bot" });

    const lead = normalize(body);
    if (!lead) return respond({ ok: false, error: "dados-invalidos" });

    if (!withinRateLimit()) return respond({ ok: false, error: "muitos-envios" });

    const sheet = getSheet();
    const lock = LockService.getScriptLock();

    lock.waitLock(5000);
    try {
      if (isDuplicate(sheet, lead.whatsapp_e164)) {
        return respond({ ok: true, duplicated: true });
      }

      sheet.appendRow([
        lead.lead_id,
        lead.recebido_em,
        lead.nome,
        lead.whatsapp,
        lead.whatsapp_e164,
        lead.procedimento,
        lead.mensagem,
        "sim",
        lead.versao_consentimento,
        lead.origem,
        lead.utm_source,
        lead.utm_medium,
        lead.utm_campaign,
        lead.pagina,
        lead.user_agent,
      ]);

      return respond({ ok: true, lead_id: lead.lead_id });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    return respond({ ok: false, error: "erro-interno: " + error.message });
  }
}

/** Health check simples: abrir a URL no navegador deve responder "ok". */
function doGet() {
  return ContentService.createTextOutput("ok").setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Cria/corrige o cabeçalho e a formatação da aba. Rode uma vez após instalar.
 */
function setup() {
  const sheet = getSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  const header = sheet.getRange(1, 1, 1, HEADERS.length);
  header.setFontWeight("bold").setBackground("#F7EFE3").setFontColor("#1C1817");
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 160);
  sheet.setColumnWidth(4, 140);
  sheet.setColumnWidth(5, 140);
  sheet.setColumnWidth(6, 190);
  sheet.setColumnWidth(7, 260);
  sheet.setColumnWidth(10, 190);

  // Data/hora legível na coluna B
  const rows = Math.max(sheet.getMaxRows() - 1, 1);
  sheet.getRange(2, 2, rows, 1).setNumberFormat("dd/MM/yyyy HH:mm:ss");

  return "setup concluído";
}

/** Insere uma linha fictícia para conferir a planilha. */
function testar() {
  const sheet = getSheet();
  sheet.appendRow([
    "teste-" + new Date().getTime(),
    new Date().toISOString(),
    "Teste DeepSeek",
    "(51) 99999-9999",
    "+5551999999999",
    "Peeling de Diamante",
    "Linha de teste — pode apagar.",
    "sim",
    "1.0",
    "Instagram (bio do perfil)",
    "instagram",
    "bio",
    "perfil",
    "/?utm_source=instagram&utm_medium=bio",
    "teste",
  ]);
  return "linha de teste criada";
}

// ---------------------------------------------------------------------------

function normalize(body) {
  const nome = String(body.nome || "").trim().replace(/\s+/g, " ").slice(0, 80);
  const digits = String(body.whatsapp_digits || body.whatsapp || "").replace(/\D/g, "");

  const consent = body.consent === true || body.consent === "true";
  const version = String(body.consent_version || "").trim();

  if (nome.length < 2) return null;
  if (digits.length < 10 || digits.length > 11) return null;
  if (!consent) return null;
  if (!version || version < CONSENT_VERSION_MIN) return null;

  return {
    lead_id: "lead-" + new Date().getTime() + "-" + Math.random().toString(36).slice(2, 7),
    recebido_em: new Date(),
    nome: nome,
    whatsapp: String(body.whatsapp || "").trim().slice(0, 20),
    whatsapp_e164: "+55" + digits,
    procedimento: String(body.procedimento || "").trim().slice(0, 60),
    mensagem: String(body.mensagem || "").trim().slice(0, 280),
    versao_consentimento: version,
    origem: String((body.origem && body.origem.label) || "").slice(0, 80),
    utm_source: String((body.origem && body.origem.source) || "").slice(0, 40),
    utm_medium: String((body.origem && body.origem.medium) || "").slice(0, 40),
    utm_campaign: String((body.origem && body.origem.campaign) || "").slice(0, 60),
    pagina: String(body.pagina || "").slice(0, 120),
    user_agent: String(body.user_agent || "").slice(0, 180),
  };
}

function getSheet() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) throw new Error("Planilha não encontrada: preencha SPREADSHEET_ID");

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

/** Evita duplicata quando o mesmo número envia duas vezes em poucos minutos. */
function isDuplicate(sheet, phoneE164) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const windowMs = DEDUPE_WINDOW_MINUTES * 60 * 1000;
  const rowsToRead = Math.min(50, lastRow - 1);
  const startRow = lastRow - rowsToRead + 1;
  const values = sheet.getRange(startRow, 1, rowsToRead, 5).getValues();
  const now = new Date().getTime();

  return values.some((row) => {
    const phone = String(row[4] || "");
    const when = row[1] instanceof Date ? row[1].getTime() : new Date(row[1]).getTime();
    return phone === phoneE164 && !isNaN(when) && now - when < windowMs;
  });
}

/** Limite simples: no máximo 20 envios por minuto no script inteiro. */
function withinRateLimit() {
  const cache = CacheService.getScriptCache();
  const key = "leads-per-minute";
  const current = Number(cache.get(key) || 0);
  if (current >= 20) return false;
  cache.put(key, String(current + 1), 60);
  return true;
}

function respond(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

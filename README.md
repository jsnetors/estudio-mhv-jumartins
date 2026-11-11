# Ju Martins | Estética Facial — Estúdio Maria Helena Vaz (MHV)

Landing page mobile-first de alta conversão para campanhas de Instagram Ads. Todo o funil termina em um único destino: **WhatsApp com mensagem pré-preenchida**, sem formulário e sem calendário.

- **Produção:** https://jsnetors.github.io/estudio-mhv-jumartins/
- **Repositório:** https://github.com/jsnetors/estudio-mhv-jumartins
- **Profissional:** Jucelia Martins (Ju Martins) — Esteticista Facial
- **Endereço:** Av. Venâncio Aires, 464 — Cidade Baixa / Farroupilha, Porto Alegre - RS
- **WhatsApp:** +55 51 9251-3647 → `https://wa.me/555192513647`
- **Horário:** terça a sábado, 09:00–18:00, exclusivamente com hora marcada

---

## 💎 Filosofia (CodeStitch)

- **Zero Bloat:** HTML5 semântico + CSS puro + JS leve. Sem frameworks, sem bundler, sem dependências npm.
- **Mobile-First Real:** desenhado para 360–430 px, com `clamp()` escalando tudo até o desktop.
- **Fonte da verdade estática:** o catálogo e os preços vivem no `index.html`. Não há renderização dinâmica — decisão consciente para preservar o FCP e evitar CLS em tráfego pago.

---

## 📁 Estrutura

```
jucelia-martins-hair/
├── index.html                    # Landing page: SEO/JSON-LD, tracking, captura
├── politica-de-privacidade.html  # Política LGPD (linkada no consentimento)
├── README.md                     # Este arquivo
├── HANDOVER_DEEPSEEK.md          # Contexto técnico completo para continuidade
├── css/
│   ├── root.css                  # Design tokens: cores, tipografia, reset
│   └── style.css                 # Estilização modular mobile-first
├── js/
│   ├── main.js                   # Origem (UTM), tracking de conversão e interações
│   └── lead-form.js              # Formulário de contato: validação, envio e fallback
├── backend/
│   ├── leads.gs                  # Web App do Apps Script (grava na planilha)
│   └── README.md                 # Passo a passo de publicação
├── docs/
│   └── kit-instagram.md          # Bio, links por canal e roteiro de stories
└── assets/                       # Imagens do hero, da profissional e dos procedimentos
```

> O antigo `js/config.js` foi removido: era carregado por nenhuma página e mantinha uma segunda cópia (divergente) dos preços. O conteúdo útil dele está preservado no histórico do Git.

---

## ⚙️ Como atualizar o conteúdo

Tudo está em `index.html`, renderizado de forma estática:

1. **Preço de um procedimento:** altere o `data-price`, o texto do `.capsule-price-pill` e o `?text=` do link — os três precisam ficar iguais.
2. **Texto do WhatsApp:** quebre a mensagem em `https://wa.me/555192513647?text=...` com [URL Encoder](https://www.urlencoder.org/) (acentos precisam estar codificados).
3. **Novo procedimento:** duplique um `<a class="treatment-capsule js-whatsapp-trigger">` inteiro e atualize `href`, `data-service`, `data-price`, imagem, título, descrição, preço e `aria-label`.
4. **Título/descrição para o Google:** `<title>`, `meta description`, `og:*`, `twitter:*`, o `canonical` e o JSON-LD no topo do arquivo.

Regra de ouro: todo CTA de WhatsApp precisa manter `class="js-whatsapp-trigger"` e os atributos `data-placement` / `data-service` (e `data-price` quando houver valor). Sem isso o evento de conversão não é disparado e o ROAS das campanhas fica sem atribuição.

---

## 📊 Rastreamento (Meta Pixel + GA4)

Os IDs ficam em **um único lugar**, no topo do `index.html`:

```html
<script>
  window.SITE_TRACKING = {
    metaPixelId: "SEU_PIXEL_ID_AQUI", // ex.: "1234567890123456"
    ga4Id: "G-XXXXXXXXXX"             // ex.: "G-ABC123DEF4"
  };
</script>
```

Enquanto os valores forem placeholder, **nenhum script de terceiros é baixado** e o console avisa `[tracking] IDs pendentes`. Ao inserir IDs válidos, os scripts passam a carregar automaticamente:

- Pixel válido: 10 a 20 dígitos.
- GA4 válido: `G-` + 6 a 14 caracteres alfanuméricos.
- Placeholders são rejeitados explicitamente (nada de request com `G-XXXXXXXXXX`).

Eventos disparados a cada clique em `.js-whatsapp-trigger`:

| Destino | Evento | Parâmetros |
| :--- | :--- | :--- |
| Meta Pixel | `Lead` | `content_name`, `value`, `currency: BRL`, `button_placement` |
| GA4 | `generate_lead` | `event_label`, `value`, `currency: BRL` |
| DataLayer (GTM) | `whatsapp_conversion` | `service_name`, `service_price`, `button_placement` |

Para conferir em produção: `window.__trackingStatus` → `{ meta: true/false, ga4: true/false }`.

**Fallback sem JavaScript:** o `<noscript>` do Pixel está comentado no `index.html` (um `<noscript>` não pode ser condicional). Ao receber o ID definitivo, descomente o bloco e troque o placeholder.

---

## 🎯 Captação: Instagram, origem rastreada e formulário

**Origem.** Todo link publicado leva UTM. O site lê `utm_source`, `utm_medium`, `utm_campaign` e `utm_content`, guarda na sessão e acrescenta a origem na mensagem do WhatsApp:

> Olá, Ju! Gostaria de agendar a Limpeza de Pele Profunda (R$ 190) no Estúdio MHV.
>
> Vim pelo Instagram (stories · limpeza-profunda).

A mesma origem entra nos eventos `Lead` (Pixel), `generate_lead` (GA4) e `whatsapp_conversion` (dataLayer). Os links prontos, por canal, estão em [`docs/kit-instagram.md`](docs/kit-instagram.md).

| Canal | Link (base: `https://jsnetors.github.io/estudio-mhv-jumartins/`) |
| :--- | :--- |
| Bio | `?utm_source=instagram&utm_medium=bio&utm_campaign=perfil` |
| Story | `?utm_source=instagram&utm_medium=story&utm_campaign=<procedimento>` |
| Direct | `?utm_source=instagram&utm_medium=dm&utm_campaign=atendimento` |
| QR / cartão | `?utm_source=qr&utm_medium=cartao&utm_campaign=balcao` |
| Anúncio | `?utm_source=meta&utm_medium=ads&utm_campaign=<campanha>` |

**Formulário.** A seção "Não sabe qual procedimento é o seu?" abre um diálogo com nome, WhatsApp e consentimento LGPD. Configuração em `window.SITE_LEADS` (topo do `index.html`):

```js
window.SITE_LEADS = {
  endpoint: "https://script.google.com/macros/s/…/exec", // já configurado
  consentVersion: "1.0"
};
```

- **Com endpoint:** grava na planilha e confirma na tela.
- **Sem endpoint ou com falha:** abre o WhatsApp com os dados preenchidos. Nunca se perde um contato.
- Ao mudar o texto do consentimento, suba `consentVersion` aqui **e** `CONSENT_VERSION_MIN` em `backend/leads.gs`.

Política de privacidade: [`politica-de-privacidade.html`](politica-de-privacidade.html).

---

## 🚀 Testar localmente

Qualquer servidor estático funciona (não abra via `file://`, os caminhos absolutos quebram):

```bash
npx serve .        # Node (recomendado)
python -m http.server 3000   # se houver Python instalado
```

Depois acesse `http://localhost:3000`.

---

## 🌐 Deploy

1. Commit na branch `main`.
2. Push para `origin`.
3. GitHub Pages publica automaticamente (Settings → Pages → *Deploy from a branch* → `main` / root).

### Domínio personalizado

Quando o domínio próprio for comprado (ex.: `juceliamartins.com.br`):

1. Criar o arquivo `CNAME` na raiz com o domínio.
2. No DNS: `A` para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` e `CNAME www → jsnetors.github.io`.
3. Ativar *Enforce HTTPS*.
4. **Trocar todas as URLs absolutas** do `index.html` (canonical, `og:url`, `og:image`, `twitter:image` e `url`/`@id`/`image` do JSON-LD) para o novo domínio.

---

## ✅ Checklist antes de subir alteração

- [ ] Os 9 CTAs abrem o WhatsApp correto, com mensagem pré-preenchida e acentuação legível.
- [ ] Link com UTM carimba "Vim pelo Instagram (…)" na mensagem (`window.__mhvOrigin`).
- [ ] Formulário envia e a linha chega na planilha (ou cai no WhatsApp, se o endpoint estiver vazio).
- [ ] Preço no botão, no `?text=` e no JSON-LD estão iguais.
- [ ] `index.html` sem overflow horizontal em 320, 360, 390, 768, 1024, 1440 px e em paisagem.
- [ ] Console sem erros de JavaScript.
- [ ] JSON-LD validado no [Rich Results Test](https://search.google.com/test/rich-results).

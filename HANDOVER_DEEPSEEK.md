# 📋 Documento de Handover & Contexto Técnico — Estúdio MHV & Ju Martins Estética Facial
> **Para ser fornecido diretamente ao DeepSeek (ou outro LLM) para continuação contínua do desenvolvimento.**

---

## 🎯 Prompt de Inicialização (Copie e cole no DeepSeek)

```markdown
Você atuará como Engenheiro Frontend Sênior e Especialista em CRO (Otimização de Taxa de Conversão). Você está assumindo a manutenção e evolução da landing page mobile-first de alta conversão da esteticista **Ju Martins (Jucelia Martins)** no **Estúdio Maria Helena Vaz (MHV)** em Porto Alegre - RS.

O projeto já está desenvolvido, versionado no GitHub e publicado no GitHub Pages.
Por favor, leia atentamente todo o documento de handover abaixo para entender a arquitetura, regras de negócio, design system, stack e pendências antes de propor qualquer alteração.
```

---

## 1. 📌 Visão Geral do Projeto & Negócio

* **Cliente / Profissional:** Jucelia Martins (Ju Martins) — Esteticista Facial.
* **Espaço / Clínica:** Estúdio Maria Helena Vaz (MHV).
* **Localização Física:** Av. Venâncio Aires, 464, Bairro Farroupilha / Cidade Baixa, Porto Alegre - RS (próximo ao Parque da Redenção).
* **WhatsApp Oficial:** `+55 51 9251-3647` (Link direto: `https://wa.me/555192513647`).
* **Instagram Profissional:** [@jumartins.hair](https://www.instagram.com/jumartins.hair/)
* **Instagram do Espaço:** [@estudiomariahelenavaz](https://instagram.com/estudiomariahelenavaz)
* **Horário de Funcionamento:** Terça a Sábado das 09:00 às 18:00 (Atendimento exclusivo com hora marcada).
* **Objetivo Primário da Página:** Servir como destino exclusivo de campanhas de tráfego pago no **Instagram Ads** (Stories e Feed). O foco é **100% conversão direta para agendamento via WhatsApp**, eliminando atritos de formulários ou calendários complexos. Cada botão abre o WhatsApp já com uma mensagem personalizada para o serviço específico clicado.

---

## 2. 🌐 Repositório, Links & Deploy

* **Caminho no Sistema Local:** `C:\Users\jsneto\.gemini\antigravity\scratch\jucelia-martins-hair`
* **Repositório Git Remoto:** `https://github.com/jsnetors/estudio-mhv-jumartins.git` (Branch padrão: `main`)
* **Deploy em Produção (GitHub Pages):** [https://jsnetors.github.io/estudio-mhv-jumartins/](https://jsnetors.github.io/estudio-mhv-jumartins/)
* **Status Git Atual:** working tree limpa e sincronizada com `origin/main`. **Deploy em produção: commit `629c12f`** (auditoria técnica de 11/11/2026), publicado e verificado byte a byte em 11/11/2026.

---

## 3. 🛠️ Stack Tecnológica & Filosofia de Desenvolvimento

* **Stack:** **HTML5 Semântico**, **CSS3 Moderno** (com Custom Properties / CSS Variables) e **JavaScript Puro (ES6+)**.
* **Sem Frameworks / Zero Bloat:** O projeto propositalmente **não utiliza React, Vue, Tailwind ou builders pesados (Webpack/Vite)**. O carregamento precisa ser instantâneo (< 1 segundo em 4G móvel) para evitar taxa de rejeição (*drop-off*) dos usuários que chegam através dos anúncios do Instagram.
* **Filosofia CodeStitch:**
  * **Mobile-First Real:** O layout foi projetado prioritariamente para telas de smartphones (360px a 430px de largura).
  * **Tipografia Fluida:** Uso intensivo de funções CSS `clamp()` para fontes, paddings e gaps, garantindo escalonamento natural sem quebras de layout entre telas pequenas e monitores desktop.
  * **Acessibilidade & Contraste:** Cores douradas escuras (`--gold-dark`) para textos em conformidade com WCAG AA sobre fundo creme claro (`#FAF7F2`).

---

## 4. 📂 Estrutura de Arquivos

```
jucelia-martins-hair/
├── index.html               # Estrutura semântica completa da landing page
├── README.md                # Documentação rápida de uso e deploy
├── HANDOVER_DEEPSEEK.md     # Este documento de transição de contexto
├── css/
│   ├── root.css             # Design Tokens: Variáveis de cor, tipografia e reset CSS
│   └── style.css            # Estilização modular mobile-first de todas as seções
├── js/
│   └── main.js              # Interações leves e motor de rastreamento de conversão (Meta Pixel/GA4)
└── assets/
    ├── banner-mhv.jpg       # Banner original de referência estética
    ├── hero-facial.jpg      # Imagem principal da seção Hero (alta prioridade)
    ├── ju-martins.jpg       # Foto oficial da profissional (centralizada e tratada)
    ├── proc-1-essencial.jpg # Foto procedimento: Limpeza Essencial
    ├── proc-2-profunda.jpg  # Foto procedimento: Limpeza Profunda
    ├── proc-3-ozonio.jpg    # Foto procedimento: Limpeza com Ozônio
    └── proc-4-peeling.jpg   # Foto procedimento: Peeling de Diamante
```

---

## 5. 🎨 Design System & Identidade Visual

### Paleta de Cores (`css/root.css`)
| Variável | Valor Hex | Finalidade |
| :--- | :--- | :--- |
| `--gold-primary` | `#C59B63` | Ouro Acetinado (botões principais, monograma, destaque) |
| `--gold-dark` | `#9E743A` | Ouro Escuro de alto contraste para leitura e títulos |
| `--gold-light` | `#F7EFE3` | Champanhe suave para backgrounds de badges e pills |
| `--gold-border` | `rgba(197, 155, 99, 0.42)` | Bordas delicadas com toque dourado |
| `--bg-main` | `#FAF7F2` | Fundo principal da página (Creme acolhedor e elegante) |
| `--bg-card` | `#FFFFFF` | Branco puro para cartões e áreas de foco |
| `--bg-capsule` | `#FFFDFB` | Tom especial para as cápsulas de procedimentos |
| `--text-dark` | `#1C1817` | Carvão nobre profundo para tipografia principal |
| `--text-muted` | `#6B625D` | Taupe suave para descrições secundárias |

### Tipografia
* **Serifada (Títulos e Destaques):** `'Cormorant Garamond', Georgia, serif` — Transmite elegância, cuidado e autoridade estética.
* **Sem Serifa (Corpo e Botões):** `'Plus Jakarta Sans', system-ui, sans-serif` — Alta legibilidade em telas pequenas.

---

## 6. 🧴 Catálogo de Procedimentos & Preços Vigentes

| Procedimento | Valor | Badge / Categoria | Descrição Resumida |
| :--- | :--- | :--- | :--- |
| **Limpeza de Pele Essencial** | R$ 150 | Cuidado Mensal | Higienização, esfoliação suave, máscara facial e hidratação. |
| **Limpeza de Pele Profunda** | R$ 190 | Campeã de Escolha ⭐ | Higienização, emoliência, extração detalhada de cravos/impurezas sem dor, máscara calmante. |
| **Limpeza Premium com Ozônio** | R$ 250 | Alta Performance 💨 | Protocolo completo com Vapor de Ozônio (bactericida/oxigenante celular) e hidratação restauradora. |
| **Peeling de Diamante** | R$ 230 | Pele de Porcelana ✨ | Microdermoabrasão, renovação celular profunda, viço e uniformidade da textura. |

> **Nota técnica:** Todos os **9 CTAs** da página abrem o WhatsApp com texto codificado na URL — os 4 cards de procedimento levam nome e valor, e os 5 CTAs institucionais (header, hero, spotlight, localização e botão flutuante) levam a mensagem correspondente ao contexto. Isso permite que a Ju Martins saiba exatamente qual anúncio ou card motivou o contato.

---

## 7. 📊 Arquitetura de Rastreamento (Tracking & Analytics)

O site possui escutas centralizadas de cliques em `js/main.js` através da classe seletora `.js-whatsapp-trigger`:

```javascript
// Atributos lidos em cada clique de conversão:
data-placement="hero_primary" | "capsule" | "pro_spotlight" | "header" | "floating_button"
data-service="Nome do Procedimento"
data-price="190"
```

### Eventos Disparados:
1. **Meta Pixel (Facebook/Instagram Ads):**
   ```javascript
   fbq("track", "Lead", {
     content_name: serviceName,
     value: servicePrice,
     currency: "BRL",
     button_placement: placement
   });
   ```
2. **Google Analytics 4 / Google Tag:**
   ```javascript
   gtag("event", "generate_lead", {
     event_label: serviceName,
     value: servicePrice,
     currency: "BRL"
   });
   ```
3. **DataLayer (Google Tag Manager):**
   Evento `whatsapp_conversion` pushado no array global `window.dataLayer`.

> **Atenção:** os IDs ficam em **um único ponto** do `index.html`, no objeto `window.SITE_TRACKING` (`metaPixelId` e `ga4Id`). Enquanto forem placeholder, nenhum script de terceiros é baixado — há guardas de formato (`PIXEL_RE` / `GA4_RE`) e bloqueio explícito de placeholder (`PLACEHOLDER_RE`). O antigo `js/config.js` foi removido (não era carregado por nenhuma página e duplicava os preços).

---

## 8. 🔍 Histórico de Decisões do Projeto (O que já foi feito)

1. **Abordagem Minimalista:** Iniciou-se com uma estrutura mais extensa com blocos adicionais, mas após alinhamento com o usuário, a página foi reestruturada para ser **extremamente direta, limpa e editorial**, inspirada no layout visual do banner físico do salão.
2. **Substituição de Imagens:** Imagens genéricas com textos embutidos foram removidas. Foram incluídas fotos profissionais limpas para cada procedimento e foto em alta definição para a seção Hero.
3. **Recorte e Destaque da Ju Martins:** A foto real da Ju Martins foi reenquadrada para eliminar o espaço vazio à direita da parede cinza original. A foto foi centralizada no rosto, ampliada para uma moldura nobre com anel dourado e ganhou link direto para o Instagram oficial `@jumartins.hair`.
4. **Número de WhatsApp Atualizado:** O número de agendamento foi configurado para o contato definitivo: `+55 51 9251-3647`.

---

## 9. 🚀 Backlog & Próximas Demandas Sugeridas para o DeepSeek

Se o usuário solicitar novas tarefas, aqui estão as áreas prioritárias mapeadas:

1. **Configuração Final dos Pixels de Tráfego:**
   * Inserir o ID definitivo do Meta Pixel e do GA4 em `window.SITE_TRACKING` (topo do `index.html`).
   * Descomentar o `<noscript>` do Pixel (já preparado no arquivo) após receber o ID.
   * Validar disparos de eventos de teste na ferramenta *Meta Pixel Helper*.
2. **Domínio Personalizado:**
   * Configuração de DNS caso o cliente adquira um domínio próprio (ex: `juceliamartins.com.br` ou `estudiomhv.com.br`) apontando para o GitHub Pages ou Netlify/Vercel.
   * **Pendência obrigatória junto:** trocar todas as URLs absolutas do `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`, `url`/`@id`/`image` do JSON-LD) — hoje apontam para `jsnetors.github.io`.
3. **Integração Dinâmica vs Estática:**
   * **Decisão tomada:** manter 100% estático. O `js/config.js` foi removido para eliminar a duplicação de preços e o peso morto. O catálogo é editado diretamente no `index.html`.
4. **Adição de Prova Social (Opcional):**
   * Havia 3 depoimentos preparados no antigo `js/config.js` (recuperáveis no histórico do Git). Caso o usuário decida exibi-los, criar um bloco ultra-minimalista que não comprometa a leveza da página.
5. **SEO Local / Schema.org:**
   * ✅ **Concluído:** JSON-LD `BeautySalon` com endereço, horários, telefone, fundadora, catálogo de ofertas e `ReserveAction` para o WhatsApp.
6. **Acessibilidade / Contraste (pendente de decisão do cliente):**
   * O CTA dourado do header (`--gold-primary` + texto branco) tem contraste ≈ 2,56:1 e o CTA verde do hero ≈ 3,11:1 — ambos abaixo de WCAG AA (4,5:1) para texto pequeno. Corrigir exige escurecer a paleta ou mudar a cor do texto; não foi alterado para não descaracterizar a identidade visual aprovada.

---

## 10. 🧾 Atualização Técnica — Auditoria e Correções (11/11/2026)

Auditoria completa do código publicado revelou 5 divergências entre este documento e a produção. Todas foram corrigidas:

1. **CTAs incompletos:** 4 dos 9 botões (header, hero, localização e flutuante) abriam o WhatsApp **sem** mensagem pré-preenchida, contrariando a premissa do projeto. Agora **9/9** chegam com texto contextualizado e codificado.
2. **`js/config.js` era código morto:** não era referenciado por nenhuma página; os preços existiam em duas fontes divergentes. Arquivo **removido** (histórico do Git preserva os depoimentos).
3. **Pixels com placeholder em produção:** o `gtag.js` era baixado com `G-XXXXXXXXXX` (requisição inútil e dado lixo) e o `fbevents.js` era baixado mesmo sem `init`. Agora há um **painel único** (`window.SITE_TRACKING`), guardas de formato e bloqueio de placeholder — enquanto não houver IDs válidos, **zero** requisições de terceiros.
4. **Open Graph inválido:** `og:image` era relativo e faltavam `og:url`, `og:site_name`, dimensões, `twitter:card` e `canonical`. Todos adicionados com URLs absolutas.
5. **SEO local ausente:** JSON-LD `BeautySalon` implementado (endereço, CEP, horários Ter–Sáb 09–18, telefone, fundadora, 4 ofertas com preço e `ReserveAction`).

Ajustes adicionais: dimensões declaradas do hero corrigidas para 580×500 (elimina CLS), `README.md` reescrito (antes falava de "Hair Stylist" e de um `config.js` que não existia mais) e fallback `<noscript>` do Pixel preparado/desativado.

**Validação executada:** JSON-LD parseado, 9 CTAs e mensagens decodificadas conferidas, 6 assets referenciados presentes, scripts inline com sintaxe válida, comportamento do tracking testado em 3 cenários (placeholder / IDs válidos / IDs malformados) e renderização headless em 390 px sem overflow horizontal (`scrollWidth == 390`).

**Ainda pendente:** IDs definitivos de Pixel/GA4, `<noscript>` do Pixel, domínio próprio (+ troca das URLs absolutas) e decisão sobre contraste dos botões.

---

## 11. 📱 Responsividade — Auditoria e Correções (11/11/2026)

O layout já não quebrava horizontalmente em nenhuma largura, mas a auditoria por dispositivo (medição real via Chrome DevTools Protocol) encontrou problemas de composição e de toque:

| Sintoma encontrado | Onde | Correção |
| :--- | :--- | :--- |
| Wordmark em **4 linhas** vazando da altura fixa do header | 320px | Header com `min-height` + `padding-block`, tipografia fluida e `text-wrap: balance` |
| Wordmark em 3 linhas e colado no CTA (gap 0px) | 360–540px | Clamp no monograma/título e `gap` fluido; 1 linha a partir de 360px |
| CTA do header com 35px de altura | 320–480px | `min-height: 2.5rem` (40px) |
| Links do rodapé e badge do Instagram com 21–36px | mobile | `min-height: 2.5rem` |
| Título órfão ("pele" sozinho na 3ª linha) | 1024–1199px | Escala do `h1` travada em 43–48px nessa faixa |
| Salto de 2 → 3 linhas no título | 1600px+ | Cap em 3.5rem a partir de 1440px |
| Página limitada a 864px com margens enormes | 1200px+ | Container 60rem (1024) e 68rem (1440); cards 52/58rem |
| CTA primário abaixo da dobra | celular deitado (844×390) | Modo compacto em `max-height: 34rem` |

### Faixas cobertas (`css/style.css`, seção 8)

| Faixa | Comportamento |
| :--- | :--- |
| ≤ 380px | Rótulo do CTA vira "Agendar"; wordmark em 2 linhas equilibradas |
| ≤ 767px | Cápsulas viram cards; spotlight empilhado; alvos de toque de 40px |
| 768–1023px | Hero em 2 colunas; cápsulas horizontais |
| 1024–1199px | Container 60rem; `h1` 43–48px |
| 1200–1439px | Container 60rem, cards 52rem, spotlight 54rem |
| ≥ 1440px | Container 68rem, cards 58rem, spotlight 60rem, hero 26rem |
| Altura ≤ 544px | Header 56px, hero compacto, CTA acima da dobra |
| `prefers-reduced-motion` | Desliga scroll suave e transições |

**Validação executada:** 23 larguras (320→1920) + 7 cenários de paisagem, todos com `scrollWidth == innerWidth`, zero elementos fora da viewport, zero texto cortado e CTA primário acima da dobra em paisagem. Screenshots conferidos em 320, 390, 768, 900, 1024, 1440 e 1600.

**Nova pendência:** o `README.md` cita o checkpoint de 360/390px; ao evoluir o layout, repetir a varredura completa (320, 360, 390, 768, 1024, 1440, 1920) e a paisagem.

---

## 💡 Instruções de Trabalho para o DeepSeek

* Mantenha sempre a abordagem **Zero Bloat** (evite sugerir bibliotecas npm pesadas a menos que estritamente solicitado).
* Qualquer alteração no CSS deve respeitar as variáveis em `css/root.css` e o padrão mobile-first com `clamp()`.
* Mantenha todos os links de WhatsApp apontando para o número oficial `555192513647` com a classe `.js-whatsapp-trigger` para não quebrar a métrica de ROAS dos anúncios do Instagram.


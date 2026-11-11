# Backend de captura de leads (Google Apps Script + Planilha)

O formulário da landing page envia os contatos para uma planilha do Google, sem
servidor próprio e sem custo. Se o envio falhar, o site cai automaticamente para
o WhatsApp — nenhum contato é perdido.

```
[Formulário na LP] --POST JSON--> [Web App do Apps Script] --> [Planilha "Leads"]
                                        |
                                        +--> resposta { ok: true }
```

---

## Passo a passo (10 minutos)

### 1. Criar a planilha
1. Acesse [sheets.new](https://sheets.new).
2. Renomeie para **Leads MHV** (o nome da aba será criada pelo script).

### 2. Colar o script
1. Na planilha: **Extensões → Apps Script**.
2. Apague o conteúdo de `Code.gs` e cole todo o arquivo [`leads.gs`](./leads.gs).
3. Salve (Ctrl+S) e renomeie o projeto para `Leads MHV`.

> Se preferir usar uma planilha separada do script, preencha `SPREADSHEET_ID` no
> topo do arquivo com o ID da planilha (o trecho entre `/d/` e `/edit` na URL).
> Deixando vazio, o script usa a planilha à qual está vinculado.

### 3. Rodar a configuração
1. No editor, selecione a função **`setup`** e clique em **Executar**.
2. Autorize o acesso à sua conta Google (aparece só na primeira vez).
3. Volte na planilha: a aba **Leads** deve existir, com cabeçalho formatado.

### 4. Publicar como Web App
1. **Implantar → Nova implantação**.
2. Tipo: **App da Web**.
3. Descrição: `Leads LP v1`.
4. **Executar como:** *Eu*.
5. **Quem tem acesso:** *Qualquer pessoa*.
6. **Implantar** e copie a URL (`https://script.google.com/macros/s/.../exec`).

> "Qualquer pessoa" é necessário porque o visitante do site não está logado no
> Google. A URL é pública, mas: o script valida os campos, ignora bots pelo
> honeypot e limita a 20 envios por minuto. Não divulgue essa URL.

### 5. Conectar ao site
No `index.html`, procure o bloco `window.SITE_LEADS` e cole a URL:

```html
<script>
  window.SITE_LEADS = {
    endpoint: "https://script.google.com/macros/s/SEU_ID_AQUI/exec",
    consentVersion: "1.0"
  };
</script>
```

### 6. Testar
1. Abra a URL do Web App no navegador: deve responder `ok`.
2. No Apps Script, rode a função `testar()` → uma linha de teste aparece na planilha (pode apagar).
3. Publique o site e envie o formulário de verdade: a linha deve chegar em segundos.
4. Confira também o evento no console do navegador: `window.__mhvLeads`.

---

## Manutenção

| Situação | O que fazer |
| :--- | :--- |
| Alterou o texto do consentimento | Suba `consentVersion` no `index.html` **e** `CONSENT_VERSION_MIN` no `leads.gs` |
| Alterou o script | **Implantar → Gerenciar implantações → editar → Nova versão** (sem isso o site continua na versão antiga) |
| Recebeu pedido de exclusão (LGPD) | Apague a(s) linha(s) do número na planilha e confirme ao titular pelo WhatsApp |
| Planilha crescendo demais | Arquive em outra aba/planilha a cada 6 meses; o script lê no máximo 50 linhas recentes |

## Segurança e LGPD

- A planilha contém dados pessoais: mantenha o acesso restrito (só a Ju e quem ela autorizar).
- Nunca compartilhe a URL do Web App fora do site.
- Não ative "Qualquer pessoa com conta Google" — o site precisa de acesso anônimo.
- Faça backup: **Arquivo → Fazer uma cópia** periodicamente.
- O site registra a versão do consentimento aceito e a data/hora; guarde esse histórico.

## Problemas comuns

| Sintoma | Causa provável | Solução |
| :--- | :--- | :--- |
| `ok: false, error: dados-invalidos` | Nome/telefone/consentimento inválidos | Verificar o payload em `window.__mhvLeads` |
| Envio cai no WhatsApp em vez da planilha | `endpoint` vazio ou URL errada | Conferir o bloco `window.SITE_LEADS` |
| Funciona no PC e não no celular | Implantação antiga em cache | Republicar nova versão e limpar cache do navegador |
| Planilha não recebe nada | Script sem autorização | Rodar `setup()` novamente e autorizar |

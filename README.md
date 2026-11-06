# Jucelia Martins | Hair Stylist & Terapia Capilar

Página web de alta conversão desenvolvida especificamente para impulsionamento em anúncios no Instagram, com foco no agendamento direto e guiado via WhatsApp.

---

## 💎 Filosofia e Inspiração (CodeStitch)

Inspirado nos princípios do **CodeStitch**:
- **Mobile-First Real:** Projetado para a experiência em telas de smartphones (o ambiente onde o tráfego do Instagram acontece).
- **Zero Bloat / Carregamento Instantâneo:** Criado em HTML5 semântico, CSS puro com variáveis customizadas e JavaScript leve, sem frameworks pesados que causam atraso de carregamento e perda de cliques pagos.
- **Tipografia Fluida:** Utilização de `clamp()` para que fontes e espaçamentos se ajustem organicamente a qualquer tamanho de tela.
- **Identidade Visual Sofisticada:** Paleta *Rose Gold*, Nude, Off-White e detalhes em Warm Espresso, transmitindo exclusividade, cuidado e sofisticação.

---

## 📁 Estrutura do Projeto

```
jucelia-martins-hair/
├── index.html            # Estrutura principal da landing page
├── README.md             # Instruções de uso e deploy
├── css/
│   ├── root.css          # Variáveis de cor, tipografia e classes base (CodeStitch)
│   └── style.css         # Estilização mobile-first de todas as seções
├── js/
│   ├── config.js         # ARQUIVO CENTRAL DE CONFIGURAÇÃO (WhatsApp, Endereço, Preços)
│   └── main.js           # Gerador dinâmico de links de WhatsApp e interações
└── assets/               # Imagens e ícones
```

---

## ⚙️ Como Atualizar os Dados em 2 Minutos

Basta abrir o arquivo **`js/config.js`** e alterar as propriedades:

1. **WhatsApp da Jucelia:**
   ```javascript
   phone: "5511999999999", // 55 + DDD + 9 dígitos
   phoneDisplay: "(11) 99999-9999",
   ```

2. **Endereço do Espaço:**
   ```javascript
   address: {
     street: "Rua do Salão, 123",
     complement: "Sala 2",
     neighborhood: "Seu Bairro",
     cityState: "Sua Cidade - UF",
     cep: "00000-000",
     mapsUrl: "https://maps.google.com/?q=..."
   }
   ```

3. **Instagram:**
   ```javascript
   instagramUser: "juceliamartins.hair",
   instagramUrl: "https://instagram.com/juceliamartins.hair",
   ```

4. **Serviços e Preços:**
   Altere ou adicione serviços no array `services`, ajustando nomes, descrições e os valores sugeridos (`"A partir de R$..."` ou `"Sob Avaliação"`).

---

## 🚀 Como Testar Localmente

Você pode abrir o arquivo `index.html` diretamente no seu navegador, ou rodar um servidor local leve:

### Com Python (já nativo na maioria dos sistemas):
```bash
cd C:\Users\jsneto\.gemini\antigravity\scratch\jucelia-martins-hair
python -m http.server 3000
```
Acesse: `http://localhost:3000`

---

## 🌐 Como Publicar na Internet Gratuitamente

Você pode colocar este site no ar em menos de 3 minutos com SSL (https) gratuito:
- **Netlify:** Arraste a pasta `jucelia-martins-hair` para o [Netlify Drop](https://app.netlify.com/drop).
- **Vercel:** Conecte o repositório ou use o comando `vercel`.
- **GitHub Pages:** Suba para um repositório e ative o GitHub Pages nas configurações.

---

## 📈 Integração com Meta Pixel (Anúncios do Instagram)

Para rastrear quantas pessoas clicam nos botões de agendamento do WhatsApp:
1. Copie seu código do **Meta Pixel** no Gerenciador de Anúncios.
2. Cole logo antes do fechamento `</head>` em `index.html`.
3. Os botões já estão preparados para registrar eventos de conversão do tipo `Lead`.


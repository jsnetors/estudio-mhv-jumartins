# Kit de captação — Instagram @jumartins.hair

Tudo pronto para copiar e colar. **Regra de ouro:** todo link publicado leva
`utm_source`, `utm_medium` e `utm_campaign`. É isso que faz a mensagem chegar no
WhatsApp da Ju já dizendo de onde veio o contato.

---

## 1. Link da bio (o único link do perfil)

```
https://jsnetors.github.io/estudio-mhv-jumartins/?utm_source=instagram&utm_medium=bio&utm_campaign=perfil
```

**Bio sugerida** (limite de 150 caracteres do Instagram):

```
Estética facial • Estúdio MHV
Limpeza de pele e peeling de diamante
Porto Alegre — Cidade Baixa
Agende seu horário 👇
```

Alternativa mais curta:

```
Ju Martins • Estética Facial
Cuidado real para a sua pele
Porto Alegre - RS
Agendar 👇
```

Não use encurtador (bit.ly e similares): alguns descartam os parâmetros e a
origem se perde.

---

## 2. Links por procedimento (Stories, Feed, Reels e Destaques)

Troque apenas `utm_medium` e `utm_campaign` conforme onde o link será colocado.

| Onde | Link |
| :--- | :--- |
| Story — Limpeza Essencial | `…?utm_source=instagram&utm_medium=story&utm_campaign=limpeza-essencial` |
| Story — Limpeza Profunda | `…?utm_source=instagram&utm_medium=story&utm_campaign=limpeza-profunda` |
| Story — Ozônio | `…?utm_source=instagram&utm_medium=story&utm_campaign=limpeza-ozonio` |
| Story — Peeling | `…?utm_source=instagram&utm_medium=story&utm_campaign=peeling-diamante` |
| Reels | `…?utm_source=instagram&utm_medium=reels&utm_campaign=peeling-diamante` |
| Destaque "Agendar" | `…?utm_source=instagram&utm_medium=destaque&utm_campaign=agendar` |
| Direct (link enviado no chat) | `…?utm_source=instagram&utm_medium=dm&utm_campaign=atendimento` |
| Cartão / QR impresso | `…?utm_source=qr&utm_medium=cartao&utm_campaign=balcao` |
| Anúncio (Meta Ads) | `…?utm_source=meta&utm_medium=ads&utm_campaign=peeling-setembro` |

Base: `https://jsnetors.github.io/estudio-mhv-jumartins/`

**Dica para anúncios:** no Gerenciador de Anúncios, além da UTM fixa, use os
parâmetros dinâmicos do Meta na URL de destino:
`&utm_content={{ad.name}}&utm_term={{adset.name}}`. O site carimba o que
receber, mesmo que o nome da campanha mude.

---

## 3. O que a Ju vai ver no WhatsApp

Sem UTM (link antigo, sem parâmetros):

> Olá, Ju! Gostaria de agendar a Limpeza de Pele Profunda (R$ 190) no Estúdio MHV.

Com UTM de story:

> Olá, Ju! Gostaria de agendar a Limpeza de Pele Profunda (R$ 190) no Estúdio MHV.
>
> Vim pelo Instagram (stories · limpeza-profunda).

É essa segunda linha que permite saber, sem painel nenhum, **qual story pagou
o próprio custo**.

---

## 4. Roteiro de story que converte (30 segundos)

1. **0–3s — dor:** "Cravos e poros dilatados não saem com sabonete."
2. **3–15s — prova:** vídeo curto da extração (sem sangue, sem exagero).
3. **15–25s — oferta:** "Limpeza Profunda, R$ 190, com extração completa e máscara calmante."
4. **25–30s — ação:** sticker de link com o link do procedimento + "toque aqui para ver os horários".

CTA falado e escrito iguais. Uma ideia por story.

---

## 5. Destaques sugeridos (nesta ordem)

1. **Agendar** — link da bio/story + como funciona o atendimento
2. **Antes e depois** — resultados reais, com autorização da cliente
3. **Procedimentos** — um card por procedimento, com preço
4. **O estúdio** — endereço, fachada, sala (reduz medo de "lugar estranho")
5. **A Ju** — quem atende, formação, cuidado

---

## 6. Comentário → Direct (manual, sem ferramenta)

Se ainda não usa ManyChat, o roteiro manual funciona:

- **Post/Reels:** "Comente **QUERO** que eu te mando os horários."
- **Resposta padrão no Direct** (salve em "Respostas rápidas"):

```
Oi, {nome}! Que bom te ver por aqui 💛
Te mando o link com os procedimentos e valores:
https://jsnetors.github.io/estudio-mhv-jumartins/?utm_source=instagram&utm_medium=dm&utm_campaign=comentario-quero

Se preferir, me chama direto: wa.me/555192513647
```

Trocar o `utm_campaign` a cada campanha (ex.: `comentario-quero-setembro`) mostra
qual conteúdo gerou mais conversa.

---

## 7. Checklist antes de publicar

- [ ] Link da bio com `utm_source=instagram&utm_medium=bio`
- [ ] Cada story com a campanha do procedimento (não repetir o link da bio)
- [ ] Sticker de link com texto de ação ("Ver horários", não "clique aqui")
- [ ] Testar o link no próprio celular: a mensagem deve chegar com a linha "Vim pelo…"
- [ ] Conferir no WhatsApp da Ju se a origem aparece
- [ ] Destaque "Agendar" fixado na primeira posição

---

## 8. Como conferir se está funcionando

No navegador do computador, abra o link com UTM e rode no console:

```js
window.__mhvOrigin   // { source, medium, campaign, label }
document.body.dataset.origin  // "Instagram (bio do perfil)"
window.__mhvLeads    // histórico dos cliques da sessão
```

Se `label` estiver vazio, o link publicado perdeu os parâmetros — geralmente por
encurtador ou por ter sido colado sem o trecho `?utm_...`.

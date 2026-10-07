# Guia com IA para a landing do ResoluxToolkit

## O que o visitante vê
- Um botão flutuante "Pergunte ao guia" no canto da página, que abre um painel de chat com vidro escuro e laranja.
- O visitante pergunta (PT ou EN, conforme o idioma escolhido). O guia responde de forma curta e mostra botões "Ir para esta seção". Ao clicar, a página rola até o trecho certo e ele pisca de leve.
- Uma conversa só, salva neste navegador. Um botão "Nova conversa" limpa o histórico.
- Sugestões iniciais: "O que é o ResoluxToolkit?", "Funciona sem internet?", "Quais tecnologias usa?", "Como entro na lista?".
- O guia só responde com base no conteúdo escrito por você. Se não souber, diz que não sabe e sugere a lista de espera. Nunca promete recursos do roadmap como prontos.

## Índice de seções (âncoras)
Seções novas ou já existentes recebem identificadores estáveis:
- `#top` hero, `#ecosystem` tecnologias, `#features` recursos (e um por recurso: `#feature-assistant`, `#feature-monitor`, `#feature-local`, `#feature-safe`)
- `#workflow` como funciona (`#step-connect`, `#step-context`, `#step-operate`)
- `#status` estado do projeto (`#status-ready`, `#status-roadmap`)
- `#join` lista de espera
- Uma seção nova de Perguntas Frequentes `#faq`, alimentada pelo mesmo arquivo, com uma âncora por pergunta.

## Base de conhecimento em markdown
Um arquivo `content/guide/knowledge.md` que você edita. Cada bloco tem título, âncora de destino e texto, em PT e EN:

```text
## [features] Local por princípio
anchor: feature-local
lang: pt
Texto livre que o guia usa para responder...
```

O inventário de tecnologias já existente (`docs/technology-inventory.md`) também entra como fonte. Só âncoras que existem de verdade na página são aceitas; links inválidos são descartados.

## Detalhes técnicos
- Servidor: rota de streaming em `src/routes/api/chat.ts` usando AI SDK + Lovable AI Gateway (Responses API, `openai/gpt-6-astra`, reasoning low, `store: false`). O markdown é importado como texto bruto (`?raw`) e enviado como instrução de sistema; sem banco de dados.
- Ferramenta `navigate_to_section({ anchor, label })`: o modelo chama para sugerir destinos; o enum de âncoras é validado no código (não no schema). A UI renderiza o resultado como botão que faz `scrollIntoView` + destaque.
- Limite de abuso: rate limit por IP hash reaproveitando o padrão da waitlist (nova tabela privada sem políticas públicas) e tamanho máximo de mensagem/histórico.
- Cliente: `useChat` com AI Elements (Conversation, Message, MessageResponse, PromptInput, Tool recolhido), histórico em localStorage numa chave única, foco no campo de texto, identidade própria (orb laranja, sem ícone Sparkles genérico).
- Erros 402/429 mostrados com mensagem clara no painel.
- AGENTS.md: regra "conhecimento do guia vem só do markdown; âncoras validadas contra o índice".

## Fora deste passo
- Painel de administração para editar o conhecimento (fica no arquivo).
- Login para salvar conversas.

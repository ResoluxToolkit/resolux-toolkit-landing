<!--
Base de conhecimento do guia com IA do ResoluxToolkit.
Edite à vontade. Cada bloco começa com "## [secao] Título", seguido de
"anchor:" (destino na página) e "lang:" (pt ou en). O texto vem depois.
Âncoras válidas: top, ecosystem, features, feature-assistant, feature-monitor,
feature-local, feature-safe, workflow, step-connect, step-context, step-operate,
status, status-ready, status-roadmap, faq, join e as âncoras faq-* abaixo.
Blocos com [faq] também aparecem na seção "Perguntas frequentes" da página.
-->

## [geral] O que é o ResoluxToolkit
anchor: top
lang: pt
O ResoluxToolkit é uma camada inteligente para operadores do Resolume Arena. O motor é escrito em Swift e roda localmente no macOS; a interface é web, executada no navegador. Ele monitora o set, entende o contexto e ajuda o operador a agir sem tirar o controle das mãos dele.

## [geral] What is ResoluxToolkit
anchor: top
lang: en
ResoluxToolkit is an intelligent layer for Resolume Arena operators. The engine is written in Swift and runs locally on macOS; the interface is web-based and runs in the browser. It monitors the set, understands context, and helps operators act without taking control away.

## [features] Assistente contextual
anchor: feature-assistant
lang: pt
Pergunte sobre o set, confira a câmera ou peça uma leitura do monitor em linguagem natural.

## [features] Contextual assistant
anchor: feature-assistant
lang: en
Ask about the set, check the camera, or request a monitor reading in natural language.

## [features] Monitor em tempo real
anchor: feature-monitor
lang: pt
Mostra grade, clipe ativo e estado do Arena com atualização contínua.

## [features] Real-time monitor
anchor: feature-monitor
lang: en
Shows the grid, active clip, and Arena status with continuous updates.

## [features] Local por princípio
anchor: feature-local
lang: pt
A IA roda localmente: Apple Foundation Models primeiro e Ollama como alternativa. Não depende da nuvem durante o show.

## [features] Local by design
anchor: feature-local
lang: en
AI runs locally: Apple Foundation Models first, Ollama as fallback. No cloud dependency during a show.

## [features] Seguro por padrão
anchor: feature-safe
lang: pt
Ações de escrita seguem uma política restritiva. Operações destrutivas permanecem bloqueadas.

## [features] Safe by default
anchor: feature-safe
lang: en
Write actions follow a restrictive policy. Destructive operations remain blocked.

## [workflow] Como funciona
anchor: workflow
lang: pt
1) Encontra o Arena e confirma a conexão. 2) Lê composição, transporte e estado do monitor. 3) Responde com contexto e executa somente ações permitidas.

## [workflow] How it works
anchor: workflow
lang: en
1) Finds Arena and confirms the connection. 2) Reads composition, transport, and monitor state. 3) Answers with context and only runs permitted actions.

## [ecosystem] Tecnologias
anchor: ecosystem
lang: pt
Motor em Swift, protocolo MCP para ferramentas do agente, API REST do Resolume, descoberta via Bonjour e IA local (Apple Foundation Models e Ollama). NDI e OSC estão apenas em planejamento.

## [ecosystem] Technologies
anchor: ecosystem
lang: en
Swift engine, MCP protocol for agent tools, Resolume REST API, Bonjour discovery, and local AI (Apple Foundation Models and Ollama). NDI and OSC are planning only.

## [status] O que já funciona
anchor: status-ready
lang: pt
No desenvolvimento atual: conexão com o Resolume Arena, monitor do set, assistente local e política segura de ações.

## [status] What already works
anchor: status-ready
lang: en
In the current development build: Resolume Arena connection, set monitor, local assistant, and safe action policy.

## [status] Em evolução
anchor: status-roadmap
lang: pt
Em evolução, sem data prometida: experiência web completa, telemetria de performance e diagnóstico avançado.

## [status] In progress
anchor: status-roadmap
lang: en
In progress, no promised dates: complete web experience, performance telemetry, and advanced diagnostics.

## [faq] Funciona sem internet?
anchor: faq-offline
lang: pt
Sim, essa é a proposta: o motor e a IA rodam localmente no Mac, sem depender da nuvem durante o show.

## [faq] Does it work offline?
anchor: faq-offline
lang: en
Yes, that is the goal: the engine and AI run locally on the Mac, with no cloud dependency during a show.

## [faq] Quando vai ser lançado?
anchor: faq-launch
lang: pt
Ainda não há data. Entre na lista de espera para receber as novidades e o acesso antecipado.

## [faq] When will it launch?
anchor: faq-launch
lang: en
There is no date yet. Join the waitlist to get updates and early access.

## [faq] Preciso de um Mac?
anchor: faq-mac
lang: pt
Sim. O motor roda no macOS. A interface é web e abre no navegador.

## [faq] Do I need a Mac?
anchor: faq-mac
lang: en
Yes. The engine runs on macOS. The interface is web-based and opens in the browser.

## [join] Lista de espera
anchor: join
lang: pt
Para acompanhar e ter acesso antecipado, basta deixar o e-mail na lista de espera. Sem spam.

## [join] Waitlist
anchor: join
lang: en
To follow along and get early access, leave your email on the waitlist. No spam.

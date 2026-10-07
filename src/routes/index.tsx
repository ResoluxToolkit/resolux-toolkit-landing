import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CircleDot,
  Eye,
  Gauge,
  Languages,
  LockKeyhole,
  MonitorPlay,
  Send,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  WifiOff,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { TechnologyEcosystem } from "@/components/technology-ecosystem";
import { SiteGuide } from "@/components/site-guide";
import { faqBlocks } from "@/lib/guide/knowledge";
import { joinWaitlist } from "@/lib/waitlist.functions";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResoluxToolkit — Inteligência para operadores Resolume" },
      {
        name: "description",
        content:
          "Assistência local, monitoramento em tempo real e operação segura para Resolume Arena no macOS, com motor Swift e interface web.",
      },
      { property: "og:title", content: "ResoluxToolkit — Controle o Arena com contexto" },
      {
        property: "og:description",
        content: "Motor Swift local para operadores Resolume, com interface web. Entre na lista de lançamento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Locale = "pt" | "en";

const content = {
  pt: {
    nav: ["Recursos", "Como funciona", "Status"],
    join: "Entrar na lista",
    eyebrow: "Feito para quem opera ao vivo",
    titleA: "Seu Resolume.",
    titleB: "Mais atento.",
    intro:
      "Um motor inteligente em Swift, rodando localmente no seu Mac, com interface web para monitorar o Arena, entender seu set e ajudar você a agir — sem tirar o controle das suas mãos.",
    email: "seu@email.com",
    submit: "Quero acesso antecipado",
    privacy: "Sem spam. Apenas novidades importantes do projeto.",
    success: "Você está na lista. Avisaremos quando houver novidades.",
    duplicate: "Este e-mail já está na lista.",
    error: "Não foi possível enviar agora. Tente novamente.",
    limited: "Muitas tentativas. Aguarde um pouco e tente novamente.",
    built: "Motor Swift no macOS",
    local: "Processamento local",
    arena: "Interface web",
    sectionEyebrow: "Uma nova camada sobre o Arena",
    sectionTitle: "Contexto quando importa. Silêncio quando não.",
    sectionBody:
      "O ResoluxToolkit acompanha o estado do seu set e organiza o que você precisa ver, sem competir com a performance.",
    features: [
      ["Assistente contextual", "Pergunte sobre o set, confira a câmera ou peça uma leitura do monitor em linguagem natural."],
      ["Monitor em tempo real", "Visualize grade, clipe ativo e estado do Arena com atualização contínua e leitura clara."],
      ["Local por princípio", "Apple Foundation Models primeiro, Ollama como alternativa. Sem depender da nuvem no show."],
      ["Seguro por padrão", "Ações de escrita seguem uma política restritiva. Operações destrutivas permanecem bloqueadas."],
    ],
    flowEyebrow: "Do set à resposta",
    flowTitle: "Conecte. Observe. Decida.",
    steps: [
      ["01", "Encontra o Arena", "Descobre o Resolume e confirma que a conexão está pronta."],
      ["02", "Lê o contexto", "Acompanha composição, transporte e estado do monitor."],
      ["03", "Ajuda a operar", "Responde com contexto e executa somente o que é permitido."],
    ],
    statusEyebrow: "Estado do projeto",
    statusTitle: "Motor nativo. Interface web. Transparência sempre.",
    statusBody:
      "O motor em Swift no macOS já conecta ao Arena, monitora o set e oferece assistência local. A interface agora é web, executada no navegador, e segue em evolução.",
    ready: "Disponível no desenvolvimento atual",
    roadmap: "Em evolução",
    readyItems: ["Conexão com Resolume Arena", "Monitor do set", "Assistente local", "Política segura de ações"],
    roadmapItems: ["Experiência web completa", "Telemetria de performance", "Diagnóstico avançado"],
    finalEyebrow: "Acompanhe o desenvolvimento",
    finalTitle: "Esteja entre os primeiros a operar com o ResoluxToolkit.",
    finalBody: "Entre na lista para receber atualizações essenciais e acesso quando a primeira versão estiver pronta.",
    footer: "Em desenvolvimento independente para operadores Resolume.",
    productMock: {
      assistant: "Assistente",
      active: "Arena conectado",
      user: "Como está o set agora?",
      reply:
        "Composição ativa e estável. O clipe da camada 2 está tocando; monitor e câmera respondem normalmente.",
      context: "CONTEXTO ATIVO",
      sources: "FONTES",
      window: "Janela de contexto",
      monitor: "Monitor",
      camera: "Câmera",
      live: "Ativa",
      prompt: "Pergunte sobre seu set...",
    },
  },
  en: {
    nav: ["Features", "How it works", "Status"],
    join: "Join the waitlist",
    eyebrow: "Built for live operators",
    titleA: "Your Resolume.",
    titleB: "More aware.",
    intro:
      "A Swift engine running locally on your Mac, with a web interface to monitor Arena, understand your set, and help you act — without taking control away from you.",
    email: "you@email.com",
    submit: "Get early access",
    privacy: "No spam. Only important project updates.",
    success: "You’re on the list. We’ll share updates when ready.",
    duplicate: "This email is already on the list.",
    error: "Couldn’t submit right now. Please try again.",
    limited: "Too many attempts. Please wait and try again.",
    built: "Swift engine on macOS",
    local: "Local processing",
    arena: "Web interface",
    sectionEyebrow: "A new layer above Arena",
    sectionTitle: "Context when it matters. Quiet when it doesn’t.",
    sectionBody:
      "ResoluxToolkit follows your set’s state and organizes what you need to see, without competing with the performance.",
    features: [
      ["Contextual assistant", "Ask about the set, check the camera, or request a monitor reading in natural language."],
      ["Real-time monitor", "See the grid, active clip, and Arena status with continuous, legible updates."],
      ["Local by design", "Apple Foundation Models first, Ollama as fallback. No cloud dependency during a show."],
      ["Safe by default", "Write actions follow a restrictive policy. Destructive operations remain blocked."],
    ],
    flowEyebrow: "From set to answer",
    flowTitle: "Connect. Observe. Decide.",
    steps: [
      ["01", "Finds Arena", "Discovers Resolume and confirms the connection is ready."],
      ["02", "Reads context", "Tracks composition, transport, and monitor state."],
      ["03", "Helps you operate", "Answers with context and only runs permitted actions."],
    ],
    statusEyebrow: "Project status",
    statusTitle: "Native engine. Web interface. Always transparent.",
    statusBody:
      "The Swift engine on macOS already connects to Arena, monitors the set, and provides local assistance. The interface is now web, running in the browser, and still evolving.",
    ready: "Available in the current development build",
    roadmap: "In progress",
    readyItems: ["Resolume Arena connection", "Set monitor", "Local assistant", "Safe action policy"],
    roadmapItems: ["Complete web experience", "Performance telemetry", "Advanced diagnostics"],
    finalEyebrow: "Follow the build",
    finalTitle: "Be among the first to operate with ResoluxToolkit.",
    finalBody: "Join the list for essential updates and access when the first version is ready.",
    footer: "Independently developed for Resolume operators.",
    productMock: {
      assistant: "Assistant",
      active: "Arena connected",
      user: "How is the set doing right now?",
      reply: "Active composition is stable. The layer 2 clip is playing; monitor and camera are responding normally.",
      context: "ACTIVE CONTEXT",
      sources: "SOURCES",
      window: "Context window",
      monitor: "Monitor",
      camera: "Camera",
      live: "Active",
      prompt: "Ask about your set...",
    },
  },
} as const;

function WaitlistForm({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const join = useServerFn(joinWaitlist);
  const t = content[locale];
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "duplicate" | "error" | "limited">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setState("loading");
    try {
      const result = await join({ data: { email, locale } });
      if (!result.ok) setState("limited");
      else setState(result.alreadyJoined ? "duplicate" : "success");
    } catch {
      setState("error");
    }
  }

  const feedback = state === "success" ? t.success : state === "duplicate" ? t.duplicate : state === "limited" ? t.limited : state === "error" ? t.error : "";

  return (
    <form onSubmit={handleSubmit} className={compact ? "mx-auto max-w-2xl" : "max-w-xl"}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`email-${compact ? "final" : "hero"}`}>Email</label>
        <input
          id={`email-${compact ? "final" : "hero"}`}
          type="email"
          autoComplete="email"
          required
          maxLength={255}
          value={email}
          onChange={(event) => { setEmail(event.target.value); if (state !== "idle") setState("idle"); }}
          placeholder={t.email}
          className="h-12 min-w-0 flex-1 rounded-md border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
        <Button type="submit" disabled={state === "loading"} className="h-12 whitespace-nowrap">
          {state === "loading" ? <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" /> : <ArrowRight className="size-4" />}
          {t.submit}
        </Button>
      </div>
      <div aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-foreground">
        {feedback ? <span className={state === "error" || state === "limited" ? "text-destructive" : "text-success"}>{feedback}</span> : t.privacy}
      </div>
    </form>
  );
}

function ProductMock({ locale }: { locale: Locale }) {
  const t = content[locale].productMock;
  return (
    <div className="product-window" aria-label="ResoluxToolkit product interface preview">
      <div className="mock-titlebar">
        <div className="flex gap-2"><span className="window-dot bg-destructive" /><span className="window-dot bg-warning" /><span className="window-dot bg-success" /></div>
        <div className="mock-tabs"><span>Quick Play</span><span>{t.monitor}</span><strong>{t.assistant}</strong></div>
        <span className="status-pill"><span className="size-1.5 rounded-full bg-success" />{t.active}</span>
      </div>
      <div className="mock-grid">
        <aside className="mock-sidebar">
          <div className="brand-mark"><span className="brand-glyph"><Sparkles /></span><span>Resolux</span></div>
          <div className="mock-label">HOJE</div>
          <div className="mock-session active"><span>Hello World</span><small>{t.assistant}</small></div>
          <div className="mock-session"><span>{t.monitor} do Arena</span><small>Agora</small></div>
          <div className="mock-label">CAPABILITIES</div>
          <div className="flex flex-wrap gap-2"><span className="mini-chip"><Eye /> Captura</span><span className="mini-chip"><Send /> Ações</span></div>
        </aside>
        <main className="mock-chat">
          <span className="mock-label">HOJE</span>
          <div className="user-bubble">{t.user}</div>
          <div className="agent-card">
            <div className="agent-head"><span className="agent-orb" /><span>RESOLUX</span><span className="pro-chip">PRO</span></div>
            <p>{t.reply}</p>
            <div className="agent-footer"><span>03:29 · 54 tokens</span><span className="flex gap-2"><Eye /><Gauge /></span></div>
          </div>
          <div className="working-bar"><span className="agent-orb purple" />{locale === "pt" ? "Analisando o monitor do Arena..." : "Analyzing the Arena monitor..."}<small>working</small></div>
          <div className="composer"><span>{t.prompt}</span><Send /></div>
        </main>
        <aside className="mock-context">
          <span className="mock-label">{t.context}</span>
          <div className="context-card"><strong>{t.window}</strong><div className="progress"><span /></div><small>9% · 18 mil tokens</small></div>
          <span className="mock-label">{t.sources}</span>
          {[t.camera, t.monitor, "Quick Play"].map((source, index) => <div className="source-row" key={source}><span>{index === 0 ? <CircleDot /> : index === 1 ? <MonitorPlay /> : <WandSparkles />}{source}</span><small className={index < 2 ? "text-success" : ""}>{index < 2 ? t.live : "—"}</small></div>)}
        </aside>
      </div>
    </div>
  );
}

function GoogleSignInButton({ locale }: { locale: Locale }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSignIn() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  if (userEmail) {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        title={locale === "pt" ? "Sair" : "Sign out"}
        className="hidden max-w-40 items-center gap-2 truncate rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground sm:inline-flex"
      >
        <span className="size-1.5 shrink-0 rounded-full bg-success" />
        <span className="truncate">{userEmail}</span>
      </button>
    );
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleSignIn} disabled={loading} className="hidden sm:inline-flex">
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.98 11.98 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
      </svg>
      {loading ? "…" : locale === "pt" ? "Entrar com Google" : "Sign in with Google"}
    </Button>
  );
}

function Index() {
  const [locale, setLocale] = useState<Locale>("pt");
  useEffect(() => {
    const saved = window.localStorage.getItem("resolux-locale");
    if (saved === "pt" || saved === "en") setLocale(saved);
  }, []);
  function changeLocale(next: Locale) {
    setLocale(next);
    window.localStorage.setItem("resolux-locale", next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
  }
  const t = content[locale];
  const featureIcons = [Bot, MonitorPlay, WifiOff, ShieldCheck];

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="site-header">
        <a href="#top" className="brand"><span className="brand-glyph"><Sparkles /></span><span>ResoluxToolkit</span></a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <a href="#ecosystem">{locale === "pt" ? "Tecnologias" : "Technologies"}</a><a href="#features">{t.nav[0]}</a><a href="#workflow">{t.nav[1]}</a><a href="#status">{t.nav[2]}</a><a href="#faq">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="language-switch" aria-label="Language"><Languages className="size-4" /><button onClick={() => changeLocale("pt")} className={locale === "pt" ? "active" : ""}>PT</button><span>/</span><button onClick={() => changeLocale("en")} className={locale === "en" ? "active" : ""}>EN</button></div>
          <GoogleSignInButton locale={locale} />
          <Button asChild size="sm" className="hidden sm:inline-flex"><a href="#join">{t.join}</a></Button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-aurora" />
          <div className="mx-auto max-w-7xl px-5 pt-20 text-center sm:px-8 lg:pt-28">
            <div className="eyebrow mx-auto"><span className="size-1.5 rounded-full bg-success" />{t.eyebrow}</div>
            <h1 className="hero-title"><span>{t.titleA}</span><strong>{t.titleB}</strong></h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">{t.intro}</p>
            <div className="mx-auto mt-8 max-w-xl"><WaitlistForm locale={locale} /></div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span><Check />{t.built}</span><span><Check />{t.local}</span><span><Check />{t.arena}</span>
            </div>
            <div className="mt-14 lg:mt-20"><ProductMock locale={locale} /></div>
          </div>
        </section>

        <TechnologyEcosystem locale={locale} featured />

        <section id="features" className="section-band border-t border-border">
          <div className="section-inner">
            <div className="max-w-3xl"><p className="section-kicker">{t.sectionEyebrow}</p><h2>{t.sectionTitle}</h2><p className="section-lead">{t.sectionBody}</p></div>
            <div className="feature-grid">
              {t.features.map(([title, body], index) => { const Icon = featureIcons[index] ?? Bot; return <article className="feature-item" id={["feature-assistant","feature-monitor","feature-local","feature-safe"][index]} key={title}><span className="feature-icon"><Icon /></span><h3>{title}</h3><p>{body}</p></article>; })}
            </div>
          </div>
        </section>


        <section id="workflow" className="section-band border-t border-border">
          <div className="section-inner">
            <p className="section-kicker">{t.flowEyebrow}</p><h2>{t.flowTitle}</h2>
            <div className="steps-grid">{t.steps.map(([number, title, body], index) => <article className="step" id={["step-connect","step-context","step-operate"][index]} key={number}><span>{number}</span><div className="step-icon">{index === 0 ? <CircleDot /> : index === 1 ? <Eye /> : <Sparkles />}</div><h3>{title}</h3><p>{body}</p>{index < 2 && <ChevronRight className="step-arrow" />}</article>)}</div>
          </div>
        </section>

        <section id="status" className="section-band border-t border-border">
          <div className="section-inner status-layout">
            <div><p className="section-kicker">{t.statusEyebrow}</p><h2>{t.statusTitle}</h2><p className="section-lead">{t.statusBody}</p><div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground"><LockKeyhole className="size-4 text-primary" />{locale === "pt" ? "Sem promessas além do que já foi medido." : "No promises beyond what has been verified."}</div></div>
            <div className="status-columns">
              <div id="status-ready"><span className="status-heading text-success"><CircleDot />{t.ready}</span>{t.readyItems.map((item) => <p key={item}><Check />{item}</p>)}</div>
              <div id="status-roadmap"><span className="status-heading text-info"><Gauge />{t.roadmap}</span>{t.roadmapItems.map((item) => <p key={item}><ChevronRight />{item}</p>)}</div>
            </div>
          </div>
        </section>

        <section id="faq" className="section-band border-t border-border">
          <div className="section-inner">
            <p className="section-kicker">FAQ</p><h2>{locale === "pt" ? "Perguntas frequentes" : "Frequently asked questions"}</h2>
            <div className="faq-list">{faqBlocks.filter((b) => b.lang === locale).map((b) => <article className="faq-item" id={b.anchor} key={b.anchor}><h3>{b.title}</h3><p>{b.body}</p></article>)}</div>
          </div>
        </section>

        <section id="join" className="final-cta">
          <div className="final-glow" />
          <div className="relative mx-auto max-w-3xl px-5 text-center"><p className="section-kicker">{t.finalEyebrow}</p><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div className="mt-8"><WaitlistForm locale={locale} compact /></div></div>
        </section>
      </main>

      <SiteGuide locale={locale} />
      <footer><a href="#top" className="brand"><span className="brand-glyph"><Sparkles /></span><span>ResoluxToolkit</span></a><p>{t.footer}</p><span>© 2026 ResoluxToolkit</span></footer>
    </div>
  );
}

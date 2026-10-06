import { useEffect, useState } from "react";
import { ArrowUpRight, AudioLines, Braces, Camera, ChevronDown, FileArchive, Globe2, Network, Pause, Play, Radio, ShieldCheck } from "lucide-react";
import { siApple, siModelcontextprotocol, siNdi, siOllama, siSwift, siTelegram } from "simple-icons";
import { Button } from "@/components/ui/button";
import resolumeLogo from "@/assets/resolume-logo.svg.asset.json";

type Locale = "pt" | "en";
type NodeId = "web" | "apple" | "ollama" | "swift" | "mcp" | "rest" | "bonjour" | "arena";

const copy = {
  pt: {
    kicker: "O ecossistema Resolux",
    title: "Tecnologias conectadas.\nControle nas suas mãos.",
    intro: "Motor Swift, inteligência local e protocolos abertos. Cada conexão tem um papel no seu set.",
    pause: "Pausar animação", play: "Retomar animação", map: "Mapa de integrações do ResoluxToolkit",
    engine: "MOTOR LOCAL · macOS", web: "Interface web", evolving: "Em evolução", primary: "IA local · prioritária", fallback: "IA local · alternativa",
    mcp: "Ferramentas · stdio", rest: "Estado e monitor", bonjour: "Descoberta · mDNS", arena: "SEU SET AO VIVO",
    schematic: "Arquitetura ilustrativa · não representa uma sessão ao vivo",
    phases: ["Descoberta do Arena", "Leitura do contexto", "Inteligência local", "Ações com proteção"],
    catalog: "Tecnologias e protocolos", legacy: "Referências anteriores à interface web", planned: "Planejado · não integrado",
    note: "Protocolos sem logo próprio usam símbolos identificados. Logos pertencem aos seus respectivos titulares.",
    details: {
      swift: ["Swift · macOS", "O motor local reúne a descoberta do Arena, o monitor, o assistente e a política de ações. A interface é web, não um app nativo."],
      web: ["Interface web", "A nova interface roda no navegador e segue em evolução. O protocolo de ligação com o motor ainda não foi definido na documentação fornecida."],
      apple: ["Apple Foundation Models", "Primeira opção de inteligência local do assistente. A seleção do provedor prioriza Apple Foundation Models quando disponível."],
      ollama: ["Ollama", "Alternativa local quando Apple Foundation Models não está disponível. O processamento do assistente permanece no Mac."],
      mcp: ["Model Context Protocol", "O motor usa MCP sobre stdio, com mensagens JSON-RPC e verificação de prontidão por socket Unix, para acessar ferramentas do Arena."],
      rest: ["REST · HTTP", "ArenaREST acessa a API do Resolume para ler composição, transporte, clipes e estado do monitor."],
      bonjour: ["Bonjour · mDNS", "Descoberta do serviço _http._tcp do Resolume Arena na rede local, sem depender de digitar um IP."],
      arena: ["Resolume Arena", "O destino das leituras e das ações assistidas. ToolPolicy restringe escritas e mantém operações destrutivas bloqueadas."],
    },
  },
  en: {
    kicker: "The Resolux ecosystem", title: "Connected technologies.\nControl stays with you.",
    intro: "A Swift engine, local intelligence, and open protocols. Every connection has a role in your set.",
    pause: "Pause animation", play: "Resume animation", map: "ResoluxToolkit integration map",
    engine: "LOCAL ENGINE · macOS", web: "Web interface", evolving: "In progress", primary: "Local AI · primary", fallback: "Local AI · fallback",
    mcp: "Tools · stdio", rest: "State and monitor", bonjour: "Discovery · mDNS", arena: "YOUR LIVE SET",
    schematic: "Illustrative architecture · not a live session",
    phases: ["Arena discovery", "Reading context", "Local intelligence", "Protected actions"],
    catalog: "Technologies and protocols", legacy: "References predating the web interface", planned: "Planned · not integrated",
    note: "Protocols without their own logo use labeled symbols. Logos belong to their respective owners.",
    details: {
      swift: ["Swift · macOS", "The local engine brings together Arena discovery, the monitor, the assistant, and action policy. The interface is web, not a native app."],
      web: ["Web interface", "The new interface runs in the browser and is still evolving. Its engine connection protocol is not defined in the supplied documentation."],
      apple: ["Apple Foundation Models", "The assistant’s first choice for local intelligence. Provider selection prioritizes Apple Foundation Models when available."],
      ollama: ["Ollama", "A local fallback when Apple Foundation Models is unavailable. Assistant processing stays on the Mac."],
      mcp: ["Model Context Protocol", "The engine uses MCP over stdio, JSON-RPC messages, and Unix socket readiness checks to access Arena tools."],
      rest: ["REST · HTTP", "ArenaREST accesses Resolume’s API to read composition, transport, clips, and monitor state."],
      bonjour: ["Bonjour · mDNS", "Discovers Resolume Arena’s _http._tcp service on the local network without requiring a typed IP address."],
      arena: ["Resolume Arena", "The destination for reads and assisted actions. ToolPolicy restricts writes and keeps destructive operations blocked."],
    },
  },
} as const;

function BrandIcon({ icon }: { icon: { title: string; path: string } }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={icon.path} /></svg>;
}

const routes = [
  { id: "web", d: "M 170 92 C 285 92 280 275 425 275", kind: "future" },
  { id: "apple", d: "M 170 275 L 425 275", kind: "intelligence" },
  { id: "ollama", d: "M 170 458 C 285 458 280 275 425 275", kind: "intelligence" },
  { id: "mcp", d: "M 575 275 C 685 275 620 92 740 92", kind: "tools" },
  { id: "rest", d: "M 575 275 L 740 275", kind: "tools" },
  { id: "bonjour", d: "M 575 275 C 685 275 620 458 740 458", kind: "discovery" },
  { id: "mcp-arena", d: "M 830 92 C 920 92 915 275 940 275", kind: "tools" },
  { id: "rest-arena", d: "M 830 275 L 940 275", kind: "tools" },
  { id: "bonjour-arena", d: "M 830 458 C 920 458 915 275 940 275", kind: "discovery" },
];

export function TechnologyEcosystem({ locale, featured = false }: { locale: Locale; featured?: boolean }) {
  const t = copy[locale];
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState(0);
  const [selected, setSelected] = useState<NodeId>("swift");
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => setPhase((current) => (current + 1) % 4), 3600);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);
  const detail = t.details[selected];
  function node(id: NodeId, logo: React.ReactNode, name: string, caption: string) {
    return <Button variant="ghost" onClick={() => setSelected(id)} aria-pressed={selected === id} className={`tech-node tech-node-${id}`}>
      <span className="tech-logo">{logo}</span><span className="tech-node-name">{name}</span><span className="tech-node-caption">{caption}</span>
    </Button>;
  }

  return <section id="ecosystem" className={`section-band ecosystem-section${featured ? " ecosystem-featured" : ""}${featured ? "" : " border-t border-border"}`}>
    <div className="section-inner">
      <div className="ecosystem-heading"><div><p className="section-kicker">{t.kicker}</p><h2>{t.title.split("\n").map((line) => <span className="block" key={line}>{line}</span>)}</h2><p className="section-lead">{t.intro}</p></div>
        <Button variant="outline" size="icon" onClick={() => setPaused((value) => !value)} aria-label={paused ? t.play : t.pause} title={paused ? t.play : t.pause} aria-pressed={paused} disabled={reduced}>{paused || reduced ? <Play className="size-4" /> : <Pause className="size-4" />}</Button>
      </div>
      <div className="ecosystem-scene" data-paused={paused || reduced} data-phase={phase} role="group" aria-label={t.map}>
        <div className="ecosystem-grid" aria-hidden="true" />
        <svg className="ecosystem-wires" viewBox="0 0 1100 550" preserveAspectRatio="none" aria-hidden="true">
          {routes.map(({ id, d, kind }) => <g key={id} className={`tech-route route-${kind} route-${id}`}><path className="wire-track" d={d} /><path className="wire-signal" d={d} pathLength="100" /></g>)}
        </svg>
        {node("web", <Globe2 />, t.web, t.evolving)}
        {node("apple", <BrandIcon icon={siApple} />, "Foundation Models", t.primary)}
        {node("ollama", <BrandIcon icon={siOllama} />, "Ollama", t.fallback)}
        <Button variant="ghost" onClick={() => setSelected("swift")} aria-pressed={selected === "swift"} className="tech-node tech-node-swift">
          <span className="tech-engine-label">{t.engine}</span><span className="tech-engine-logo"><BrandIcon icon={siSwift} /></span><strong>Resolux<span>Toolkit</span></strong><span className="tech-engine-language">Swift</span><span className="tech-policy"><ShieldCheck />ToolPolicy</span>
        </Button>
        {node("mcp", <BrandIcon icon={siModelcontextprotocol} />, "MCP", t.mcp)}
        {node("rest", <Braces />, "REST / HTTP", t.rest)}
        {node("bonjour", <Radio />, "Bonjour", t.bonjour)}
        <Button variant="ghost" onClick={() => setSelected("arena")} aria-pressed={selected === "arena"} className="tech-node tech-node-arena"><span className="arena-emblem"><AudioLines /></span><img src={resolumeLogo.url} alt="Resolume" className="resolume-logo" /><strong>Arena</strong><span className="tech-node-caption">{t.arena}</span></Button>
        <span className="tech-edge-label edge-json">JSON-RPC</span><span className="tech-edge-label edge-http">/api/v1</span><span className="tech-edge-label edge-mdns">_http._tcp</span>
      </div>
      <div className="ecosystem-sequence" aria-hidden="true">{t.phases.map((label, index) => <span key={label} className={phase === index ? "current" : ""}><span className="phase-number">0{index + 1}</span>{label}<span className="phase-progress" /></span>)}</div>
      <div className="ecosystem-detail" aria-live="polite"><div className="detail-heading"><Network className="size-4" /><strong>{detail[0]}</strong></div><p>{detail[1]}</p><ArrowUpRight className="size-4" aria-hidden="true" /></div>
      <p className="ecosystem-caption">{t.schematic}</p>
      <div className="ecosystem-extensions">
        <div className="extension-lane"><span className="extension-label">{locale === "pt" ? "Também documentado no motor" : "Also documented in the engine"}</span><div className="extension-items">
          <div className="extension-item"><Camera /><strong>AVFoundation</strong><small>Continuity Camera</small></div>
          <div className="extension-item"><FileArchive /><strong>Backup local</strong><small>tar.gz · OpenClaw · .spike</small></div>
          <div className="extension-item"><ShieldCheck /><strong>WriteJournal</strong><small>{locale === "pt" ? "JSONL · experimental" : "JSONL · experimental"}</small></div>
        </div></div>
        <div className="extension-lane planned-lane"><span className="extension-label">{t.planned}</span><div className="extension-items">
          <div className="extension-item"><span className="td-symbol" aria-hidden="true">TD</span><strong>TouchDesigner</strong><small>{locale === "pt" ? "Ponte de processamento" : "Processing bridge"}</small></div>
          <span className="extension-link" aria-hidden="true" />
          <div className="extension-item"><BrandIcon icon={siNdi} /><strong>NDI®</strong><small>{locale === "pt" ? "Política · sem código" : "Policy · no code"}</small></div>
          <span className="extension-link" aria-hidden="true" />
          <div className="extension-item"><Radio /><strong>OSC · Syphon</strong><small>{locale === "pt" ? "Pontes previstas" : "Proposed bridges"}</small></div>
        </div></div>
      </div>
      <details className="ecosystem-catalog"><summary>{t.catalog}<ChevronDown className="size-4" /></summary><TechnologyCatalog locale={locale} /><p className="tech-legal">{t.note}</p></details>
    </div>
  </section>;
}

function TechnologyCatalog({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  return <div className="technology-catalog-grid">
    <div><h3>{pt ? "Motor e comunicação" : "Engine and communication"}</h3><p>Swift · macOS · Swift Package Manager</p><p>MCP · stdio · JSON-RPC · sockets Unix</p><p>REST · HTTP · Bonjour · mDNS</p><p>ToolPolicy · WriteJournal · JSONL</p></div>
    <div><h3>{pt ? "Inteligência e persistência" : "Intelligence and persistence"}</h3><p>Apple Foundation Models · Ollama</p><p>ChatEngine · ToolSchemaNormalizer · ToolCallTextRescue</p><p>Keychain · UserDefaults · /chat/completions</p><p>TimelineCalculator · OperationMode · ModeGate</p></div>
    <div><h3>{pt ? "Nova interface" : "New interface"}</h3><p>{pt ? "Web · navegador · em evolução" : "Web · browser · in progress"}</p><p>{pt ? "Transporte com o motor a definir" : "Engine transport to be defined"}</p><p>{pt ? "Nenhuma ligação WebSocket presumida" : "No assumed WebSocket connection"}</p></div>
    <div><h3>{pt ? "Referências da interface anterior" : "Previous interface references"}</h3><div className="catalog-logo-row"><BrandIcon icon={siSwift} /><span>SwiftUI</span><BrandIcon icon={siApple} /></div><p>AppKit · UIKit · Metal · MEVOLIT · BorderBeamKit</p><p>{pt ? "Tecnologias da UI nativa anterior; não descrevem a nova UI web. iOS era scaffold." : "Previous native UI technologies, not the new web UI. iOS was a scaffold."}</p></div>
    <div><h3>Telegram</h3><div className="catalog-logo-row"><BrandIcon icon={siTelegram} /><span>TelegramQRCard</span></div><p>{pt ? "Card QR na interface anterior. Não há bot ou integração de API documentados." : "QR card in the previous interface. No documented bot or API integration."}</p></div>
    <div><h3>{pt ? "Contexto do Arena, não dependências do motor" : "Arena context, not engine dependencies"}</h3><p>DXV · DXV3 · DXT1/DXT5 · BC1/BC3 · squish</p><p>H.264 · HEVC · ProRes · MJPEG · Resolume Alley</p><p>Syphon.framework · MoltenVK</p><p>{pt ? "Citados na análise de vídeo do Arena; nenhum pipeline de vídeo anunciado no Resolux." : "Referenced in Arena video analysis; no Resolux video pipeline announced."}</p></div>
  </div>;
}
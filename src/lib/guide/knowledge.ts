import raw from "../../../content/guide/knowledge.md?raw";

export type GuideLocale = "pt" | "en";
export type KnowledgeBlock = { section: string; title: string; anchor: string; lang: GuideLocale; body: string };

export const STATIC_ANCHORS = [
  "top", "ecosystem", "features", "feature-assistant", "feature-monitor", "feature-local", "feature-safe",
  "workflow", "step-connect", "step-context", "step-operate", "status", "status-ready", "status-roadmap", "faq", "join",
] as const;

export function parseKnowledge(source: string): KnowledgeBlock[] {
  const text = source.replace(/<!--[\s\S]*?-->/g, "");
  const blocks: KnowledgeBlock[] = [];
  for (const chunk of text.split(/^## /m).slice(1)) {
    const lines = chunk.split("\n");
    const head = lines.shift()?.trim() ?? "";
    const m = head.match(/^\[([^\]]+)\]\s*(.+)$/);
    if (!m) continue;
    let anchor = "";
    let lang: GuideLocale = "pt";
    const body: string[] = [];
    for (const line of lines) {
      const a = line.match(/^anchor:\s*(\S+)/);
      const l = line.match(/^lang:\s*(pt|en)/);
      if (a) anchor = a[1];
      else if (l) lang = l[1] as GuideLocale;
      else body.push(line);
    }
    if (anchor) blocks.push({ section: m[1].trim(), title: m[2].trim(), anchor, lang, body: body.join("\n").trim() });
  }
  return blocks;
}

export const knowledge = parseKnowledge(raw);
export const faqBlocks = knowledge.filter((b) => b.section === "faq");
export const validAnchors = new Set<string>([...STATIC_ANCHORS, ...faqBlocks.map((b) => b.anchor)]);

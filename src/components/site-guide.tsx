import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowDownRight, MessageCircleQuestion, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/components/ai-elements/tool";

type Locale = "pt" | "en";
const STORAGE_KEY = "resolux-guide-messages";

const copy = {
  pt: {
    open: "Pergunte ao guia", title: "Guia Resolux", sub: "Respondo sobre o projeto e levo você ao ponto certo da página.",
    placeholder: "Pergunte sobre o ResoluxToolkit...", reset: "Nova conversa", thinking: "Procurando na página...", go: "Ir para",
    suggestions: ["O que é o ResoluxToolkit?", "Funciona sem internet?", "Quais tecnologias usa?", "Como entro na lista?"],
    errors: { 429: "Muitas perguntas seguidas. Aguarde um pouco.", 402: "O guia está pausado no momento.", other: "Não consegui responder agora. Tente de novo." },
  },
  en: {
    open: "Ask the guide", title: "Resolux guide", sub: "I answer about the project and take you to the right spot on the page.",
    placeholder: "Ask about ResoluxToolkit...", reset: "New conversation", thinking: "Searching the page...", go: "Go to",
    suggestions: ["What is ResoluxToolkit?", "Does it work offline?", "Which technologies does it use?", "How do I join the list?"],
    errors: { 429: "Too many questions in a row. Please wait.", 402: "The guide is paused right now.", other: "Couldn't answer right now. Try again." },
  },
} as const;

export function scrollToAnchor(anchor: string) {
  const el = document.getElementById(anchor);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.remove("guide-highlight");
  void el.offsetWidth;
  el.classList.add("guide-highlight");
  window.setTimeout(() => el.classList.remove("guide-highlight"), 2200);
}

function loadSaved(): UIMessage[] {
  try { const v = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]"); return Array.isArray(v) ? v : []; } catch { return []; }
}

function GuideChat({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const [initial] = useState(loadSaved);
  const t = copy[locale];
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat", body: { locale } }), [locale]);
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: "site-guide",
    messages: initial,
    transport,
    onError: (err) => {
      const msg = err.message || "";
      setError(msg.includes("rate_limited") ? t.errors[429] : msg.includes("402") ? t.errors[402] : t.errors.other);
    },
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "ready" || status === "error") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, status]);
  useEffect(() => { if (!busy) textareaRef.current?.focus(); }, [busy]);

  function send(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    setError(null);
    setInput("");
    void sendMessage({ text: value });
  }

  function reset() {
    stop();
    setMessages([]);
    window.localStorage.removeItem(STORAGE_KEY);
    textareaRef.current?.focus();
  }

  return (
    <div className="guide-panel" role="dialog" aria-label={t.title}>
      <div className="guide-head">
        <span className="guide-orb" aria-hidden />
        <div className="min-w-0 flex-1"><strong>{t.title}</strong><small>{t.sub}</small></div>
        <button type="button" onClick={reset} title={t.reset} aria-label={t.reset}><RotateCcw /></button>
        <button type="button" onClick={onClose} aria-label="Fechar"><X /></button>
      </div>
      <Conversation className="guide-conversation">
        <ConversationContent className="gap-4 p-4">
          {messages.length === 0 && (
            <div className="guide-suggestions">
              {t.suggestions.map((s) => <button key={s} type="button" onClick={() => send(s)}>{s}</button>)}
            </div>
          )}
          {messages.map((m) => (
            <Message from={m.role} key={m.id}>
              <MessageContent className={m.role === "user" ? "guide-user" : "guide-assistant"}>
                {m.parts.map((part, i) => {
                  if (part.type === "text") return m.role === "user" ? <p key={i}>{part.text}</p> : <MessageResponse key={i}>{part.text}</MessageResponse>;
                  if (part.type === "tool-navigate_to_section") {
                    const out = part.state === "output-available" ? (part.output as { ok: boolean; anchor: string; label: string }) : null;
                    return (
                      <div key={i} className="flex flex-col gap-1">
                        {out?.ok && (
                          <button type="button" className="guide-jump" onClick={() => scrollToAnchor(out.anchor)}>
                            <ArrowDownRight />{t.go}: {out.label}
                          </button>
                        )}
                        <Tool defaultOpen={false} className="guide-tool">
                          <ToolHeader type={part.type} state={part.state} />
                          <ToolContent><ToolInput input={part.input} /><ToolOutput output={part.output} errorText={part.errorText} /></ToolContent>
                        </Tool>
                      </div>
                    );
                  }
                  return null;
                })}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Shimmer className="text-sm">{t.thinking}</Shimmer>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="p-3">
        <PromptInput onSubmit={(msg) => send(msg.text ?? "")}>
          <PromptInputTextarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} maxLength={600} />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && !input.trim()} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

export function SiteGuide({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <GuideChat key={locale} locale={locale} onClose={() => setOpen(false)} />}
      {!open && (
        <button type="button" className="guide-launcher" onClick={() => setOpen(true)}>
          <MessageCircleQuestion />{copy[locale].open}
        </button>
      )}
    </>
  );
}

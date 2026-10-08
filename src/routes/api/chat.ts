import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";

import inventory from "../../../docs/technology-inventory.md?raw";
import { knowledge, validAnchors } from "@/lib/guide/knowledge";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/guide/run-id.server";

async function hash(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function json(status: number, error: string) {
  return new Response(JSON.stringify({ error }), { status, headers: { "Content-Type": "application/json" } });
}

function buildInstructions(locale: "pt" | "en") {
  const kb = knowledge
    .filter((b) => b.lang === locale)
    .map((b) => `### ${b.title}\n(anchor: ${b.anchor})\n${b.body}`)
    .join("\n\n");
  return `You are the ResoluxToolkit site guide on the landing page. Answer in ${locale === "pt" ? "Brazilian Portuguese" : "English"}, in at most 3 short sentences.
Use ONLY the knowledge below. If the answer is not there, say you don't know and suggest the waitlist (anchor "join").
Never present roadmap items as ready. Never describe the UI as a native macOS/iOS app: the engine is Swift on macOS, the interface is web.
Whenever a page section answers the question, call navigate_to_section once or twice with the most relevant anchor and a short button label in the user's language. Only use anchors listed below.
Valid anchors: ${[...validAnchors].join(", ")}

## Knowledge
${kb}

## Technology inventory (reference)
${inventory.slice(0, 6000)}`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env['LOVABLE_API_KEY'];
        if (!apiKey) return json(500, "config");

        let body: { messages?: UIMessage[]; locale?: string };
        try { body = await request.json(); } catch { return json(400, "invalid"); }
        const locale = body.locale === "en" ? "en" : "pt";
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
        if (!messages.length || JSON.stringify(messages).length > 40_000) return json(400, "invalid");

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        const ipHash = await hash(ip);
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const { count, error: countError } = await supabaseAdmin
          .from("guide_rate_limits").select("id", { count: "exact", head: true })
          .eq("ip_hash", ipHash).gte("attempted_at", cutoff);
        if (countError) return json(503, "unavailable");
        if ((count ?? 0) >= 30) return json(429, "rate_limited");
        await supabaseAdmin.from("guide_rate_limits").insert({ ip_hash: ipHash });

        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });

        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          instructions: buildInstructions(locale),
          messages: await convertToModelMessages(messages),
          abortSignal: request.signal,
          stopWhen: stepCountIs(50),
          tools: {
            navigate_to_section: tool({
              description: "Suggest a page section the visitor can jump to.",
              inputSchema: z.object({ anchor: z.string(), label: z.string() }),
              execute: async ({ anchor, label }) =>
                validAnchors.has(anchor) ? { ok: true, anchor, label: label.slice(0, 60) } : { ok: false, anchor, label },
            }),
          },
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });

        return withLovableAiGatewayRunIdHeader(
          result.toUIMessageStreamResponse({ originalMessages: messages }),
          runIdFetch,
        );
      },
    },
  },
});

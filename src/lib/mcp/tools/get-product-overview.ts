import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const overview = {
  pt: {
    name: "ResoluxToolkit",
    audience: "Operadores de Resolume Arena",
    summary:
      "Uma camada inteligente e local para monitorar o Arena, entender o set e ajudar o operador a agir sem retirar seu controle.",
    principles: [
      "Processamento local",
      "Apple Foundation Models primeiro, Ollama como alternativa",
      "Ações de escrita restritivas por padrão",
      "Operações destrutivas permanentemente bloqueadas",
    ],
  },
  en: {
    name: "ResoluxToolkit",
    audience: "Resolume Arena operators",
    summary:
      "A local intelligent layer for monitoring Arena, understanding the set, and helping the operator act without taking control away.",
    principles: [
      "Local processing",
      "Apple Foundation Models first, Ollama as an alternative",
      "Write actions restricted by default",
      "Destructive operations permanently blocked",
    ],
  },
} as const;

export default defineTool({
  name: "get_product_overview",
  title: "Get product overview",
  description: "Returns a concise public overview of ResoluxToolkit and its operating principles.",
  inputSchema: {
    language: z.enum(["pt", "en"]).default("pt").describe("Response language."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ language }) => {
    const product = overview[language];
    return {
      content: [{ type: "text", text: `${product.name}: ${product.summary}` }],
      structuredContent: {
        product: {
          name: product.name,
          audience: product.audience,
          summary: product.summary,
          principles: [...product.principles],
        },
      },
    };
  },
});
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const statuses = {
  pt: {
    platform: "macOS",
    state: "Em desenvolvimento ativo",
    available: [
      "Conexão com Resolume Arena",
      "Monitor do set",
      "Assistente local",
      "Política segura de ações",
    ],
    inProgress: ["Experiência web completa", "Telemetria de performance", "Diagnóstico avançado"],
    note: "O motor permanece em Swift no macOS; a interface é web e segue em evolução.",
  },
  en: {
    platform: "macOS",
    state: "In active development",
    available: ["Resolume Arena connection", "Set monitor", "Local assistant", "Safe action policy"],
    inProgress: ["Complete web experience", "Performance telemetry", "Advanced diagnostics"],
    note: "The engine remains Swift on macOS; the interface is web and still evolving.",
  },
} as const;

export default defineTool({
  name: "get_project_status",
  title: "Get project status",
  description: "Returns the current public development status of ResoluxToolkit without roadmap promises.",
  inputSchema: {
    language: z.enum(["pt", "en"]).default("pt").describe("Response language."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ language }) => {
    const status = statuses[language];
    return {
      content: [{ type: "text", text: `${status.platform}: ${status.state}. ${status.note}` }],
      structuredContent: {
        status: {
          platform: status.platform,
          state: status.state,
          available: [...status.available],
          inProgress: [...status.inProgress],
          note: status.note,
        },
      },
    };
  },
});
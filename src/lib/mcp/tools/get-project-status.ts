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
    inProgress: ["Experiência completa no iOS", "Telemetria de performance", "Diagnóstico avançado"],
    note: "O app para iOS ainda está em definição e não é apresentado como pronto.",
  },
  en: {
    platform: "macOS",
    state: "In active development",
    available: ["Resolume Arena connection", "Set monitor", "Local assistant", "Safe action policy"],
    inProgress: ["Complete iOS experience", "Performance telemetry", "Advanced diagnostics"],
    note: "The iOS app is still being defined and is not presented as finished.",
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
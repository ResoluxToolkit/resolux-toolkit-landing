import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  locale?: "pt" | "en";
}

const copy = {
  pt: {
    preview: "Você está na lista do ResoluxToolkit",
    title: "Você está na lista.",
    body: "Obrigado pelo interesse no ResoluxToolkit — motor Swift no macOS com interface web para operadores de Resolume. Avisaremos quando houver novidades do lançamento.",
    sign: "Equipe ResoluxToolkit",
  },
  en: {
    preview: "You're on the ResoluxToolkit list",
    title: "You're on the list.",
    body: "Thanks for your interest in ResoluxToolkit — a Swift engine on macOS with a web front-end for Resolume operators. We'll let you know when there's launch news.",
    sign: "The ResoluxToolkit team",
  },
};

function WaitlistConfirmation({ locale = "pt" }: Props) {
  const t = copy[locale] ?? copy.pt;
  return (
    <Html lang={locale === "pt" ? "pt-BR" : "en"}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container style={{ padding: "32px 24px", maxWidth: "520px" }}>
          <Text style={{ color: "#f26b1d", fontWeight: 700, letterSpacing: "0.08em", fontSize: "12px" }}>
            RESOLUXTOOLKIT
          </Text>
          <Heading style={{ color: "#111111", fontSize: "24px" }}>{t.title}</Heading>
          <Text style={{ color: "#333333", fontSize: "15px", lineHeight: "24px" }}>{t.body}</Text>
          <Text style={{ color: "#666666", fontSize: "14px" }}>{t.sign}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: WaitlistConfirmation,
  subject: (data: Record<string, any>) =>
    data.locale === "en" ? "You're on the ResoluxToolkit list" : "Você está na lista do ResoluxToolkit",
  displayName: "Waitlist confirmation",
  previewData: { locale: "pt" },
} satisfies TemplateEntry;

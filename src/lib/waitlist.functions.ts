import { getRequestHeader } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  locale: z.enum(["pt", "en"]),
});

async function hash(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => waitlistSchema.parse(input))
  .handler(async ({ data }) => {
    const forwarded = getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();
    const ipHash = await hash(forwarded || "unknown");
    const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count, error: countError } = await supabaseAdmin
      .from("waitlist_rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("attempted_at", cutoff);

    if (countError) throw new Error("waitlist_unavailable");
    if ((count ?? 0) >= 8) return { ok: false as const, reason: "rate_limited" as const };

    const { error: limitError } = await supabaseAdmin
      .from("waitlist_rate_limits")
      .insert({ ip_hash: ipHash });
    if (limitError) throw new Error("waitlist_unavailable");

    const { error } = await supabaseAdmin
      .from("waitlist_signups")
      .insert({ email: data.email, locale: data.locale });

    if (error?.code === "23505") return { ok: true as const, alreadyJoined: true };
    if (error) throw new Error("waitlist_unavailable");
    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("waitlist-confirmation", data.email, {
        templateData: { locale: data.locale },
        idempotencyKey: `waitlist-confirmation-${data.email}`,
      });
    } catch (e) {
      console.error("waitlist confirmation email failed", e);
    }
    return { ok: true as const, alreadyJoined: false };
  });
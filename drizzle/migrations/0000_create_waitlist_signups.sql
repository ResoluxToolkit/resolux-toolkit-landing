CREATE TABLE public.waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'pt' CHECK (locale IN ('pt', 'en')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_signups_email_normalized CHECK (email = lower(trim(email))),
  CONSTRAINT waitlist_signups_email_length CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT waitlist_signups_email_unique UNIQUE (email)
);

GRANT ALL ON public.waitlist_signups TO service_role;

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.waitlist_signups IS 'Private launch waitlist; server-only writes and reads.';
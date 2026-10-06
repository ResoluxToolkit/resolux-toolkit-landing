CREATE TABLE public.waitlist_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_rate_limits_ip_hash_length CHECK (char_length(ip_hash) = 64)
);

GRANT ALL ON public.waitlist_rate_limits TO service_role;

ALTER TABLE public.waitlist_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE INDEX waitlist_rate_limits_lookup_idx
  ON public.waitlist_rate_limits (ip_hash, attempted_at DESC);

COMMENT ON TABLE public.waitlist_rate_limits IS 'Private hashed request fingerprints for waitlist abuse prevention.';
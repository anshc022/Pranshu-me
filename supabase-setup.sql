-- Bookings table for portfolio consultation form
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  business text,
  date text NOT NULL,
  time_slot text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (frontend form)
CREATE POLICY anon_insert ON public.bookings
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated and service_role to read
CREATE POLICY authenticated_select ON public.bookings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY service_role_select ON public.bookings
  FOR SELECT TO service_role USING (true);

-- Run this in Supabase Dashboard > SQL Editor

CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  business_name text,
  preferred_date date,
  preferred_time text,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY allow_public_inserts ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY allow_auth_reads ON bookings FOR SELECT USING (true);

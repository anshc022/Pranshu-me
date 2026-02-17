import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvtgvihbewmpubnhjelf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dGd2aWhiZXdtcHVibmhqZWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTM2NTAsImV4cCI6MjA4NjkyOTY1MH0.fsfL85qFG20PMYnteS1eg4tAm9-o6mjIH6owA5enb7w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

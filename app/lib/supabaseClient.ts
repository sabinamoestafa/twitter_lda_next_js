// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://tanhidgryeduezboiixm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhbmhpZGdyeWVkdWV6Ym9paXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NDY2NDEsImV4cCI6MjA1MzEyMjY0MX0.UzZDUy3kkaOO-5H4env1XihOG0cEoqs4ssKzHcr5HIU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

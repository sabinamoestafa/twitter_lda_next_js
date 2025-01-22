// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://riapbavbospmdsbiwnew.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYXBiYXZib3NwbWRzYml3bmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMjQwNzQsImV4cCI6MjA1MjcwMDA3NH0.fqq4DOPwFkSdIGgI-jv_DQLT4MYWe4M6IfwAQSfWpOg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

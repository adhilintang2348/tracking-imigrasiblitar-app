import { createClient } from '@supabase/supabase-js';

// Ganti teks di dalam tanda kutip dengan URL dan Key milik Anda sendiri
const supabaseUrl = 'https://oextkqgwmyenivvwuetx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9leHRrcWd3bXllbml2dnd1ZXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMzk3MjAsImV4cCI6MjA5MjkxNTcyMH0.AlPDeQ0w8-sCONoqDixTN8rI9riAAAHrjpTM68FkBEk';

export const supabase = createClient(supabaseUrl, supabaseKey);
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function addAnalyticsColumns() {
  console.log("--- Attempting to add analytics columns ---");
  const queries = [
    "ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS country TEXT;",
    "ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS city TEXT;",
    "ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS device_type TEXT;",
    "ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS browser TEXT;"
  ];

  for (const query of queries) {
    const { error } = await supabase.rpc('execute_sql', { query_text: query });
    if (error) {
      console.error(`Failed to execute: ${query}`, error.message);
    } else {
      console.log(`[+] Success: ${query}`);
    }
  }
}

addAnalyticsColumns();

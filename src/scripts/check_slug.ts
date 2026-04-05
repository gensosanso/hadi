import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSlug() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, published_at')
    .ilike('title', '%Mpox%');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Articles trouvés avec "Mpox":');
  console.table(data);
}

checkSlug();

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBlogImages() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('title, main_image, specialty_tag')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('--- Blog Posts Data ---');
  console.table(data);
}

checkBlogImages();

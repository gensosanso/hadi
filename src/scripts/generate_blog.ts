import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const geminiKey = process.env.GEMINI_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const TOPICS = [
  "L'impact de l'huile de palme sur l'hypertension à Douala",
  "Comment gérer le paludisme chez l'enfant pendant la saison des pluies",
  "Diabète et plantain : équilibrer son alimentation au Cameroun",
  "Santé mentale : le burn-out chez les travailleurs de l'informel à Akwa",
  "Drépanocytose : les soins spécialisés disponibles à Douala",
  "Typhoïde et hygiène de l'eau : prévenir les risques en zone urbaine",
  "La malnutrition infantile : solutions locales à base de bouillie de maïs",
  "Suivi prénatal : pourquoi choisir une clinique certifiée à Douala ?",
  "Chaleur nocturne et sommeil : conseils pour les zones tropicales",
  "Les bienfaits du manioc fermenté pour le microbiote camerounais"
];

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

async function generateArticle(topic: string, publishInHours: number) {
  console.log(`--- Generating article via Gemini 2.5 Flash for: ${topic} ---`);
  
  const prompt = `
    Tu es un rédacteur médical expert pour SantéDouala.cm, spécialisé dans la santé au Cameroun.
    
    SUJET : ${topic}
    
    CONSIGNES DE CAMEROUNISATION :
    1. Ancrage local : Mentionne obligatoirement des quartiers de Douala (Akwa, Bonapriso, Deïdo, Logpom, Bépanda, etc.).
    2. Alimentation : Cite des aliments locaux (plantain, manioc, ndolè, huile de palme, kossam, safou, etc.).
    3. Économie : Mentionne les coûts en FCFA et la réalité des soins de proximité.
    4. Ton : Bienveillant, informatif, accessible (pas trop clinique).
    5. VISUELS : Inclus dans le 'content' HTML au moins une balise <img> avec une URL de type : https://loremflickr.com/800/450/health,africa,<keyword> où <keyword> est un mot-clé pertinent en anglais. Ajoute une légende sous l'image avec <figcaption>.
    
    STRUCTURE DE SORTIE (JSON UNIQUEMENT) :
    {
      "title": "Titre SEO captivant",
      "excerpt": "Résumé court et percutant pour la liste (150-200 caractères)",
      "content": "Contenu HTML complet (h2, h3, p, strong, ul, li, img, figure, figcaption). Minimum 700 mots.",
      "specialty_tag": "La spécialité médicale la plus proche (ex: Cardiologie, Pédiatrie, Endocrinologie, etc.)",
      "meta_description": "Description optimisée pour Google",
      "image_keyword": "3-4 mots-clés anglais séparés par des virgules pour l'image principale (ex: 'african doctor, hospital, patient')"
    }
    
    Réponds UNIQUEMENT avec le JSON brut.
  `;

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Gemini API Error: ${JSON.stringify(data)}`);
    }

    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const articleData = JSON.parse(text);
    
    const slug = slugify(articleData.title);
    const published_at = new Date();
    published_at.setHours(published_at.getHours() + publishInHours);

    // Use a high-quality Unsplash image based on the keyword
    const main_image = `https://images.unsplash.com/photo-1505751172107-5962200a4883?q=80&w=1000&auto=format&fit=crop`; 
    // On pourra affiner avec l'API Unsplash plus tard, pour l'instant on stocke le mot-clé
    
    const { error } = await supabase
      .from('blog_posts')
      .insert({
        title: articleData.title,
        slug: slug,
        content: articleData.content,
        excerpt: articleData.excerpt,
        specialty_tag: articleData.specialty_tag,
        meta_description: articleData.meta_description,
        main_image: articleData.image_keyword, // On stocke le mot-clé ici temporairement
        published_at: published_at.toISOString()
      });

    if (error) {
      console.error(`Error saving article:`, error.message);
    } else {
      console.log(`[+] Article published: ${articleData.title}`);
    }
  } catch (err) {
    console.error(`Failed to generate article:`, err);
  }
}

async function runBatch(count: number) {
  const shuffled = [...TOPICS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  for (let i = 0; i < selected.length; i++) {
    await generateArticle(selected[i], i * 4);
  }
}

runBatch(5);

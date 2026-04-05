import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const geminiKey = process.env.GEMINI_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateDescription(clinic: any) {
  const prompt = `
    Tu es un expert en santé au Cameroun. Rédige une description professionnelle et rassurante pour l'établissement de santé suivant à Douala.
    
    NOM : ${clinic.nom}
    SPÉCIALITÉS : ${clinic.specialites?.join(', ') || 'Médecine générale'}
    
    CONSIGNES :
    1. Longueur : Environ 100 à 150 mots.
    2. Localisation : Mentionne que c'est un établissement de référence à Douala. Si possible, fais allusion à la proximité pour les résidents du quartier.
    3. Ton : Professionnel, médical, mais accueillant.
    4. Contenu : Parle de l'engagement envers la qualité des soins, l'accueil des patients et l'importance de la santé communautaire.
    5. CAMEROUNISATION : Utilise un vocabulaire adapté (ex: "plateau technique", "prise en charge", "santé de proximité").
    
    Réponds UNIQUEMENT avec le texte de la description.
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
      if (response.status === 429) {
        return "RATE_LIMIT";
      }
      throw new Error(JSON.stringify(data));
    }

    return data.candidates[0].content.parts[0].text.trim();
  } catch (err) {
    console.error(`Failed for ${clinic.nom}:`, err);
    return null;
  }
}

async function enrichAllClinics() {
  const { data: clinics, error } = await supabase
    .from('clinics_enriched')
    .select('*')
    .is('description_custom', null);

  if (error) {
    console.error('Error fetching clinics:', error);
    return;
  }

  console.log(`Found ${clinics.length} clinics to enrich.`);

  for (let i = 0; i < clinics.length; i++) {
    const clinic = clinics[i];
    console.log(`[${i+1}/${clinics.length}] Enriching ${clinic.nom}...`);
    
    let description = await generateDescription(clinic);
    
    if (description === "RATE_LIMIT") {
      console.log("⚠️ Rate limit reached. Waiting 60 seconds...");
      await new Promise(resolve => setTimeout(resolve, 60000));
      i--; // Retry same clinic
      continue;
    }

    if (description) {
      const { error: updateError } = await supabase
        .from('clinics_enriched')
        .update({ description_custom: description })
        .eq('id', clinic.id);

      if (updateError) {
        console.error(`Update failed for ${clinic.nom}:`, updateError.message);
      } else {
        console.log(`[+] Successfully enriched ${clinic.nom}`);
      }
    }
    
    // Safety delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log("✅ All clinics processed!");
}

enrichAllClinics();

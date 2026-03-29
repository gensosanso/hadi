import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function updateQuartiers() {
  console.log('--- Enrichissement des quartiers ---');
  
  const { data: clinics, error } = await supabase
    .from('clinics_enriched')
    .select('id, place_id, nom');

  if (error || !clinics) {
    console.error('Erreur lors de la récupération des cliniques:', error);
    return;
  }

  for (const clinic of clinics) {
    if (!clinic.place_id) continue;

    try {
      const url = `https://places.googleapis.com/v1/places/${clinic.place_id}?fields=addressComponents,formattedAddress&key=${googleApiKey}`;
      const response = await fetch(url);
      const data = await response.json() as any;

      if (response.status !== 200) {
        console.error(`Erreur Place Details pour ${clinic.nom}:`, data);
        continue;
      }

      // Chercher le quartier dans addressComponents
      // Souvent "sublocality" ou "neighborhood"
      let quartier = null;
      const components = data.addressComponents || [];
      
      const sublocality = components.find((c: any) => c.types.includes('sublocality_level_1'));
      const neighborhood = components.find((c: any) => c.types.includes('neighborhood'));
      const locality = components.find((c: any) => c.types.includes('locality'));

      quartier = sublocality?.longText || neighborhood?.longText || locality?.longText || 'Douala';

      const { error: updateError } = await supabase
        .from('clinics_enriched')
        .update({ quartier: quartier })
        .eq('id', clinic.id);

      if (updateError) {
        console.error(`Erreur de mise à jour pour ${clinic.nom}:`, updateError.message);
      } else {
        console.log(`[OK] ${clinic.nom} -> ${quartier}`);
      }

    } catch (err) {
      console.error(`Erreur fatale pour ${clinic.nom}:`, err);
    }

    // Petit délai pour respecter les limites de l'API
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('--- Enrichissement terminé ---');
}

updateQuartiers();

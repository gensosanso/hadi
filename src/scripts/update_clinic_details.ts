import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPlaceDetails(placeId: string) {
  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googleApiKey,
      'X-Goog-FieldMask': 'id,internationalPhoneNumber,rating,userRatingCount'
    }
  });

  if (!response.ok) return null;
  return await response.json();
}

async function updateSafeDetails() {
  const { data: clinics, error } = await supabase
    .from('clinics_enriched')
    .select('id, place_id, nom');

  if (error) return;

  for (const clinic of clinics) {
    if (!clinic.place_id) continue;
    
    console.log(`Updating ${clinic.nom}...`);
    const details = await fetchPlaceDetails(clinic.place_id);
    
    if (details) {
      // Only update columns we ARE SURE exist based on [slug].astro usage
      // [slug].astro uses: rating, user_rating_count
      const { error: updateError } = await supabase
        .from('clinics_enriched')
        .update({
          rating: details.rating,
          user_rating_count: details.userRatingCount,
          // phone_number might not exist yet if migration failed
        })
        .eq('id', clinic.id);

      if (updateError) {
        console.error(`Update failed for ${clinic.nom}:`, updateError.message);
      } else {
        console.log(`[+] Updated: ${clinic.nom}`);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

updateSafeDetails();

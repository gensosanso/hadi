import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

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

async function fetchSpecificPlace(query: string) {
  const url = `https://places.googleapis.com/v1/places:searchText`;
  const body = { textQuery: query };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googleApiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.types,places.formattedAddress,places.addressComponents,places.rating,places.userRatingCount,places.reviews'
    },
    body: JSON.stringify(body)
  });

  const data = (await response.json()) as any;
  return data.places?.[0]; // Get the best match
}

async function addHospital(hospitalName: string) {
  console.log(`🔍 Searching for: ${hospitalName}...`);
  const place = await fetchSpecificPlace(hospitalName);
  
  if (!place) {
    console.error(`❌ Not found: ${hospitalName}`);
    return;
  }

  const name = place.displayName?.text;
  const slug = `${slugify(name)}-${place.id.substring(0, 5)}`;
  
  // 1. Extract Neighborhood
  const components = place.addressComponents || [];
  const sublocality = components.find((c: any) => c.types.includes('sublocality_level_1'));
  const neighborhood = components.find((c: any) => c.types.includes('neighborhood'));
  const locality = components.find((c: any) => c.types.includes('locality'));
  const quartier = sublocality?.longText || neighborhood?.longText || locality?.longText || 'Douala';

  // 2. Insert into clinics_enriched
  const { error: clinicError } = await supabase
    .from('clinics_enriched')
    .upsert({
      place_id: place.id,
      nom: name,
      slug: slug,
      specialites: place.types,
      quartier: quartier,
      rating: place.rating,
      user_rating_count: place.userRatingCount,
      verified: true, // Let's mark major public hospitals as verified
      featured_order: 1, // High priority
      plan: 'free'
    }, { onConflict: 'place_id' });

  if (clinicError) {
    console.error(`❌ Error inserting ${name}:`, clinicError.message);
    return;
  }

  // 3. Import reviews
  const reviews = place.reviews || [];
  let reviewCount = 0;
  for (const r of reviews) {
    const { error: revErr } = await supabase
      .from('reviews')
      .upsert({
        clinic_slug: slug,
        rating: Math.round(r.rating),
        comment: r.text?.text || null,
        author_name: r.authorAttribution?.displayName || 'Anonyme',
        google_review_name: r.name,
        approved: true,
        created_at: r.publishTime
      }, { onConflict: 'google_review_name' });
    if (!revErr) reviewCount++;
  }

  console.log(`✅ ${name} imported! (${quartier}, ${reviewCount} reviews)`);
}

async function main() {
  await addHospital('Hopital Laquintinie Douala');
  await addHospital('Hopital General de Douala');
  await addHospital('Hopital Gynéco-Obstétrique et Pédiatrique de Douala'); // Bonus: HGOPED
  console.log('--- Import Complete ---');
}

main();

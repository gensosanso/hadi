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

async function fetchClinics(pageToken?: string): Promise<{ clinics: any[], next_page_token?: string }> {
  // Correct endpoint is searchText
  const url = `https://places.googleapis.com/v1/places:searchText`;
  
  const body = {
    textQuery: 'clinics in Douala, Cameroon',
    pageToken: pageToken
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googleApiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.types,nextPageToken'
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  if (!text) {
    throw new Error(`Google Places API returned empty response with status ${response.status}`);
  }

  const data = JSON.parse(text);

  if (response.status !== 200) {
    throw new Error(`Google Places API Error: ${response.status} ${JSON.stringify(data)}`);
  }

  return {
    clinics: data.places || [],
    next_page_token: data.nextPageToken
  };
}

async function importAllClinics() {
  console.log('--- Start Import Clinics (New API) ---');
  let count = 0;
  let nextToken: string | undefined = undefined;

  try {
    do {
      const { clinics, next_page_token } = await fetchClinics(nextToken);
      
      for (const clinic of clinics) {
        const name = clinic.displayName?.text || 'Unknown';
        const slug = slugify(name);
        
        const { error } = await supabase
          .from('clinics_enriched')
          .upsert({
            place_id: clinic.id,
            nom: name,
            slug: `${slug}-${clinic.id.substring(0, 5)}`,
            specialites: clinic.types,
          }, { onConflict: 'place_id' });

        if (error) {
          console.error(`Error inserting ${name}:`, error.message);
        } else {
          console.log(`[+] Imported: ${name}`);
          count++;
        }
      }

      nextToken = next_page_token;
      if (nextToken) {
        console.log('--- Fetching next page... ---');
      }
    } while (nextToken);

    console.log(`--- Import Finished! Total imported: ${count} ---`);
  } catch (err) {
    console.error('Fatal Import Error:', err);
  }
}

importAllClinics();

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!;
const googleApiKey = process.env.GOOGLE_PLACES_API_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function importReviews() {
  console.log('--- Import des avis Google Maps ---');
  
  const { data: clinics, error } = await supabase
    .from('clinics_enriched')
    .select('id, place_id, nom, slug');

  if (error || !clinics) {
    console.error('Erreur lors de la récupération des cliniques:', error);
    return;
  }

  for (const clinic of clinics) {
    if (!clinic.place_id) continue;

    try {
      // Use FieldMask for rating and reviews
      const url = `https://places.googleapis.com/v1/places/${clinic.place_id}?fields=rating,userRatingCount,reviews,displayName&key=${googleApiKey}`;
      
      const response = await fetch(url);
      const data = await response.json() as any;

      if (response.status !== 200) {
        console.error(`Erreur pour ${clinic.nom}:`, data);
        continue;
      }

      // 1. Update clinic global rating
      if (data.rating) {
        await supabase
          .from('clinics_enriched')
          .update({ 
            rating: data.rating, 
            user_rating_count: data.userRatingCount 
          })
          .eq('id', clinic.id);
      }

      // 2. Import reviews
      const reviews = data.reviews || [];
      let importedCount = 0;

      for (const r of reviews) {
        // The 'name' field is the unique identifier for a review: places/PLACE_ID/reviews/REVIEW_ID
        const { error: reviewError } = await supabase
          .from('reviews')
          .upsert({
            clinic_slug: clinic.slug,
            rating: Math.round(r.rating),
            comment: r.text?.text || null,
            author_name: r.authorAttribution?.displayName || 'Anonyme',
            google_review_name: r.name,
            approved: true,
            created_at: r.publishTime
          }, { onConflict: 'google_review_name' });

        if (!reviewError) importedCount++;
      }

      console.log(`[OK] ${clinic.nom}: ${importedCount} avis importés (${data.rating}/5)`);

    } catch (err) {
      console.error(`Erreur fatale pour ${clinic.nom}:`, err);
    }

    // Delay to respect quotas
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('--- Import des avis terminé ---');
}

importReviews();

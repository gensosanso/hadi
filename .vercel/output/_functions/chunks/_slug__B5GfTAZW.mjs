import { c as createComponent } from './astro-component_BkKKOIMP.mjs';
import 'piccolore';
import { p as createRenderInstruction, m as maybeRenderHead, h as addAttribute, r as renderTemplate, l as renderComponent, n as defineScriptVars } from './entrypoint_BnBtdJaR.mjs';
import { s as supabase, $ as $$Layout } from './supabase_fOwPouCR.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$PhotoCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PhotoCarousel;
  const { photos, clinicName } = Astro2.props;
  const googleApiKey = "AIzaSyArnNqxHdVexOXBzjVr7-7FV4bz66fnA-8";
  const photoUrls = photos.map(
    (photoName) => `https://places.googleapis.com/v1/${photoName}/media?key=${googleApiKey}&maxHeightPx=800` 
  );
  return renderTemplate`${maybeRenderHead()}<div class="relative group" data-astro-cid-psknqw4m> ${photoUrls.length > 0 ? renderTemplate`<div class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4" data-astro-cid-psknqw4m> ${photoUrls.map((url, index) => renderTemplate`<div class="flex-none w-full md:w-3/4 lg:w-2/3 snap-center" data-astro-cid-psknqw4m> <div class="aspect-video rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm" data-astro-cid-psknqw4m> <img${addAttribute(url, "src")}${addAttribute(`${clinicName} - Photo ${index + 1}`, "alt")} class="w-full h-full object-cover transition duration-500 group-hover:scale-105"${addAttribute(index === 0 ? "eager" : "lazy", "loading")} onerror="this.src='https://loremflickr.com/800/600/hospital,building'" data-astro-cid-psknqw4m> </div> </div>`)} </div>` : renderTemplate`<div class="aspect-video rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 p-8 text-center" data-astro-cid-psknqw4m> <span class="text-4xl mb-2" data-astro-cid-psknqw4m>📸</span> <p class="font-medium" data-astro-cid-psknqw4m>Aucune photo réelle disponible pour le moment.</p> <p class="text-sm" data-astro-cid-psknqw4m>Vous travaillez ici ? Ajoutez des photos sur Google Maps.</p> </div>`} ${photoUrls.length > 1 && renderTemplate`<div class="flex justify-center gap-2 mt-2" data-astro-cid-psknqw4m> ${photoUrls.map((_, i) => renderTemplate`<div class="w-1.5 h-1.5 rounded-full bg-gray-300" data-astro-cid-psknqw4m></div>`)} </div>`} </div>`;
}, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/components/PhotoCarousel.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a, _b;
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: clinic, error } = await supabase.from("clinics_enriched").select("*").eq("slug", slug).single();
  if (error || !clinic) {
    return Astro2.redirect("/404");
  }
  const { data: reviews } = await supabase.from("reviews").select("*").eq("clinic_slug", slug).order("created_at", { ascending: false });
  const formatSpecialties = (types) => {
    if (!types) return [];
    const exclude = ["point_of_interest", "establishment", "health"];
    return types.filter((t) => !exclude.includes(t)).map((t) => t.replace(/_/g, " ").charAt(0).toUpperCase() + t.slice(1).replace(/_/g, " "));
  };
  const specialties = formatSpecialties(clinic.specialites);
  const geo = {
    country: Astro2.request.headers.get("x-vercel-ip-country") || "CM",
    city: Astro2.request.headers.get("x-vercel-ip-city") || "Douala",
    device: Astro2.request.headers.get("user-agent")?.includes("Mobi") ? "Mobile" : "Desktop"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${clinic.nom} - Meilleure clinique à Douala (Santé)`, "description": `Besoin de soins à ${clinic.nom} ? Trouvez l'adresse, les spécialités, les avis et les horaires de cet établissement de santé à Douala.` }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<div class="max-w-5xl mx-auto px-4 py-8"> <nav class="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb"> <ol class="inline-flex items-center space-x-1 md:space-x-3"> <li class="inline-flex items-center"> <a href="/" class="hover:text-blue-600 transition">Accueil</a> </li> <li> <div class="flex items-center"> <span class="mx-2 text-gray-400">/</span> <span class="font-medium text-gray-800">', '</span> </div> </li> </ol> </nav> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Main Content --> <div class="lg:col-span-2 space-y-8"> ', ' <header class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"> <div class="flex flex-col md:flex-row md:items-center justify-between gap-6"> <div> <div class="flex items-center gap-3 mb-2"> <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight"> ', " </h1> ", ' </div> <p class="text-blue-600 font-medium flex items-center gap-2">\n📍 Douala, Cameroun\n</p> ', ' </div> <div class="flex flex-wrap gap-3"> <button id="btn-call" class="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95">\nAppeler\n</button> <a id="btn-route"', ' target="_blank" rel="noopener noreferrer" class="flex-1 md:flex-none px-6 py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition transform active:scale-95 text-center flex items-center justify-center">\nItinéraire\n</a> </div> </div> <div class="mt-8 flex flex-wrap gap-2"> ', ' </div> </header> <section class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"> <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"> <span class="text-blue-600">📍</span> Localisation\n</h2> <div class="rounded-2xl overflow-hidden border border-gray-100 shadow-inner h-[400px] bg-gray-50 relative"> <iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"', `>
            </iframe> </div> <div class="mt-4 p-4 bg-blue-50 rounded-xl flex items-center gap-3 text-blue-800 text-sm italic font-medium"> <span>ℹ️</span> <p>Cliquez sur "Agrandir le plan" pour obtenir l'itinéraire exact depuis votre position.</p> </div> </section> <section class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"> <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"> <span class="text-blue-600">📝</span> À propos
</h2> <div class="prose prose-blue max-w-none text-gray-600 leading-relaxed"> `, ' </div> </section> <!-- Reviews Section --> <section class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"> <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100"> <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3"> <span class="text-amber-400">⭐</span> Avis utilisateurs\n</h2> <div class="text-right"> ', ' <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">', " avis au total</p> </div> </div> ", ' </section> </div> <!-- Sidebar --> <aside class="space-y-8"> <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-8"> <h2 class="text-xl font-bold text-gray-800 mb-6">Informations Utiles</h2> <ul class="space-y-4"> <li class="flex items-start gap-4"> <span class="bg-blue-50 p-2 rounded-lg text-blue-600">⏰</span> <div> <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Horaires</p> <p class="text-gray-700 font-medium italic">Ouvert 24h/24 (Urgence)</p> </div> </li> <li class="flex items-start gap-4"> <span class="bg-green-50 p-2 rounded-lg text-green-600">📞</span> <div> <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Téléphone</p> <p class="text-gray-700 font-medium italic"> ', ' </p> </div> </li> <li class="flex items-start gap-4"> <span class="bg-purple-50 p-2 rounded-lg text-purple-600">⭐</span> <div> <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Note Globale</p> <p class="text-gray-700 font-medium italic"> ', ' </p> </div> </li> </ul> <div class="mt-8 pt-8 border-t border-gray-100"> <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden"> <div class="relative z-10"> <p class="font-bold text-lg mb-2 leading-tight">Vous travaillez chez ', ' ?</p> <p class="text-sm opacity-80 mb-4">Gérez votre profil et améliorez votre visibilité.</p> <button class="w-full py-2 bg-white text-blue-700 rounded-lg font-bold text-sm shadow-xl transform active:scale-95 transition">\nRéclamer la fiche\n</button> </div> <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div> </div> </div> </div> </aside> </div> </div> <script>(function(){', "\n    window.HADI_DATA = { slug, geo };\n  })();</script> ", " "])), maybeRenderHead(), clinic.nom, renderComponent($$result2, "PhotoCarousel", $$PhotoCarousel, { "photos": clinic.google_photos || [], "clinicName": clinic.nom }), clinic.nom, clinic.verified && renderTemplate`<span class="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Vérifié</span>`, clinic.rating && renderTemplate`<div class="mt-2 flex items-center gap-2 text-sm font-bold text-amber-500"> <span class="text-lg">⭐ ${clinic.rating}</span> <span class="text-gray-400 font-normal">(${clinic.user_rating_count} avis Google)</span> </div>`, addAttribute(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.nom)}&destination_place_id=${clinic.place_id}`, "href"), specialties.length > 0 ? specialties.map((spec) => renderTemplate`<span class="bg-blue-50 text-blue-700 text-sm px-4 py-1.5 rounded-full border border-blue-100"> ${spec} </span>`) : renderTemplate`<span class="bg-gray-100 text-gray-600 text-sm px-4 py-1.5 rounded-full">Médecine Générale</span>`, addAttribute(`https://www.google.com/maps/embed/v1/place?key=${"AIzaSyArnNqxHdVexOXBzjVr7-7FV4bz66fnA-8"}&q=place_id:${clinic.place_id}`, "src"), clinic.description_custom ? renderTemplate`<p>${clinic.description_custom}</p>` : renderTemplate`<div class="space-y-4"> <p> <strong>${clinic.nom}</strong> est un établissement de santé de référence situé à Douala, au Cameroun. 
                  Spécialisé notamment en ${specialties.slice(0, 3).join(", ") || "soins généraux"}, cet établissement 
                  s'engage à fournir des prestations médicales de qualité aux résidents de Douala et ses environs.
</p> <p>
L'équipe médicale de <strong>${clinic.nom}</strong> met tout en œuvre pour assurer une prise en charge 
                  optimale des patients dans un environnement professionnel et bienveillant. Pour toute demande spécifique 
                  ou prise de rendez-vous, nous vous recommandons de contacter directement l'établissement.
</p> </div>`, clinic.rating && renderTemplate`<p class="text-2xl font-extrabold text-gray-900 leading-none">${clinic.rating}/5</p>`, clinic.user_rating_count || 0, reviews && reviews.length > 0 ? renderTemplate`<div class="space-y-6"> ${reviews.map((review) => renderTemplate`<div class="bg-gray-50 rounded-2xl p-6 border border-gray-100"> <div class="flex items-center justify-between mb-3"> <p class="font-bold text-gray-900">${review.author_name}</p> <div class="flex items-center gap-1 text-amber-400"> ${[...Array(5)].map((_, i) => renderTemplate`<span${addAttribute(i < review.rating ? "opacity-100" : "opacity-20 text-gray-400", "class")}>★</span>`)} </div> </div> <p class="text-gray-600 leading-relaxed italic"> ${review.comment || "Cet utilisateur n'a pas laissé de commentaire écrit."} </p> <p class="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">
Posté le ${new Date(review.created_at || "").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} </p> </div>`)} </div>` : renderTemplate`<div class="text-center py-12 border border-dashed border-gray-200 rounded-3xl"> <p class="text-gray-500 italic">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</p> <button class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Donner mon avis</button> </div>`, clinic.phone_number || "Non communiqué", clinic.rating ? `${clinic.rating}/5` : "Pas encore de note", clinic.nom, defineScriptVars({ slug, geo }), renderScript($$result2, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/clinique/[slug].astro?astro&type=script&index=0&lang.ts")), "head": async ($$result2) => renderTemplate(_b || (_b = __template(['<script type="application/ld+json">(function(){', '\n    {\n      "@context": "https://schema.org",\n      "@type": "MedicalClinic",\n      "name": clinic.nom,\n      "description": clinic.description_custom || `${clinic.nom} est un établissement de santé de référence à Douala.`,\n      "address": {\n        "@type": "PostalAddress",\n        "addressLocality": "Douala",\n        "addressCountry": "CM"\n      },\n      "url": `https://hadi.cm/clinique/${clinic.slug}`,\n      "medicalSpecialty": specialties,\n      ...(clinic.rating && {\n        "aggregateRating": {\n          "@type": "AggregateRating",\n          "ratingValue": clinic.rating,\n          "reviewCount": clinic.user_rating_count || 1\n        }\n      })\n    }\n  })();</script>'], ['<script type="application/ld+json">(function(){', '\n    {\n      "@context": "https://schema.org",\n      "@type": "MedicalClinic",\n      "name": clinic.nom,\n      "description": clinic.description_custom || \\`\\${clinic.nom} est un établissement de santé de référence à Douala.\\`,\n      "address": {\n        "@type": "PostalAddress",\n        "addressLocality": "Douala",\n        "addressCountry": "CM"\n      },\n      "url": \\`https://hadi.cm/clinique/\\${clinic.slug}\\`,\n      "medicalSpecialty": specialties,\n      ...(clinic.rating && {\n        "aggregateRating": {\n          "@type": "AggregateRating",\n          "ratingValue": clinic.rating,\n          "reviewCount": clinic.user_rating_count || 1\n        }\n      })\n    }\n  })();</script>'])), defineScriptVars({ clinic, specialties })) })}`;
}, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/clinique/[slug].astro", void 0);
const $$file = "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/clinique/[slug].astro";
const $$url = "/clinique/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

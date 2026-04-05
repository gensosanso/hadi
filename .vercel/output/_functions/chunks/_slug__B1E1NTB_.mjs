import { c as createComponent } from './astro-component_BkKKOIMP.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, r as renderTemplate, l as renderComponent, n as defineScriptVars, o as Fragment, u as unescapeHTML } from './entrypoint_BnBtdJaR.mjs';
import { s as supabase, $ as $$Layout } from './supabase_fOwPouCR.mjs';
import 'clsx';

const $$RelatedClinics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$RelatedClinics;
  const { specialtyTag } = Astro2.props;
  const { data: clinics } = await supabase.from("clinics_enriched").select("nom, slug, rating, google_photos, quartier").order("rating", { ascending: false }).limit(3);
  const googleApiKey = "AIzaSyArnNqxHdVexOXBzjVr7-7FV4bz66fnA-8";
  return renderTemplate`${clinics && clinics.length > 0 && renderTemplate`${maybeRenderHead()}<section class="mt-20 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl"><div class="relative z-10"><div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-8 border-b border-white/10"><div class="max-w-xl"><span class="inline-block bg-blue-400/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-white/20">
Besoin d'un avis médical ?
</span><h2 class="text-3xl md:text-4xl font-black tracking-tight leading-tight">
Trouvez un spécialiste en ${specialtyTag} près de chez vous à Douala.
</h2></div><a href="/cliniques" class="px-8 py-4 bg-white text-blue-700 rounded-2xl font-black text-sm hover:bg-blue-50 transition transform active:scale-95 shadow-xl whitespace-nowrap">
Voir tout l'annuaire →
</a></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8">${clinics.map((clinic) => renderTemplate`<a${addAttribute(`/clinique/${clinic.slug}`, "href")} class="group bg-white/10 backdrop-blur-lg rounded-[2rem] overflow-hidden border border-white/10 hover:bg-white/20 transition-all duration-500 shadow-lg flex flex-col"><div class="aspect-video bg-white/5 overflow-hidden relative">${clinic.google_photos && clinic.google_photos.length > 0 ? renderTemplate`<img${addAttribute(`https://places.googleapis.com/v1/${clinic.google_photos[0]}/media?key=${googleApiKey}&maxHeightPx=400`, "src")}${addAttribute(clinic.nom, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100">` : renderTemplate`<div class="w-full h-full flex items-center justify-center text-4xl">🏥</div>`}<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div></div><div class="p-6 flex flex-col flex-1"><h3 class="font-black text-lg mb-2 group-hover:text-blue-300 transition truncate">${clinic.nom}</h3><div class="flex items-center justify-between text-sm mt-auto"><span class="flex items-center gap-2 font-bold opacity-80 uppercase tracking-widest text-[10px]">
📍 ${clinic.quartier || "Douala"}</span>${clinic.rating && renderTemplate`<span class="bg-amber-400 text-amber-950 px-3 py-1 rounded-full font-black text-[10px] flex items-center gap-1 shadow-lg">
⭐ ${clinic.rating}</span>`}</div></div></a>`)}</div></div><div class="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div><div class="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div></section>`}`;
}, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/components/RelatedClinics.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let post = null;
  try {
    const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
    if (error || !data) throw new Error("Post not found");
    post = data;
  } catch (err) {
    console.error("Error fetching post:", err);
    return Astro2.redirect("/404");
  }
  const imagePool = [
    "1505751172107-5962200a4883",
    "1512678080530-7760d81faba6",
    "1519494026892-80bbd2d6fd0d",
    "1538108149393-fdfd8169446d",
    "1551076805-e1869033e561",
    "1576091160550-2173bdd99611",
    "1584622650111-993a426fbf0a",
    "1502740479734-55023fe73c5b",
    "1526256262350-7da7584cf5eb",
    "1551601651-2a8555f1a136"
  ];
  function getImageUrl(id, width = 1200) {
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % imagePool.length;
    const photoId = imagePool[index];
    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.title.substring(0, 50)} | Blog Santé Douala`, "description": post.meta_description?.substring(0, 155) || post.excerpt?.substring(0, 155) }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<article class="max-w-4xl mx-auto px-4 py-12"> <!-- Breadcrumb --> <nav class="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb"> <ol class="inline-flex items-center space-x-1 md:space-x-3"> <li class="inline-flex items-center"> <a href="/" class="hover:text-blue-600 transition">Accueil</a> </li> <li> <div class="flex items-center"> <span class="mx-2 text-gray-400">/</span> <a href="/blog" class="hover:text-blue-600 transition">Blog</a> </div> </li> <li> <div class="flex items-center"> <span class="mx-2 text-gray-400">/</span> <span class="font-medium text-gray-800 line-clamp-1">${post.title}</span> </div> </li> </ol> </nav> <header class="mb-12"> <div class="aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-8 relative group shadow-2xl bg-gray-100"> <img${addAttribute(post.main_image.startsWith("http") ? post.main_image : getImageUrl(post.id, 1200), "src")}${addAttribute(post.title, "alt")} class="w-full h-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://loremflickr.com/1200/600/medical,africa';"> <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div> <div class="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10"> <div class="flex items-center gap-3 mb-4"> <span class="bg-blue-600 text-white text-[10px] md:text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-lg"> ${post.specialty_tag || "Santé"} </span> <span class="w-1.5 h-1.5 rounded-full bg-white/50"></span> <time class="text-xs md:text-sm font-bold text-gray-200 uppercase tracking-widest drop-shadow-md"> ${new Date(post.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} </time> </div> <h1 class="text-2xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-2xl max-w-4xl"> ${post.title} </h1> </div> </div> <div class="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-l-8 border-blue-600 italic text-gray-700 text-lg shadow-sm"> <span class="text-4xl text-blue-200 font-serif leading-none h-4 block mb-2">"</span> ${post.excerpt} </div> </header> <div class="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed 
                prose-headings:text-gray-900 prose-headings:font-extrabold 
                prose-p:mb-6 prose-ul:mb-6 prose-li:mb-2 prose-strong:text-blue-700"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(post.content)}` })} </div> <!-- Recommendations Synergy --> ${renderComponent($$result2, "RelatedClinics", $$RelatedClinics, { "specialtyTag": post.specialty_tag })} <footer class="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6"> <div class="flex items-center gap-3"> <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">✍️</div> <div> <p class="font-bold text-gray-900 leading-none">Rédaction SantéDouala</p> <p class="text-sm text-gray-500 mt-1">Écrit par nos experts médicaux locaux</p> </div> </div> <div class="flex gap-4"> <button class="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
Partager l'article
</button> </div> </footer> </article> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">(function(){', '\n    {\n      "@context": "https://schema.org",\n      "@type": "BlogPosting",\n      "headline": post.title,\n      "description": post.excerpt,\n      "image": post.main_image,\n      "datePublished": post.published_at,\n      "author": {\n        "@type": "Organization",\n        "name": "Rédaction SantéDouala"\n      },\n      "publisher": {\n        "@type": "Organization",\n        "name": "Hadi",\n        "logo": {\n          "@type": "ImageObject",\n          "url": "https://hadi.cm/favicon.svg"\n        }\n      },\n      "mainEntityOfPage": {\n        "@type": "WebPage",\n        "@id": `https://hadi.cm/blog/${post.slug}`\n      }\n    }\n  })();<\/script>'], ['<script type="application/ld+json">(function(){', '\n    {\n      "@context": "https://schema.org",\n      "@type": "BlogPosting",\n      "headline": post.title,\n      "description": post.excerpt,\n      "image": post.main_image,\n      "datePublished": post.published_at,\n      "author": {\n        "@type": "Organization",\n        "name": "Rédaction SantéDouala"\n      },\n      "publisher": {\n        "@type": "Organization",\n        "name": "Hadi",\n        "logo": {\n          "@type": "ImageObject",\n          "url": "https://hadi.cm/favicon.svg"\n        }\n      },\n      "mainEntityOfPage": {\n        "@type": "WebPage",\n        "@id": \\`https://hadi.cm/blog/\\${post.slug}\\`\n      }\n    }\n  })();<\/script>'])), defineScriptVars({ post })) })}`;
}, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/blog/[slug].astro", void 0);

const $$file = "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

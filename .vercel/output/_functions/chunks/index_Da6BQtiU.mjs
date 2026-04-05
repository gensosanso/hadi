import { c as createComponent } from './astro-component_BkKKOIMP.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BnBtdJaR.mjs';
import { s as supabase, $ as $$Layout } from './supabase_fOwPouCR.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let posts = [];
  try {
    const { data, error } = await supabase.from("blog_posts").select("*").lte("published_at", (/* @__PURE__ */ new Date()).toISOString()).order("published_at", { ascending: false });
    if (error) throw error;
    posts = data || [];
  } catch (err) {
    console.error("Error fetching posts:", err);
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
  function getImageUrl(id, width = 800) {
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % imagePool.length;
    const photoId = imagePool[index];
    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog Santé Douala - Conseils & Tendances Locales", "description": "Découvrez nos articles de santé adaptés au contexte camerounais : nutrition, prévention et conseils d'experts à Douala." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-6xl mx-auto px-4 py-12"> <header class="text-center mb-16"> <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
Le Blog <span class="text-blue-600">Santé Douala</span> </h1> <p class="text-lg text-gray-600 max-w-2xl mx-auto">
Des conseils médicaux experts, ancrés dans la réalité de Douala et du Cameroun. 
        Pour une santé mieux comprise, au quotidien.
</p> </header> ${posts && posts.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${posts.map((post) => renderTemplate`<article class="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"> <div class="aspect-video bg-gray-100 relative overflow-hidden"> <img${addAttribute(post.main_image.startsWith("http") ? post.main_image : getImageUrl(post.id, 800), "src")}${addAttribute(post.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" crossorigin="anonymous" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://loremflickr.com/800/600/medical,hospital';"> <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div> <span class="absolute top-4 left-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider z-10 shadow-lg"> ${post.specialty_tag || "Santé"} </span> </div> <div class="p-8 flex flex-col flex-1"> <div class="flex items-center gap-2 mb-3"> <time class="text-[10px] font-bold text-blue-500 uppercase tracking-widest"> ${new Date(post.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })} </time> </div> <h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition leading-tight"> <a${addAttribute(`/blog/${post.slug}`, "href")}>${post.title}</a> </h2> <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 italic"> ${post.excerpt} </p> <div class="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between"> <div class="flex items-center gap-2"> <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px]">🩺</div> <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SantéDouala</span> </div> <a${addAttribute(`/blog/${post.slug}`, "href")} class="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
Lire l'article <span>→</span> </a> </div> </div> </article>`)} </div>` : renderTemplate`<div class="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200"> <p class="text-gray-500 italic">Nos rédacteurs préparent de nouveaux articles. Revenez très bientôt !</p> </div>`} </main> ` })}`;
}, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/blog/index.astro", void 0);

const $$file = "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

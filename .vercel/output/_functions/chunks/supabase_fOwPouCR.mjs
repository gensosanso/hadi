import { c as createComponent } from './astro-component_BkKKOIMP.mjs';
import 'piccolore';
import { h as addAttribute, q as renderSlot, v as renderHead, r as renderTemplate } from './entrypoint_BnBtdJaR.mjs';
import 'clsx';
import { createClient } from '@supabase/supabase-js';

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Hadi (CliniqDouala) - Annuaire des cliniques et hôpitaux de Douala." } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="google-site-verification" content="sCysWWnI5zEJRrXpK5ij1NFGuMVSeyTp1LI2wFNxUVI"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | Hadi</title><meta name="description"${addAttribute(description, "content")}>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col"> <header class="bg-white shadow-sm border-b border-gray-200"> <nav class="container mx-auto px-4 py-4 flex justify-between items-center"> <a href="/" class="text-2xl font-bold text-blue-600 flex items-center gap-2"> <span class="text-3xl">🏥</span> Hadi
</a> <div class="hidden md:flex gap-6 items-center"> <a href="/" class="hover:text-blue-600 transition">Accueil</a> <a href="/quartiers" class="hover:text-blue-600 transition">Quartiers</a> <a href="/blog" class="hover:text-blue-600 transition font-medium text-blue-600 underline decoration-2 underline-offset-4">Blog</a> <a href="/contact" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Contact</a> </div> </nav> </header> <main class="flex-grow container mx-auto px-4 py-8"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-white border-t border-gray-200 py-8 mt-12"> <div class="container mx-auto px-4 text-center text-gray-600"> <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Hadi - Annuaire Digital des Cliniques de Douala.</p> <p class="mt-2 text-sm italic text-gray-400">Améliorer l'accès aux soins de santé à Douala.</p> </div> </footer> </body></html>`;
}, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/layouts/Layout.astro", void 0);

const supabaseUrl = "https://cjwjwytfbxoeigtzmyfs.supabase.co";
const supabaseAnonKey = "sb_publishable_2TH_GDpsO058ZOFynrRItg_QVQZCjoj";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export { $$Layout as $, supabase as s };

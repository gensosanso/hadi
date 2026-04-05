import { c as createComponent } from './astro-component_BkKKOIMP.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BnBtdJaR.mjs';
import { s as supabase, $ as $$Layout } from './supabase_fOwPouCR.mjs';

const prerender = false;
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const { data: events } = await supabase.from("analytics_events").select("*").order("created_at", { ascending: false });
  const stats = {
    totalViews: events?.filter((e) => e.event_type === "view").length || 0,
    totalCalls: events?.filter((e) => e.event_type === "call_click").length || 0,
    totalRoutes: events?.filter((e) => e.event_type === "route_click").length || 0
  };
  const cityCounts = events?.reduce((acc, e) => {
    const city = e.city || "Douala";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const topCities = Object.entries(cityCounts || {}).sort(([, a], [, b]) => b - a).slice(0, 5);
  const clinicCounts = events?.filter((e) => e.clinic_slug !== "global").reduce((acc, e) => {
    acc[e.clinic_slug] = (acc[e.clinic_slug] || 0) + 1;
    return acc;
  }, {});
  const topClinics = Object.entries(clinicCounts || {}).sort(([, a], [, b]) => b - a).slice(0, 5);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard Analytics - HADI Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto px-4 py-12"> <header class="mb-12"> <h1 class="text-3xl font-black text-gray-900">Tableau de Bord <span class="text-blue-600">Analytics</span></h1> <p class="text-gray-500">Suivez les performances de l'annuaire en temps réel.</p> </header> <!-- Key Metrics --> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"> <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"> <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Visites Totales</p> <p class="text-4xl font-black text-blue-600">${stats.totalViews}</p> <div class="mt-4 h-2 bg-blue-50 rounded-full overflow-hidden"> <div class="h-full bg-blue-600 w-full"></div> </div> </div> <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"> <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Appels Générés</p> <p class="text-4xl font-black text-green-600">${stats.totalCalls}</p> <div class="mt-4 h-2 bg-green-50 rounded-full overflow-hidden"> <div class="h-full bg-green-600"${addAttribute(`width: ${stats.totalCalls / stats.totalViews * 100 || 0}%`, "style")}></div> </div> </div> <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"> <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Demandes Itinéraire</p> <p class="text-4xl font-black text-purple-600">${stats.totalRoutes}</p> <div class="mt-4 h-2 bg-purple-50 rounded-full overflow-hidden"> <div class="h-full bg-purple-600"${addAttribute(`width: ${stats.totalRoutes / stats.totalViews * 100 || 0}%`, "style")}></div> </div> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-12"> <!-- Top Geographical --> <section class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"> <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
🌍 Top Villes
</h2> <div class="space-y-6"> ${topCities.map(([city, count]) => renderTemplate`<div> <div class="flex justify-between text-sm font-bold mb-2"> <span>${city}</span> <span class="text-blue-600">${count} visites</span> </div> <div class="h-3 bg-gray-50 rounded-full overflow-hidden"> <div class="h-full bg-blue-400 rounded-full"${addAttribute(`width: ${count / stats.totalViews * 100 || 0}%`, "style")}></div> </div> </div>`)} </div> </section> <!-- Top Clinics --> <section class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"> <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
🏥 Cliniques les plus vues
</h2> <div class="space-y-4"> ${topClinics.map(([slug, count]) => renderTemplate`<div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition group"> <span class="font-bold text-gray-700 group-hover:text-blue-700 truncate capitalize">${slug.replace(/-/g, " ")}</span> <span class="bg-white px-3 py-1 rounded-full text-xs font-black text-blue-600 shadow-sm">${count}</span> </div>`)} </div> </section> </div> <!-- Recent Logs --> <section class="mt-12 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"> <div class="p-8 border-b border-gray-50"> <h2 class="text-xl font-bold text-gray-800">Journal des évènements récents</h2> </div> <div class="overflow-x-auto"> <table class="w-full text-left"> <thead class="bg-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest"> <tr> <th class="px-8 py-4">Heure</th> <th class="px-8 py-4">Action</th> <th class="px-8 py-4">Page / Clinique</th> <th class="px-8 py-4">Ville</th> <th class="px-8 py-4">Appareil</th> </tr> </thead> <tbody class="divide-y divide-gray-50"> ${events?.slice(0, 10).map((event) => renderTemplate`<tr class="hover:bg-blue-50/30 transition"> <td class="px-8 py-4 text-xs text-gray-500"> ${new Date(event.created_at).toLocaleTimeString("fr-FR")} </td> <td class="px-8 py-4"> <span${addAttribute(`text-[10px] font-black uppercase px-2 py-1 rounded-full ${event.event_type === "view" ? "bg-blue-100 text-blue-700" : event.event_type === "call_click" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`, "class")}> ${event.event_type} </span> </td> <td class="px-8 py-4 font-bold text-sm text-gray-700 truncate max-w-[200px]"> ${event.clinic_slug} </td> <td class="px-8 py-4 text-sm text-gray-500 italic"> ${event.city || "Douala"} </td> <td class="px-8 py-4 text-sm text-gray-500"> ${event.device_type || "Desktop"} </td> </tr>`)} </tbody> </table> </div> </section> </div> ` })}`;
}, "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/admin/analytics.astro", void 0);

const $$file = "E:/HADI(HOSPITAL AGENCY FOR DIGTAL INTEGRATION)/HADI/src/pages/admin/analytics.astro";
const $$url = "/admin/analytics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

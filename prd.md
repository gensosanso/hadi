# Product Requirements Document (PRD) - Hadi (CliniqDouala)

## 1. Vision et Objectifs Strategiques
**Nom du Projet :** Hadi (CliniqDouala)
**Slogan :** Annuaire Digital des Cliniques et Hopitaux de Douala

### 1.1 Problématique
La recherche d'établissements de santé à Douala est difficile, reposant souvent sur le bouche-à-oreille ou des informations obsolètes. Les cliniques n'ont pas d'outil centralisé pour leur visibilité.

### 1.2 Vision du Produit
Une plateforme de directory médical en **programmatic SEO** construite avec **Astro 5**. Elle génère des pages statiques pour chaque établissement via l'API Google Places et Supabase.

### 1.3 Objectifs
- Devenir la référence #1 sur Google pour les recherches médicales à Douala.
- Générer un flux qualifié pour les établissements.
- Monétiser via des forfaits publicitaires (profils premium, bannières).
- Atteindre l'autofinancement en moins de 12 mois.

---

## 2. Spécifications Fonctionnelles

### 2.1 Module Annuaire (Directory)
- **Page d'accueil :** Recherche par nom/spécialité, filtres par quartier, mise en avant premium, carte interactive Google Maps.
- **Page de liste filtrée :** URLs sémantiques (/cliniques/akwa), pages statiques indexables, tri par pertinence/note/distance.
- **Fiche établissement :** Infos Google Places, bouton 'Copier le numéro' (tracké), itinéraire, avis utilisateurs, badge 'Vérifié' pour les payants.

### 2.2 Module SEO Programmatic
- Sitemap auto-généré, robots.txt optimisé, balises meta uniques, Open Graph, images WebP.

### 2.3 Module Analytique Marketing
- Tracking des interactions en temps réel dans Supabase.
- **Dashboard Admin :** Pages vues, clics totaux, taux de contact, classement des établissements, export CSV.

### 2.4 Module Publicitaire (Monétisation)
- Niveaux de visibilité : Free, Standard, Premium, Sponsor.
- Formats : Fiches mises en avant, bannières de spécialité, encarts accueil, pop-ins.

---

## 3. Spécifications Techniques

### 3.1 Stack Technique
- **Frontend :** Astro 5 (Programmatic SEO)
- **Backend/Database :** Supabase (PostgreSQL, Auth)
- **Cartographie :** Google Maps API
- **Données :** Google Places API (Enrichies dans Supabase)

### 3.2 Schéma de Base de Données (Supabase)
- `clinics_enriched` : Infos établissements, plan de visibilité.
- `analytics_events` : Logs des interactions (clics, vues).
- `reviews` : Avis clients modérables.

---

## 4. Stratégie Marketing & Monétisation
- **Acquisition Patients :** SEO (Long tail keywords), Réseaux sociaux, Influenceurs santé.
- **Acquisition Cliniques :** Offre gratuite (3 mois) pour preuve de concept, rapports PDF mensuels automatisés.
- **KPIs :** Trafic organique, nombre d'établissements indexés, taux de conversion publicitaire.

---

## 5. Critères d'Acceptation (V1.0)
- Score Lighthouse Performance >= 95.
- Build complet (< 3 min sur Vercel).
- Dashboard admin protégé.
- 150+ établissements indexés.
- Génération de rapports PDF fonctionnelle.

---

## 6. Hors Périmètre (V1.0)
- Application mobile native.
- Prise de rendez-vous en ligne.
- Extension hors Douala.
- Comparaison de tarifs.

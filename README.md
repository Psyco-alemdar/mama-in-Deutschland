# Mama in Deutschland

Plateforme d’organisation de la grossesse et des premiers mois en Allemagne.

- Accueil public : `index.html` (fr), `index-de.html`, `index-en.html`, `index-ar.html`.
- Authentification : `account.html` ; création : `account.html?mode=signup`.
- Tableau de bord personnel : `app.html`.
- Visite interactive sans compte : `demo.html`.
- Catalogue : `discover.html` ; offre : `pricing.html` ; FAQ : `faq.html` ; organismes : `resources.html`.

Site HTML/CSS/JS statique, GitHub Pages et Supabase. Conserver le sous-répertoire `/mama-in-Deutschland/` dans les URLs de récupération et de confirmation.

Vérification : `python scripts/check-release.py` puis `node scripts/test-account.cjs`.

Lire [RELEASE-READINESS.md](RELEASE-READINESS.md) avant une ouverture commerciale. Cette livraison n’active aucun abonnement payant et ne prétend pas achever les obligations légales ni la traduction de toutes les pages existantes.

# Mama in Deutschland — préparation commerciale, 10 septembre 2026

Cette livraison améliore le site existant. Elle ne constitue pas une certification de mise en production médicale, juridique ou commerciale et n’active aucune facturation.

## Livré

- Accueil public, découverte recherchable, présentation de l’offre, FAQ et ressources officielles en FR/DE/EN/AR : 20 pages publiques localisées.
- Démonstration en français : checklist interactive et budget, sans connexion ni stockage de données personnelles.
- Connexion conservée dans account.html ; anciennes URLs de confirmation reçues sur index.html transférées vers le compte.
- Correction des liens de connexion et de récupération de mot de passe ; aliases pour 9 anciennes variantes d’URL ; page 404.
- Validation du résultat de l’inscription : pas de fausse redirection sans session, pas de masquage d’un échec d’enregistrement du profil, protection contre la double soumission.
- Marketplace : ajout de user_id obligatoire, échappement des URLs de contact, vérification des erreurs de suppression et de signalement avant d’annoncer un succès.
- Palette beige/brun, illustration éditoriale originale, navigation responsive, repères de focus, mode RTL, réduction des animations.
- SDK Supabase figé à la version 2.116.0, vérifiée sur le CDN le 10 septembre 2026.
- Balises de langue, descriptions, canonical/hreflang et sitemap XML publics ; noindex sur les pages de compte existantes.

## Vérifications effectuées

- `python scripts/check-release.py` : 71 documents HTML, 944 liens locaux et 42 scripts, zéro erreur.
- `node scripts/test-account.cjs` : confirmation sans session, erreur de profil et succès d’inscription ; redirection de récupération conservant le sous-répertoire.
- Liens externes officiels ouverts : Familienportal, Familienkasse, ElterngeldDigital, familienplanung.de, kindergesundheit-info.de, 116117.
- Inspection Supabase : aucune table publique sans RLS ; profiles/pregnancy_profiles ont des politiques de propriétaire.
- SQL de durcissement appliqué et contrôlé : fonctions trigger non exécutables par les clients ; RPC likes inaccessible aux visiteurs non connectés ; insertion des messages de contact limitée au propriétaire ; search_path des deux fonctions corrigé. Script conservé dans database/release-hardening.sql.
- Aucun compte réel créé pour les tests ; aucun e-mail envoyé ; aucune donnée personnelle supprimée.
- Pas de test navigateur ni de test de bout en bout d’un compte réel effectué. Les tests de parcours d’inscription utilisent un client simulé.

## À terminer avant d’annoncer une version commerciale finale

1. **Exploitant et mentions légales** : nom ou raison sociale, statut, adresse professionnelle publiable, e-mail de contact, et références professionnelles/registre/TVA si applicables. Ne pas transformer automatiquement une adresse personnelle connue en adresse commerciale publique. Référence : https://www.gesetze-im-internet.de/ddg/__5.html
2. **Confidentialité et données de santé** : fixer les finalités, bases juridiques, traitement des données de grossesse/bébé, consentements applicables, durées de conservation, sous-traitants, modalités de suppression/export et contact du responsable. Valider la politique avant de la présenter comme définitive. Les pages existantes peuvent conserver des informations sur l’appareil et dans Supabase ; ne pas promettre une suppression automatique actuellement absente.
3. **E-mails** : le réglage public vérifié est `mailer_autoconfirm=true`, les inscriptions sont ouvertes. Aucun contrôle d’adresse à l’inscription actuellement. SMTP personnalisé et URL autorisées non inspectables par les outils connectés utilisés ; livraison réelle des confirmations/récupérations non testée. Ne pas désactiver les protections pour compenser un problème d’e-mail. Documentation : https://supabase.com/docs/guides/auth/auth-smtp
4. **Paiement** : aucun checkout, webhook ni portail de facturation actif. La page présente honnêtement l’accès actuel gratuit et Mama Plus en préparation. Pour vendre : arrêter les fonctionnalités réellement réservées à Plus, le prix, les conditions et le prestataire, puis implémenter et tester la facturation et les droits côté serveur.
5. **Langues** : les pages de présentation sont traduites en quatre langues ; le tableau de bord et les outils existants ne sont pas intégralement traduits. TR/RU/UK restent partiels. Ne pas annoncer sept langues complètes.
6. **Relecture médicale et administrative** : les contenus existants n’ont pas tous été revalidés à jour dans cette livraison. Une validation éditoriale intégrale et les tests utilisateurs sont nécessaires avant un lancement large.
7. **Modération** : des politiques anciennes se superposent sur les tables communautaires et marketplace. Examiner en particulier la cohérence user_id/seller_id et le maintien d’une décision de masquage après édition par l’auteur. Le compteur de likes existant reste cumulatif, sans unicité par personne. Ces points restent ouverts ; ne pas présenter la modération comme auditée de bout en bout.
8. **Avis de sécurité restants** : is_admin est une fonction privilégiée limitée au rôle de l’appelant mais encore exécutable par anon ; RPC likes privilégiée pour authenticated ; protection contre mots de passe compromis désactivée ; pregnancy_memories protégée par RLS sans politique (accès fermé). Référence aux avis : https://supabase.com/docs/guides/database/database-linter

## Exploitation

Les fichiers existants restent sur GitHub Pages avec leur base Supabase. Aucun nouvel hébergement, achat, abonnement ou traitement publicitaire n’a été créé. L’image publique est hébergée dans le dépôt, sans requête à un fournisseur d’images au chargement. Le générateur public est `scripts/build-public.py` ; vérifier les liens après toute régénération.

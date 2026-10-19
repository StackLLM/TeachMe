# UX — Plateforme e-learning Maroc

| | |
|---|---|
| **Statut** | Phase 0 — spécification de l'expérience cible (aucune refonte complète engagée) |
| **Périmètre** | primaire 1AP–6AP ; parcours élève et parent ; back-office auteur/admin |
| **Version** | 0.1 — 18 octobre 2026 |
| **Référence technique** | [`Plan.md`](./Plan.md) — architecture, modèle de données, lots |
| **Principe** | aucune fonctionnalité UX sans besoin identifié ni support dans le modèle de données |

> `UX.md` décrit **page par page** et **interaction par interaction** l'expérience cible. Les identifiants `U-xx` sont utilisés dans les tickets et les critères d'acceptation. Les entités et endpoints cités renvoient au §12 et au §11 de `Plan.md`.

## Sommaire

- [A. Principes UX et direction artistique](#ux-a)
  - [A1. Identité et ton](#ux-a1)
  - [A2. Architecture de l'information](#ux-a2)
  - [A3. Gabarits et responsive](#ux-a3)
  - [A4. Mouvement et feedback](#ux-a4)
  - [A5. États](#ux-a5)
  - [A6. Accessibilité](#ux-a6)
  - [A7. Langues et RTL](#ux-a7)
  - [A8. Voix et microcopie](#ux-a8)
- [B. Parcours utilisateurs](#ux-b)
  - [B1. Personas](#ux-b1)
  - [B2. Parcours essentiels](#ux-b2)
  - [B3. Droits et interactions entre rôles](#ux-b3)
  - [B4. Cas limites](#ux-b4)
- [C. Description détaillée des pages](#ux-c)
  - [U-01 — Accueil public](#u-01)
  - [U-02 — Connexion](#u-02)
  - [U-03 — Inscription](#u-03)
  - [U-04 — Choix du niveau](#u-04)
  - [U-05 — Accueil élève](#u-05)
  - [U-06 — Catalogue des matières](#u-06)
  - [U-07 — Détail d'une matière](#u-07)
  - [U-08 — Chapitre](#u-08)
  - [U-09 — Leçon](#u-09)
  - [U-10 — Exercice](#u-10)
  - [U-11 — Résultat d'exercice](#u-11)
  - [U-12 — Évaluation](#u-12)
  - [U-13 — Résultat d'évaluation](#u-13)
  - [U-14 — Progrès élève](#u-14)
  - [U-15 — Révision](#u-15)
  - [U-16 — Espace parent](#u-16)
  - [U-17 — Détail enfant (parent)](#u-17)
  - [U-18 — Notifications](#u-18)
  - [U-19 — Profil et réglages](#u-19)
  - [U-20 — Admin référentiel](#u-20)
  - [U-21 — Admin contenu](#u-21)
  - [U-22 — Admin révision et publication](#u-22)
  - [U-23 — Recherche](#u-23)
  - [U-24 — Erreurs, 404, hors-ligne](#u-24)
  - [U-25 — Admin utilisateurs, rôles et qualité](#u-25)
- [D. Expérience pédagogique](#ux-d)
- [E. Cohérence UX / architecture](#ux-e)
- [Annexe A — Design tokens et composants](#ux-annexe-a)
- [Annexe B — Checklist de validation UX](#ux-annexe-b)

---

<a id="ux-a"></a>
## A. Principes UX et direction artistique

### <a id="ux-a1"></a>A1. Identité et ton

**Nom de travail** : eLarium. **À valider** avant la production graphique définitive.

**Direction artistique** : conserver l'ADN du prototype (menthe pâle, corail, sarcelle, pêche, cartes arrondies, ombres douces), mais la mettre au service d'un produit **calme, lisible et rassurant** pour des enfants de 6 à 12 ans et leurs parents.

| Élément | Décision |
|---|---|
| Fond | menthe pâle avec ornements très diffus ; jamais de fond chargé derrière un texte de leçon |
| Couleur d'action | corail `#e76f69` (boutons primaires), réservé aux actions principales |
| Couleur de confiance | sarcelle `#2f7d8c` (liens, progression, focus) |
| Couleur de récompense | pêche `#fae2c7` (accomplissement doux), jamais d'or clinquant |
| Surfaces | cartes claires, bordures fines, ombres légères ; pas de verre dépoli sur les écrans de lecture |
| Typographie latine | Poppins (déjà embarquée) |
| Typographie arabe | **IBM Plex Sans Arabic** (OFL), à ajouter au Lot 1 |
| Ton | direct, bienveillant, never babyish ; pas de jargon |
| Illustration | formes géométriques et personnages simples, pas de mascotte envahissante |
| Iconographie | trait cohérent, 24 px, labels texte pour les actions critiques |

**Interdits visuels** : publicités, bannières promotionnelles, classements, feux d'artifice à chaque clic, textes clignotants, sons automatiques.

### <a id="ux-a2"></a>A2. Architecture de l'information

**Public (non connecté)**

```
Accueil public → Fonctionnement → Programmes → Tarifs (plus tard) → Connexion / Inscription
```

**Élève**

```
Accueil (prochaine étape)
├── Matières → Mon année → Matière → Unité → Chapitre → Leçon
├── Réviser (exercices, révisions espacées)
├── Progrès (maîtrise par matière)
└── Profil (langue, accessibilité, déconnexion)
```

**Parent**

```
Accueil parent
├── Mes enfants → Détail enfant → Progrès / Activité / Résultats
├── Notifications / résumé hebdomadaire
└── Compte (liaison enfant, consentement, données, langue)
```

**Auteur / admin**

```
Référentiel → Années / Matières / Unités
Contenus → Leçons → Éditeur → Aperçu → Soumettre
Révision → File → Décision (valider / renvoyer)
Publication → Versions → Retrait
Utilisateurs → Rôles / consentements
Qualité → Signalements / statistiques
```

**Règles de navigation**

- L'élève ne voit jamais plus de **5 entrées** dans sa navigation principale.
- Le parent ne voit que les enfants liés et validés.
- L'admin ne voit les données personnelles que si son rôle l'exige.
- Toute page profonde affiche un fil d'Ariane court : `Matière > Unité > Chapitre`.
- Le retour arrière du navigateur restaure la position et l'état de l'exercice en cours.

### <a id="ux-a3"></a>A3. Gabarits et responsive

| Gabarit | Usage | Structure |
|---|---|---|
| **Public** | accueil, connexion, inscription | en-tête simple, contenu centré 720–960 px, pied de page légal |
| **Élève** | accueil, matières, leçons | desktop : rail latéral 248 px + contenu ; mobile : en-tête + barre inférieure 4 actions |
| **Lecture** | leçon, exercice | colonne de lecture **max 760 px**, marges généreuses, actions collées en bas sur mobile |
| **Parent** | dashboard, détail enfant | desktop : navigation secondaire + grille de cartes ; mobile : une colonne |
| **Admin** | référentiel, éditeur | desktop prioritaire ; tableaux + panneau latéral ; mobile en lecture seule pour l'édition lourde |

**Points de rupture** : `≤ 600 px` (mobile), `601–980 px` (tablette), `981–1279 px` (petit desktop), `≥ 1280 px` (desktop). Les tests se font à **375, 768, 1024, 1440, 1920**.

**Espacement** : échelle 4/8/12/16/24/32/48. **Rayons** : 12 px (petits), 18 px (cartes), 24 px (panneaux), 999 px (pilules). **Cibles tactiles** : ≥ 44 × 44 px.

**Lisibilité** : 16 px minimum pour le corps ; 18–20 px pour les 1AP–2AP ; interligne 1.6 ; ligne de texte ≤ 75 caractères ; contraste ≥ 4,5:1.

### <a id="ux-a4"></a>A4. Mouvement et feedback

- Durées : 120–200 ms pour les micro-interactions, 240–320 ms pour les transitions d'écran.
- Courbes douces ; pas de rebond excessif.
- **Feedback immédiat** : bouton pressé, chargement, succès, erreur.
- **Récompense discrète** : un check, un message, une barre qui avance ; pas de confettis systématiques.
- **Réduction du mouvement** : respecter `prefers-reduced-motion` ; désactiver les animations non essentielles.
- **Son** : jamais automatique ; boutons de lecture explicites ; possibilité de couper.
- **Haptique** (mobile plus tard) : uniquement sur validation, jamais sur erreur.

### <a id="ux-a5"></a>A5. États

Chaque page doit définir :

| État | Rendu attendu |
|---|---|
| **Chargement** | squelette respectant la mise en page ; pas de spinner plein écran > 300 ms |
| **Vide** | message clair + action suivante ; jamais une page blanche |
| **Erreur** | message humain, code technique discret, bouton « Réessayer », conservation de la saisie |
| **Hors-ligne** | bandeau + contenu en cache si disponible ; actions mises en file |
| **Succès** | confirmation visible, pas seulement un toast qui disparaît |
| **Verrouillé** | contenu non publié/non autorisé → 404 ou message neutre, pas de fuite |
| **Chargement long** | progression + possibilité de continuer ailleurs |
| **Session expirée** | modale de reconnexion, retour à l'écran précédent après succès |

### <a id="ux-a6"></a>A6. Accessibilité

Cible **WCAG 2.2 AA** sur les parcours élève/parent.

- Navigation clavier complète, focus visible, ordre logique.
- Labels explicites ; pas d'icône seule pour une action critique.
- Contraste texte/fond ≥ 4,5:1 ; composants ≥ 3:1.
- Pas d'information par la couleur seule (ajouter texte/icône).
- Sous-titres et transcriptions pour les vidéos/audios.
- Contrôles audio : lecture/pause, vitesse, replay, transcription.
- Formulaires : erreurs au niveau du champ + résumé, pas seulement en rouge.
- Pas de limite de temps avant la 3AP ; au-delà, possibilité de pause et d'aménagements.
- Zoom 200 % sans perte de contenu ; orientation paysage/portrait.
- Lecteur d'écran : titres hiérarchisés, landmarks, `aria-live` pour les résultats.
- Mouvement réduit et pas de clignotement.

### <a id="ux-a7"></a>A7. Langues et RTL

- Deux locales : **ar-MA** (RTL) et **fr-MA** (LTR). L'anglais est optionnel et ne doit pas être une condition d'accès.
- La langue de l'interface et celle du contenu sont alignées par défaut ; l'utilisateur peut changer l'interface sans changer le contenu.
- Utiliser des **propriétés logiques** CSS (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`).
- Ne pas utiliser `letter-spacing` négatif en arabe ; adapter la hauteur de ligne.
- Les icônes directionnelles (flèches, retour) sont miroir en RTL ; les icônes universelles (maison, profil) ne le sont pas.
- Les nombres sont affichés selon la locale et le niveau ; ne pas mélanger deux systèmes dans une même phrase.
- Tester chaque page en AR et FR, avec des contenus longs.

### <a id="ux-a8"></a>A8. Voix et microcopie

| Contexte | À faire | À éviter |
|---|---|---|
| Accueil | « Bonjour Yassine. On continue ? » | « Bon retour, utilisateur ! » |
| Leçon | « Lis, écoute, puis essaie. » | « Veuillez procéder à l'activité. » |
| Erreur | « On n'a pas pu enregistrer. Réessaie. » | « Erreur 500. » |
| Exercice faux | « Presque ! Regarde pourquoi. » | « Faux. » |
| Réussite | « Bien joué, tu as compris. » | « Incroyable !!! » |
| Parent | « Ce qui est acquis, ce qui mérite un coup de pouce. » | « Votre enfant est en retard. » |
| Admin | « Source manquante : publication bloquée. » | « Erreur inconnue. » |

**Règles** : phrases courtes, une idée par phrase, pas de majuscules criardes, pas d'emoji dans les contenus pédagogiques (sauf usage validé), pas de promesse de résultat.

---

<a id="ux-b"></a>
## B. Parcours utilisateurs

### <a id="ux-b1"></a>B1. Personas

| Persona | Âge / rôle | Contexte | Objectif | Frustration actuelle |
|---|---|---|---|---|
| **Yassine** | 8 ans, 3AP | téléphone familial, 20 min le soir | comprendre et réussir ses exercices | consignes longues, peur de se tromper |
| **Salma** | 34 ans, mère | travaille, peu de temps | savoir si son fils progresse | ne comprend pas les méthodes, découvre les notes trop tard |
| **Karim** | 41 ans, enseignant | produit des contenus | gagner du temps, être reconnu | outils compliqués, ressaisie |
| **Nadia** | 29 ans, administratrice | gère le catalogue | garantir la conformité | versions qui se mélangent, contenus non tracés |

### <a id="ux-b2"></a>B2. Parcours essentiels

#### P1 — Première visite et inscription (parent)

1. Arrivée sur U-01 → « Commencer ».
2. U-03 : e-mail parent, mot de passe, consentement, langue.
3. Vérification e-mail → U-04 : création du profil enfant (prénom, année, date de naissance).
4. Liaison parent-enfant automatique (le parent crée le compte).
5. U-05 : accueil élève avec une première action proposée.
6. Le parent reçoit un e-mail de confirmation et peut consulter U-16.

**Critère** : un parent peut créer un compte et lancer une première leçon en moins de 3 minutes.

#### P2 — Session quotidienne (élève)

1. U-05 : « Ta prochaine étape » (une seule carte).
2. Clic → U-09 leçon (5–10 min) avec audio si 1AP–2AP.
3. Bouton « J'ai compris » → U-10 exercice (3–5 questions).
4. Feedback immédiat → U-11 résultat.
5. U-05 mise à jour : prochaine étape ou révision.
6. Le parent voit l'activité dans U-16.

**Critère** : 3 écrans maximum entre l'accueil et la première question.

#### P3 — Révision avant un contrôle

1. U-06 → matière → U-07 unités → U-08 chapitre.
2. U-15 propose les notions faibles et les révisions espacées.
3. Exercices ciblés → résultats → mise à jour de la maîtrise.
4. U-14 montre la progression et les notions à revoir.

#### P4 — Préparation à l'examen 6AP

1. U-05 → carte « Préparer l'examen ».
2. U-12 : choix de l'épreuve (maths, arabe + islamique, français).
3. Examen blanc chronométré, autosauvegardé.
4. U-13 : score, détail par compétence, corrections.
5. U-15 : plan de révision des notions faibles.

#### P5 — Parent, consultation hebdomadaire

1. E-mail « Le résumé de la semaine » → U-16.
2. Vue d'ensemble : temps, leçons, maîtrise, notions à renforcer.
3. U-17 : détail par matière, historique, conseils.
4. Action : « Proposer une révision » (crée une recommandation, pas une obligation).
5. Réglages de notifications.

#### P6 — Auteur, publication d'une leçon

1. U-20 : choisir année/matière/unité.
2. U-21 : créer la leçon, blocs, source, objectifs.
3. Aperçu élève → soumettre.
4. U-22 : un relecteur différent valide ou renvoie.
5. Publication → version 1 ; journal d'audit.
6. Toute modification ultérieure crée une version.

### <a id="ux-b3"></a>B3. Droits et interactions entre rôles

| Action | Élève | Parent | Enseignant/auteur | Admin |
|---|---|---|---|---|
| Voir les contenus publiés | ✅ | ✅ (via enfant) | ✅ | ✅ |
| Voir les brouillons | — | — | ✅ (les siens) | ✅ |
| Créer/modifier une leçon | — | — | ✅ | ✅ |
| Publier | — | — | — (sauf délégation) | ✅ |
| Voir la progression d'un enfant | ✅ (soi) | ✅ (enfants liés) | ⚠️ classes assignées (phase 2) | ⚠️ support, avec journal |
| Modifier les réponses | ✅ (avant soumission) | — | — | — |
| Supprimer un compte | — | ✅ (enfant) | — | ✅ (avec procédure) |
| Gérer les rôles | — | — | — | ✅ |
| Voir les données personnelles | ✅ (soi) | ✅ (enfants) | ⚠️ selon classe | ⚠️ selon rôle |

### <a id="ux-b4"></a>B4. Cas limites

- **Enfant sans compte e-mail** : compte créé par le parent, identifiant interne, pas d'e-mail direct.
- **Parent séparé / deux tuteurs** : plusieurs `parent_links` possibles, avec consentement.
- **Changement d'année** : nouvelle inscription, conservation de l'historique ; l'élève peut réviser l'année précédente.
- **Compte partagé sur un appareil** : déconnexion rapide, pas d'affichage du nom complet sur l'écran de connexion.
- **Contenu retiré pendant une leçon** : message neutre, retour au chapitre, progression conservée.
- **Hors-ligne** : leçon en cache consultable, exercices en file, message clair sur ce qui n'est pas synchronisé.
- **Session expirée** : reconnexion sans perdre la réponse en cours.
- **Erreur de chargement d'un média** : texte alternatif, bouton réessayer, leçon reste utilisable.
- **Élève qui échoue plusieurs fois** : message encourageant, proposition de revoir la leçon, pas de blocage.
- **Parent qui se trompe de niveau** : correction possible dans le profil, avec avertissement sur la progression.


---

<a id="ux-c"></a>
## C. Description détaillée des pages

> Les routes sont indiquées sans préfixe de locale ; en production, ajouter `/{locale}` (`/fr`, `/ar`). Les composants renvoient aux briques du design system (§Annexe A). Les données renvoient aux entités du §12 de `Plan.md`.

### <a id="u-01"></a>U-01 — Accueil public

| | |
|---|---|
| **Objectif** | faire comprendre la promesse en 10 secondes et déclencher l'inscription |
| **Utilisateur** | parent, enseignant, visiteur |
| **Route** | `/` |
| **Structure** | 1. En-tête (logo, langue, connexion) · 2. Héros (promesse + visuel) · 3. « Comment ça marche » en 3 étapes · 4. Programmes par niveau (primaire actif, collège/lycée « bientôt ») · 5. Preuves de confiance (programme, relecture, données) · 6. FAQ courte · 7. Appel à l'action · 8. Pied de page légal |
| **Composants** | `EnTetePublique`, `Heros`, `Etape`, `CarteNiveau`, `BlocConfiance`, `Accordeon`, `PiedLegal`, sélecteur de langue |
| **Actions** | « Commencer gratuitement », « Se connecter », changer de langue, ouvrir la FAQ |
| **Interactions** | ancres douces ; FAQ clavier ; CTA toujours visible après 1 écran ; pas de carrousel automatique |
| **Données** | aucun contenu personnel ; liste des niveaux publiés ; nombre de matières disponibles (calculé) |
| **États** | chargement des niveaux (squelette) ; erreur → CTA connexion reste disponible |
| **Responsive** | héros en colonne ≤ 980 px ; visuel allégé ≤ 600 px ; CTA pleine largeur |
| **Critères UX** | promesse compréhensible sans scroll ; 0 jargon ; LCP ≤ 2,5 s ; contraste AA |

### <a id="u-02"></a>U-02 — Connexion

| | |
|---|---|
| **Objectif** | permettre un accès rapide et sûr |
| **Utilisateur** | élève (via parent), parent, auteur, admin |
| **Route** | `/connexion` |
| **Structure** | 1. Logo · 2. Titre · 3. E-mail · 4. Mot de passe (afficher/masquer) · 5. « Mot de passe oublié ? » · 6. Se connecter · 7. Lien inscription · 8. Langue |
| **Composants** | `Champ`, `Bouton`, `Lien`, `Alerte`, `SelecteurLangue` |
| **Actions** | soumettre, afficher le mot de passe, réinitialiser, changer de langue |
| **Interactions** | validation au blur ; erreur globale sans révéler si l'e-mail existe ; verrouillage progressif après échecs ; redirection vers la page demandée |
| **Données** | `users`, sessions ; aucun contenu |
| **États** | chargement, erreur identifiants, compte non vérifié (renvoyer l'e-mail), compte suspendu, succès |
| **Responsive** | formulaire 400 px max, pleine largeur ≤ 600 px |
| **Critères UX** | 2 champs + 1 action ; autofocus ; gestion clavier ; erreurs lisibles ; pas de CAPTCHA au premier essai |

### <a id="u-03"></a>U-03 — Inscription

| | |
|---|---|
| **Objectif** | créer un compte parent et un profil enfant avec consentement |
| **Utilisateur** | parent/tuteur |
| **Route** | `/inscription` |
| **Structure** | 1. Type de compte (parent ; enseignant sur invitation) · 2. E-mail · 3. Mot de passe · 4. Langue · 5. Consentement parental · 6. Créer · 7. Déjà un compte |
| **Composants** | `Champ`, `MotDePasseForce`, `CaseConsentement`, `SelecteurLangue`, `Bouton` |
| **Actions** | créer, accepter les CGU, choisir la langue |
| **Interactions** | indicateur de force ; consentement obligatoire ; vérification e-mail ; pas de création de compte enfant sans parent |
| **Données** | `users`, `parent_links`, consentements |
| **États** | e-mail déjà utilisé (proposer connexion), erreur de consentement, succès → vérification |
| **Responsive** | une colonne, 440 px max |
| **Critères UX** | 3 minutes max ; texte de consentement clair ; aucune donnée sensible inutile |

### <a id="u-04"></a>U-04 — Choix du niveau (onboarding)

| | |
|---|---|
| **Objectif** | situer l'enfant dans le programme et personnaliser l'accueil |
| **Utilisateur** | parent, élève |
| **Route** | `/bienvenue` |
| **Structure** | 1. « Qui apprend ? » · 2. Prénom · 3. Année (1AP–6AP) avec explication des labels CP/CE1… · 4. Date de naissance (optionnelle) · 5. Langue de contenu · 6. Continuer |
| **Composants** | `ChoixAnnee`, `Champ`, `SelecteurLangue`, `Bouton` |
| **Actions** | choisir l'année, revenir, continuer |
| **Interactions** | cartes d'année lisibles (label marocain + équivalent français) ; confirmation avant changement ultérieur ; pas de test de niveau au MVP |
| **Données** | `grades`, `student_profiles`, `enrollments` |
| **États** | chargement, erreur, année non disponible |
| **Responsive** | cartes 2 colonnes ≥ 600 px, 1 colonne mobile |
| **Critères UX** | un parent non expert comprend 1AP/CP ; modification possible dans le profil ; pas de surcharge |

### <a id="u-05"></a>U-05 — Accueil élève

| | |
|---|---|
| **Objectif** | répondre en un écran à « que dois-je faire maintenant ? » |
| **Utilisateur** | élève |
| **Route** | `/apprendre` |
| **Structure** | 1. Salutation + langue · 2. Carte « Prochaine étape » (matière, chapitre, durée) · 3. Reprendre une leçon · 4. Progression de la semaine (3 statuts max) · 5. Matières (accès rapide) · 6. Réviser (si notions faibles) · 7. Barre de navigation |
| **Composants** | `CarteProchaineEtape`, `CarteReprise`, `AnneauProgression`, `CarteMatiere`, `BarreNavigation`, `Avatar` |
| **Actions** | continuer, reprendre, ouvrir une matière, réviser |
| **Interactions** | une seule carte principale ; si aucune donnée, proposer « Choisir une matière » ; mise à jour après chaque leçon ; pas de classement |
| **Données** | `progress`, `lessons`, `units`, `subjects`, `enrollments` |
| **États** | nouveau compte (aucune progression) → onboarding matière ; chargement ; erreur ; hors-ligne (dernière leçon en cache) |
| **Responsive** | carte principale pleine largeur ; matières 2 colonnes mobile, 3–4 desktop ; barre inférieure ≤ 980 px |
| **Critères UX** | prochaine action évidente < 3 s ; 1 clic vers la leçon ; lisible par un enfant de 7 ans |

### <a id="u-06"></a>U-06 — Catalogue des matières (mon année)

| | |
|---|---|
| **Objectif** | montrer toutes les matières de l'année et l'état de chacune |
| **Utilisateur** | élève, parent |
| **Route** | `/apprendre/matieres` |
| **Structure** | 1. En-tête « Mon année — 3AP » · 2. Changement d'année (si autorisé) · 3. Grille de matières · 4. Chaque carte : icône, nom, progression, nb de chapitres · 5. Bloc « Bientôt » pour matières non publiées |
| **Composants** | `EnTetePage`, `CarteMatiere`, `BadgeStatut`, `GrilleCartes` |
| **Actions** | ouvrir une matière, changer d'année (révision) |
| **Interactions** | cartes cliquables ; état « non publié » non cliquable ; filtre par statut (facultatif) |
| **Données** | `grade_subjects`, `subjects`, `units`, `progress` |
| **États** | aucune matière publiée → message + retour accueil ; chargement ; erreur |
| **Responsive** | 1 colonne ≤ 600 px, 2 à 768 px, 3–4 ≥ 1024 px |
| **Critères UX** | toutes les matières visibles sans scroll excessif ; progression lisible sans jargon |

### <a id="u-07"></a>U-07 — Détail d'une matière

| | |
|---|---|
| **Objectif** | présenter les unités et le chemin d'apprentissage |
| **Utilisateur** | élève |
| **Route** | `/apprendre/matieres/:subjectId` |
| **Structure** | 1. En-tête matière (icône, description, progression) · 2. Unités en accordéon/chemin · 3. Chapitres avec statut (à faire, en cours, acquis) · 4. Bouton « Continuer » |
| **Composants** | `EnTeteMatiere`, `ListeUnites`, `CarteChapitre`, `BarreProgression` |
| **Actions** | ouvrir un chapitre, continuer, revenir |
| **Interactions** | ouvrir/fermer une unité ; mémoriser la dernière position ; les chapitres verrouillés ne le sont jamais (pas de blocage artificiel) |
| **Données** | `units`, `chapters`, `progress`, `lessons` |
| **États** | unité vide, contenu retiré, chargement, erreur |
| **Responsive** | liste verticale ; en-tête compact mobile ; sticky « Continuer » en bas |
| **Critères UX** | l'élève voit où il en est et ce qui vient ensuite ; pas de surcharge de texte |

### <a id="u-08"></a>U-08 — Chapitre

| | |
|---|---|
| **Objectif** | lister les leçons d'un chapitre et lancer la bonne |
| **Utilisateur** | élève |
| **Route** | `/apprendre/chapitres/:chapterId` |
| **Structure** | 1. Fil d'Ariane · 2. Titre + objectifs (2–4 puces) · 3. Liste ordonnée des leçons · 4. Statut par leçon · 5. Bloc « À retenir » (résumé) |
| **Composants** | `FilAriane`, `EnteteChapitre`, `LigneLecon`, `BadgeStatut`, `ResumeEncadre` |
| **Actions** | ouvrir une leçon, reprendre |
| **Interactions** | leçon suivante mise en avant ; les leçons déjà vues restent accessibles ; objectifs cochables plus tard |
| **Données** | `chapters`, `lessons`, `progress` |
| **États** | chapitre vide → message ; leçon retirée → ligne désactivée avec explication |
| **Responsive** | une colonne ; objectifs en accordéon mobile |
| **Critères UX** | 1 clic vers la leçon ; le but du chapitre est clair ; temps estimé visible |

### <a id="u-09"></a>U-09 — Leçon

| | |
|---|---|
| **Objectif** | faire comprendre une notion en 5–10 minutes |
| **Utilisateur** | élève |
| **Route** | `/apprendre/lecons/:lessonId` |
| **Structure** | 1. Fil d'Ariane + progression · 2. Titre · 3. Objectif « À la fin, tu sauras… » · 4. Blocs : texte, image, audio, vidéo, exemple, « À retenir » · 5. Bouton « J'ai compris » · 6. Navigation précédent/suivant · 7. Signalement |
| **Composants** | `LecteurLecon`, `BlocTexte`, `BlocMedia`, `BlocExemple`, `EncadreRetenir`, `BoutonPrincipal`, `BarreProgressionLecture` |
| **Actions** | lire, écouter, regarder, avancer, revenir, signaler, marquer compris |
| **Interactions** | audio avec vitesse/transcription ; reprise à la position ; « J'ai compris » ouvre l'exercice ; pas de défilement infini ; sauvegarde locale du bloc courant |
| **Données** | `lessons`, `lesson_blocks`, `resources`, `progress` |
| **États** | média indisponible → alternative texte ; leçon non publiée → 404 ; hors-ligne → version cache ; erreur de sauvegarde → réessayer |
| **Responsive** | colonne 760 px ; médias pleine largeur ; bouton sticky en bas mobile ; mode paysage pour vidéo |
| **Critères UX** | lisible par un enfant de 1AP avec audio ; temps de lecture indiqué ; aucun texte justifié ; retour possible ; contenu signalable |

### <a id="u-10"></a>U-10 — Exercice

| | |
|---|---|
| **Objectif** | vérifier la compréhension par la pratique |
| **Utilisateur** | élève |
| **Route** | `/apprendre/exercices/:exerciseId` |
| **Structure** | 1. En-tête (matière, chapitre, question x/y) · 2. Consigne · 3. Zone de réponse · 4. Bouton « Vérifier » · 5. Feedback (bonne réponse / explication / réessayer) · 6. Progression |
| **Composants** | `LecteurExercice`, `QuestionQCM`, `QuestionCourte`, `QuestionAppariement`, `Feedback`, `BarreProgression` |
| **Actions** | sélectionner, saisir, vérifier, réessayer, passer (si autorisé), quitter |
| **Interactions** | validation au clic ; feedback immédiat ; pas de révélation avant tentative ; sauvegarde de l'état ; clavier complet ; audio de la consigne en 1AP–2AP |
| **Données** | `exercises`, `questions`, `choices`, `attempts`, `answers`, `progress` |
| **États** | chargement, erreur, réponse vide, bonne/mauvaise réponse, exercice terminé, hors-ligne (file) |
| **Responsive** | une question par écran ; boutons ≥ 48 px ; options empilées mobile |
| **Critères UX** | aucune ambiguïté ; feedback en < 300 ms ; l'élève peut réessayer ; pas de chronomètre stressant avant la 3AP |

### <a id="u-11"></a>U-11 — Résultat d'exercice

| | |
|---|---|
| **Objectif** | comprendre ce qui est acquis et ce qui reste à travailler |
| **Utilisateur** | élève, parent (via U-17) |
| **Route** | `/apprendre/exercices/:exerciseId/resultat` |
| **Structure** | 1. Message de résultat · 2. Score (facultatif selon l'âge) · 3. Détail par question · 4. Notion(s) travaillée(s) · 5. Actions : revoir la leçon, réessayer, continuer |
| **Composants** | `ResultatExercice`, `ListeReponses`, `BadgeMaitrise`, `Bouton` |
| **Actions** | revoir, réessayer, continuer, revenir au chapitre |
| **Interactions** | réponses fausses dépliables avec explication ; pas de note rouge humiliante ; mise à jour de la maîtrise ; suggestion de révision |
| **Données** | `attempts`, `answers`, `progress` |
| **États** | chargement, erreur, résultat partiel (hors-ligne) |
| **Responsive** | une colonne ; actions principales en bas |
| **Critères UX** | l'élève sait quoi faire ensuite ; feedback non punitif ; lien direct vers la notion |

### <a id="u-12"></a>U-12 — Évaluation

| | |
|---|---|
| **Objectif** | mesurer les acquis dans des conditions proches de l'examen |
| **Utilisateur** | élève (5AP–6AP), parent |
| **Route** | `/apprendre/evaluations/:assessmentId` |
| **Structure** | 1. Écran d'introduction (matières, durée, nombre de questions, consignes) · 2. Examen : question, navigation, minuteur · 3. Sauvegarde automatique · 4. Bouton « Terminer » avec confirmation |
| **Composants** | `IntroductionEvaluation`, `LecteurEvaluation`, `Minuteur`, `NavigationQuestions`, `DialogueConfirmation` |
| **Actions** | commencer, répondre, naviguer, mettre en pause (si autorisé), terminer |
| **Interactions** | autosave toutes les 15 s ; reprise après coupure ; minuteur visible mais non anxiogène ; pas de correction avant la fin ; aménagements (temps supplémentaire) |
| **Données** | `assessments`, `assessment_items`, `attempts`, `answers` |
| **États** | non commencé, en cours, expiré, soumis, erreur de sauvegarde, hors-ligne |
| **Responsive** | une question par écran ; navigation fixe ; minuteur compact |
| **Critères UX** | consignes claires ; reprise fiable ; pas de perte de réponse ; accessible clavier |


### <a id="u-13"></a>U-13 — Résultat d'évaluation

| | |
|---|---|
| **Objectif** | restituer le résultat, les compétences et un plan de travail |
| **Utilisateur** | élève, parent |
| **Route** | `/apprendre/evaluations/:assessmentId/resultat` |
| **Structure** | 1. En-tête (matière, date, durée) · 2. Score global et seuil · 3. Résultats par compétence · 4. Réponses et corrections · 5. Plan de révision proposé |
| **Composants** | `ResultatEvaluation`, `JaugeMaitrise`, `TableauCompetences`, `ListeCorrections`, `PlanRevision` |
| **Actions** | voir une correction, refaire l'évaluation, ouvrir une révision, revenir |
| **Interactions** | corrections dépliables ; pas de comparaison avec d'autres élèves ; téléchargement PDF (plus tard) ; lien vers le chapitre concerné |
| **Données** | `attempts`, `answers`, `assessment_items`, `progress` |
| **États** | correction en attente (questions ouvertes), résultat partiel, erreur |
| **Responsive** | tableau → cartes par compétence ≤ 980 px |
| **Critères UX** | l'élève comprend ses erreurs ; le parent voit les priorités ; pas d'étiquette définitive |

### <a id="u-14"></a>U-14 — Progrès élève

| | |
|---|---|
| **Objectif** | montrer une progression honnête, par matière et par notion |
| **Utilisateur** | élève, parent |
| **Route** | `/apprendre/progres` |
| **Structure** | 1. Semaine (temps, leçons, exercices) · 2. Maîtrise par matière · 3. Notions à renforcer · 4. Historique récent · 5. Objectif de la semaine |
| **Composants** | `ResumeSemaine`, `CarteMatiereProgression`, `ListeNotionsFaibles`, `Historique`, `ObjectifHebdo` |
| **Actions** | ouvrir une notion, réviser, changer d'objectif |
| **Interactions** | périodes (semaine/mois) ; pas de courbe anxiogène ; données réelles uniquement ; état vide pour nouveau compte |
| **Données** | `progress`, `attempts`, `lessons`, `subjects` |
| **États** | aucune activité, chargement, erreur, hors-ligne |
| **Responsive** | cartes empilées ; graphiques simples en SVG ; tableau → liste |
| **Critères UX** | compréhensible par un enfant et un parent ; pas de fausse précision ; objectifs atteignables |

### <a id="u-15"></a>U-15 — Révision

| | |
|---|---|
| **Objectif** | proposer les bonnes notions au bon moment |
| **Utilisateur** | élève |
| **Route** | `/apprendre/reviser` |
| **Structure** | 1. « À réviser aujourd'hui » · 2. Notions faibles · 3. Révisions espacées · 4. Choix libre par matière · 5. Explication du pourquoi |
| **Composants** | `CarteRevision`, `ListeNotions`, `FiltreMatiere`, `ExplicationAlgorithme` |
| **Actions** | lancer une révision, ignorer pour aujourd'hui (non punitif), choisir une matière |
| **Interactions** | ordre adaptatif ; session courte (5–10 min) ; feedback immédiat ; mise à jour de la maîtrise |
| **Données** | `progress`, `attempts`, `exercises`, `review_schedule` |
| **États** | rien à réviser → encouragement ; chargement ; erreur |
| **Responsive** | une colonne ; cartes compactes |
| **Critères UX** | l'élève comprend pourquoi réviser ; pas de culpabilisation ; session ≤ 10 min |

### <a id="u-16"></a>U-16 — Espace parent

| | |
|---|---|
| **Objectif** | donner une vision fiable et actionnable, sans surveillance |
| **Utilisateur** | parent/tuteur |
| **Route** | `/parent` |
| **Structure** | 1. En-tête « Bonjour Salma » · 2. Sélecteur d'enfant · 3. Résumé de la semaine · 4. Cartes par matière (maîtrise, temps) · 5. « À aider cette semaine » (2–3 actions) · 6. Activité récente · 7. Lien vers le détail |
| **Composants** | `SelecteurEnfant`, `ResumeSemaineParent`, `CarteMatiereParent`, `ActionsAide`, `ActiviteRecente` |
| **Actions** | changer d'enfant, ouvrir le détail, proposer une révision, régler les notifications |
| **Interactions** | pas de note globale ; pas de comparaison ; données à jour ; « proposer » crée une recommandation, pas une obligation pour l'enfant |
| **Données** | `parent_links`, `progress`, `attempts`, `notifications` |
| **États** | aucun enfant lié → invitation ; enfant sans activité ; chargement ; erreur ; accès révoqué |
| **Responsive** | une colonne mobile ; cartes 2 colonnes ≥ 768 px |
| **Critères UX** | le parent comprend en 30 s ; aucune culpabilisation ; actions concrètes ; vie privée respectée |

### <a id="u-17"></a>U-17 — Détail enfant (parent)

| | |
|---|---|
| **Objectif** | explorer les progrès par matière et par notion |
| **Utilisateur** | parent |
| **Route** | `/parent/enfants/:childId` |
| **Structure** | 1. Identité (prénom, année) · 2. Période · 3. Maîtrise par matière · 4. Notions à renforcer · 5. Historique des leçons/exercices · 6. Résultats d'évaluations · 7. Actions (proposer une révision) |
| **Composants** | `EnteteEnfant`, `FiltrePeriode`, `TableauMatieres`, `ListeNotions`, `Historique`, `CarteResultat` |
| **Actions** | changer de période, ouvrir une notion, proposer une révision |
| **Interactions** | pas d'accès aux réponses détaillées sans contexte ; téléchargement (plus tard) ; lien vers la leçon publique |
| **Données** | `progress`, `attempts`, `assessments`, `lessons` |
| **États** | enfant non lié → 403 ; aucune donnée ; chargement ; erreur |
| **Responsive** | tableaux → cartes ; filtres en chips |
| **Critères UX** | lecture en 2 min ; vocabulaire non technique ; pas de surcharge |

### <a id="u-18"></a>U-18 — Notifications

| | |
|---|---|
| **Objectif** | informer sans harceler |
| **Utilisateur** | élève, parent, auteur |
| **Route** | `/notifications` |
| **Structure** | 1. Filtres (tout, non lu) · 2. Liste chronologique · 3. Chaque item : type, titre, date, action · 4. Marquer tout comme lu · 5. Préférences |
| **Composants** | `ListeNotifications`, `Filtre`, `ItemNotification`, `BoutonLien` |
| **Actions** | ouvrir, marquer lu, tout marquer, régler les préférences |
| **Interactions** | groupement par jour ; pas de notification la nuit ; limite de fréquence ; désinscription par type |
| **Données** | `notifications`, préférences |
| **États** | vide, chargement, erreur, non autorisé |
| **Responsive** | liste pleine largeur ; actions accessibles |
| **Critères UX** | 1 notification = 1 action ; pas de spam ; texte clair |

### <a id="u-19"></a>U-19 — Profil et réglages

| | |
|---|---|
| **Objectif** | gérer identité, langue, accessibilité, données |
| **Utilisateur** | élève, parent, auteur |
| **Route** | `/compte` |
| **Structure** | 1. Identité (nom, avatar/initiale) · 2. Langue de l'interface · 3. Langue de contenu · 4. Accessibilité (mouvement réduit, taille de texte, audio) · 5. Notifications · 6. Comptes liés (parent/enfant) · 7. Données (export, suppression) · 8. Déconnexion |
| **Composants** | `FormulaireProfil`, `SelecteurLangue`, `Interrupteur`, `SectionDonnees`, `DialogueSuppression` |
| **Actions** | enregistrer, changer la langue, exporter, supprimer, se déconnecter |
| **Interactions** | sauvegarde explicite ; confirmation pour suppression ; délai de grâce ; conservation des données légales |
| **Données** | `users`, `student_profiles`, préférences, consentements |
| **États** | chargement, succès, erreur, confirmation, compte suspendu |
| **Responsive** | sections en accordéon mobile ; formulaire 640 px max |
| **Critères UX** | aucune surcharge ; langue évidente ; suppression expliquée ; accessibilité réglable |

### <a id="u-20"></a>U-20 — Admin référentiel

| | |
|---|---|
| **Objectif** | administrer années, matières, unités et chapitres |
| **Utilisateur** | admin, auteur |
| **Route** | `/admin/referentiel` |
| **Structure** | 1. Sélecteur niveau/année · 2. Arbre matières → unités → chapitres · 3. Panneau détail · 4. Bouton ajouter · 5. Indicateurs (publié, brouillon, manquant) |
| **Composants** | `ArbreReferentiel`, `PanneauDetail`, `FormulaireUnite`, `BadgeStatut`, `BarreRecherche` |
| **Actions** | créer, modifier, réordonner, archiver, importer |
| **Interactions** | glisser-déposer avec alternative clavier ; confirmation ; validation des champs ; import dry-run |
| **Données** | `levels`, `grades`, `subjects`, `units`, `chapters`, `content_gaps` |
| **États** | chargement, vide, erreur, conflit de position, import partiel |
| **Responsive** | desktop prioritaire ; mobile lecture seule |
| **Critères UX** | arbre lisible ; aucune suppression destructive ; provenance visible |

### <a id="u-21"></a>U-21 — Admin contenu (éditeur de leçon)

| | |
|---|---|
| **Objectif** | créer une leçon structurée, bilingue et traçable |
| **Utilisateur** | auteur, admin |
| **Route** | `/admin/lecons/:lessonId` |
| **Structure** | 1. Métadonnées (année, matière, unité, chapitre, titre AR/FR, objectifs) · 2. Blocs (texte, image, audio, vidéo, exemple, résumé) · 3. Source et références · 4. Aperçu élève · 5. Enregistrer brouillon / soumettre |
| **Composants** | `EditeurLecon`, `BlocEditable`, `SelecteurMedia`, `ChampSource`, `ApercuEleve`, `BarreActions` |
| **Actions** | ajouter/réordonner/supprimer un bloc, uploader, prévisualiser, soumettre |
| **Interactions** | autosave toutes les 10 s ; avertissement de sortie ; validation avant soumission ; aperçu AR/FR ; upload avec progression |
| **Données** | `lessons`, `lesson_blocks`, `resources`, `content_reviews`, `curricula` |
| **États** | brouillon, en révision, publié, erreur de validation, média en échec |
| **Responsive** | desktop ; mobile avertit que l'édition lourde est déconseillée |
| **Critères UX** | aucun bloc orphelin ; source obligatoire ; aperçu fidèle ; sauvegarde fiable |

### <a id="u-22"></a>U-22 — Admin révision et publication

| | |
|---|---|
| **Objectif** | garantir qu'aucun contenu non validé n'est publié |
| **Utilisateur** | relecteur, admin |
| **Route** | `/admin/revision` |
| **Structure** | 1. File (à relire, renvoyés, publiés) · 2. Filtres (matière, année, auteur) · 3. Détail (aperçu, source, commentaires) · 4. Décision (valider, renvoyer, refuser) · 5. Historique |
| **Composants** | `FileRevision`, `Filtre`, `ApercuLecon`, `PanneauDecision`, `Commentaires`, `HistoriqueVersions` |
| **Actions** | valider, renvoyer avec motif, refuser, publier, retirer |
| **Interactions** | impossibilité de valider son propre contenu ; motif obligatoire ; double confirmation de publication ; journal d'audit |
| **Données** | `content_reviews`, `lessons`, `lesson_versions`, `users`, `audit_logs` |
| **États** | file vide, chargement, conflit (contenu modifié), erreur |
| **Responsive** | desktop ; lecture seule mobile |
| **Critères UX** | décision claire ; traçabilité ; pas de publication accidentelle |

### <a id="u-23"></a>U-23 — Recherche

| | |
|---|---|
| **Objectif** | trouver une leçon, un chapitre ou une notion en < 10 s |
| **Utilisateur** | élève, parent, auteur |
| **Route** | `/recherche` (ou palette `⌘K`) |
| **Structure** | 1. Champ · 2. Filtres (année, matière, type) · 3. Résultats groupés · 4. Historique récent (local) · 5. Aide si aucun résultat |
| **Composants** | `BarreRecherche`, `Filtre`, `GroupeResultats`, `EtatVide`, `RaccourciClavier` |
| **Actions** | saisir, filtrer, ouvrir, effacer |
| **Interactions** | debounce 250 ms ; recherche AR/FR ; accents et variantes ; navigation clavier ; résultats uniquement publiés/autorités |
| **Données** | `lessons`, `chapters`, `subjects`, index `tsvector` |
| **États** | vide, chargement, aucun résultat, erreur, hors-ligne |
| **Responsive** | plein écran mobile ; palette desktop |
| **Critères UX** | résultats pertinents ; pas de fuite de brouillon ; accessible clavier |

### <a id="u-24"></a>U-24 — Erreurs, 404, hors-ligne

| | |
|---|---|
| **Objectif** | ne jamais laisser l'utilisateur bloqué |
| **Utilisateur** | tous |
| **Route** | `*`, états globaux |
| **Structure** | 1. Illustration légère · 2. Message humain · 3. Cause discrète · 4. Action(s) · 5. Retour accueil |
| **Composants** | `PageErreur`, `BandeauHorsLigne`, `DialogueReconnexion` |
| **Actions** | réessayer, revenir, se reconnecter, contacter le support |
| **Interactions** | 404 pour contenu non publié (pas 403 révélateur) ; conservation du contexte ; pas de boucle de rechargement |
| **Données** | requestId, statut, cache local |
| **États** | 404, 403, 500, réseau, session expirée, maintenance |
| **Responsive** | centré, lisible, actions pleine largeur mobile |
| **Critères UX** | message non technique ; issue claire ; accessibilité ; pas de perte de travail |


### <a id="u-25"></a>U-25 — Admin utilisateurs, rôles et qualité

| | |
|---|---|
| **Objectif** | administrer les comptes, les rôles et la qualité éditoriale sans exposer les données inutiles |
| **Utilisateur** | admin, super-admin |
| **Route** | `/admin/utilisateurs` et `/admin/qualite` |
| **Structure** | 1. Recherche utilisateur · 2. Liste (rôle, statut, date) · 3. Panneau détail (rôles, consentements, enfants liés) · 4. File des signalements · 5. Journal d'audit · 6. Actions sensibles |
| **Composants** | `TableauUtilisateurs`, `PanneauUtilisateur`, `SelecteurRole`, `ListeSignalements`, `JournalAudit`, `DialogueSensible` |
| **Actions** | rechercher, changer un rôle, suspendre, réactiver, traiter un signalement, consulter l'audit |
| **Interactions** | double confirmation pour suspension/suppression ; motif obligatoire ; données personnelles masquées par défaut ; export limité ; permissions vérifiées côté serveur |
| **Données** | `users`, `user_roles`, `parent_links`, `content_flags`, `audit_logs` |
| **États** | chargement, vide, erreur, accès refusé, conflit de rôle |
| **Responsive** | desktop prioritaire ; mobile lecture seule |
| **Critères UX** | moindre privilège ; traçabilité ; aucune donnée enfant exposée sans motif ; action réversible ou confirmée |


---

<a id="ux-d"></a>
## D. Expérience pédagogique

### D1. La boucle d'apprentissage

```
Accueil (une prochaine étape)
   ↓
Leçon courte (comprendre)
   ↓
Pratique guidée (faire)
   ↓
Feedback immédiat (comprendre l'erreur)
   ↓
Résultat + maîtrise (savoir où on en est)
   ↓
Révision espacée (retenir)
```

Chaque étape est **courte** et **visible**. L'élève ne choisit jamais parmi 20 contenus : il peut toujours explorer, mais l'écran d'accueil propose une seule action prioritaire.

### D2. Durée et rythme par année

| Année | Session cible | Lecture | Exercices | Audio | Évaluation |
|---|---|---|---|---|---|
| 1AP | 8–12 min | 1–2 min par bloc | 3–5 questions | **obligatoire** pour les consignes | pas de chronomètre |
| 2AP | 10–15 min | 2–3 min | 4–6 questions | fortement recommandé | pas de chronomètre |
| 3AP | 15–20 min | 3–5 min | 5–8 questions | disponible | chronomètre optionnel |
| 4AP | 15–20 min | 4–6 min | 6–8 questions | disponible | chronomètre optionnel |
| 5AP | 20–25 min | 5–8 min | 8–10 questions | disponible | chronomètre |
| 6AP | 20–30 min | 5–10 min | 8–12 questions | disponible | examen blanc chronométré |

Les durées sont des **cibles de conception**, pas des limites strictes. L'élève peut quitter et reprendre.

### D3. Modèle de maîtrise

| État | Définition | Affichage élève | Affichage parent |
|---|---|---|---|
| **Découverte** | leçon ouverte, pas encore d'exercice | « À découvrir » | « Commencé » |
| **En cours** | exercices réalisés, réussite partielle | « En cours » | « En cours » |
| **Acquis** | réussite répétée sur plusieurs exercices | « Acquis » | « Acquis » |
| **À renforcer** | erreurs récentes ou révision échue | « À revoir » | « À consolider » |

**Règles** :
- La maîtrise n'est jamais calculée à partir du seul temps passé.
- Une leçon « terminée » sans exercice reste « En cours ».
- Les seuils exacts sont définis au Lot 5 et testés ; aucun chiffre inventé n'est affiché avant.
- Pas de note globale sur 20 avant la 5AP ; les résultats d'examen peuvent afficher un score contextualisé.

### D4. Types d'exercices et feedback

| Type | Usage | Feedback |
|---|---|---|
| **QCM** | reconnaissance, compréhension | bonne réponse + explication ; pourquoi les autres sont fausses |
| **Réponse courte** | vocabulaire, calcul, conjugaison | tolérance orthographique paramétrée ; correction explicite |
| **Appariement** | relations, traduction, catégories | correction visuelle des paires |
| **Ordre** | chronologie, étapes, construction de phrase | correction des positions |
| **Numérique** | mathématiques | vérification de l'unité et de l'arrondi |
| **Ouvert (plus tard)** | rédaction, justification | grille + relecture enseignant ; jamais noté automatiquement sans validation |

**Règles de feedback** :
- Commencer par ce qui est juste, puis expliquer l'erreur.
- Donner un exemple ou une règle, pas seulement la réponse.
- Laisser réessayer ; ne pas révéler la solution avant la deuxième tentative (sauf aménagement).
- Jamais de message humiliant, de rouge agressif seul, ni de son négatif.
- En 1AP–2AP, le feedback est audio + visuel.

### D5. Révisions espacées

- Chaque notion validée entre dans un calendrier simple : J+1, J+3, J+7, J+21 (paramétrable).
- Une révision échouée rapproche l'échéance ; une réussite l'éloigne.
- La session de révision est limitée à 5–10 min et mélange 2–3 notions.
- L'élève peut « passer pour aujourd'hui » ; la notion revient plus tard, sans pénalité.
- Le parent voit les notions à renforcer, pas un compteur de retard.

### D6. Évaluations et préparation à l'examen

- **Quiz de chapitre** : 5–8 questions, sans chronomètre avant la 3AP.
- **Contrôle** : 15–30 min, correction automatique + explication.
- **Examen blanc 6AP** : structure définie par les épreuves officielles connues (maths, arabe + islamique, français), durée et barème **paramétrés** après validation.
- La correction montrée à l'élève est pédagogique : compétence, erreur, exemple, prochaine étape.
- Les questions ouvertes ne sont pas notées automatiquement sans relecture.
- Les aménagements (temps supplémentaire, pause) sont prévus dans le modèle `attempt` et l'UI, même s'ils sont activés plus tard.

### D7. Motivation et récompenses

- **Toujours** : feedback, progression visible, encouragement spécifique (« Tu as compris les fractions équivalentes »).
- **Parfois** : badge de matière, objectif hebdomadaire atteint, série de 3 sessions.
- **Jamais** : classement public, perte de vies, compte à rebours anxiogène, comparaison entre enfants, récompense payante.
- Les récompenses ne remplacent pas l'apprentissage : aucune activité « gratuite » sans contenu.
- Le parent peut envoyer un encouragement ; l'enfant peut le voir dans U-18.

### D8. Implication du parent

- Le parent voit **ce qui est acquis** et **ce qui mérite un coup de pouce**, pas chaque clic.
- Le résumé hebdomadaire contient : temps, leçons, notions fortes, 2 actions concrètes.
- « Proposer une révision » crée une recommandation visible par l'enfant, jamais une obligation.
- Le parent peut lire une leçon publique pour aider, sans accéder aux réponses des évaluations en cours.
- Aucune notification de type « votre enfant est en retard ».
- Les données de l'enfant ne sont jamais partagées avec des tiers commerciaux.

### D9. Production et qualité des contenus

- Chaque leçon a un **objectif observable** (« À la fin, tu sauras… »), 2–4 blocs, un résumé et 3–5 exercices.
- Une leçon ne dépasse pas 10 min de lecture ; les vidéos ≤ 5 min.
- Les contenus sont rédigés par des enseignants, relus par un pair, validés par un admin.
- La source officielle et la version du programme sont stockées ; un contenu sans source ne peut pas être publié.
- Les termes arabes/français sont harmonisés dans un glossaire.
- Les exercices sont testés sur un panel d'élèves avant publication.
- Un contenu signalé est révisé sous 5 jours ouvrés (objectif de service).

### D10. Sécurité, éthique et limites

- Pas de chat libre, pas de partage de profil, pas de photo personnelle obligatoire.
- Pas de collecte de données de santé, de localisation ou de contacts.
- Pas de contenu politique ou religieux polémique au-delà du programme officiel ; l'éducation islamique est traitée avec le même soin que les autres matières.
- Pas de publicité ni de partenariat commercial dans l'espace enfant.
- Pas de notation définitive par IA.
- Les contenus sensibles (histoire, religion) sont relus par des spécialistes.

### D11. Déclinaison par année

**1AP–2AP — « Je découvre »**
- Grands boutons, audio dominant, texte court, une question par écran.
- Pas de chronomètre, pas de score chiffré.
- Illustration explicative, consignes lues.
- Parent souvent présent : mode « avec un adulte » possible.

**3AP–4AP — « Je m'entraîne »**
- Lecture autonome, exercices variés, feedback explicatif.
- Premiers objectifs hebdomadaires.
- Progression visible par matière.

**5AP–6AP — « Je me prépare »**
- Sessions plus longues, évaluations, examen blanc, plan de révision.
- Autonomie, gestion du temps, correction détaillée.
- Lien avec le collège (sans anxiété).

---

<a id="ux-e"></a>
## E. Cohérence entre UX et architecture

### E1. Matrice fonctionnalité → données → API → pages

| Fonctionnalité UX | Entités (Plan §12) | Endpoints (Plan §11) | Pages |
|---|---|---|---|
| Inscription/connexion | `users`, sessions | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` | U-02, U-03 |
| Profil enfant | `student_profiles`, `enrollments` | `GET/PATCH /me`, `/me/children` | U-04, U-19 |
| Référentiel | `levels`, `grades`, `subjects`, `grade_subjects` | `GET /curriculum/grades`, `/grades/:id/subjects` | U-06, U-20 |
| Arborescence | `units`, `chapters`, `lessons` | `GET /subjects/:id/units`, `/units/:id/chapters`, `/chapters/:id/lessons` | U-07, U-08 |
| Leçon | `lessons`, `lesson_blocks`, `resources` | `GET /lessons/:id`, `POST /lessons/:id/complete` | U-09 |
| Exercice | `exercises`, `questions`, `choices`, `attempts`, `answers` | `POST /exercises/:id/attempts`, `POST /attempts/:id/answers` | U-10, U-11 |
| Évaluation | `assessments`, `assessment_items`, `attempts` | `POST /assessments/:id/attempts`, `POST /attempts/:id/submit` | U-12, U-13 |
| Progression | `progress`, `attempts` | `GET /progress`, `GET /progress/summary` | U-05, U-14 |
| Révision | `progress`, `exercises` | `GET /review/today`, `POST /review/schedule` | U-15 |
| Parent | `parent_links`, `progress`, `notifications` | `GET /parent/children`, `/parent/children/:id/progress`, `POST /parent/children/:id/recommendations` | U-16, U-17 |
| Notifications | `notifications`, préférences | `GET /notifications`, `PATCH /notifications/:id/read` | U-18 |
| Recherche | index `lessons` | `GET /search?q=` | U-23 |
| Administration | toutes | `/admin/...` | U-20, U-21, U-22, U-25 |
| Erreurs | `requestId`, audit | réponses normalisées | U-24 |

### E2. Contraintes de cohérence

- **Aucune page ne dépend d'une donnée qui n'existe pas** dans le modèle : les écrans « à venir » (collège/lycée, paiement) sont explicitement marqués.
- **Aucune fonctionnalité de chat** : le modèle ne prévoit pas de messagerie libre au MVP ; les notifications et le support encadré suffisent.
- **Aucune progression calculée côté client** : le serveur est la source de vérité ; le client peut optimiser l'affichage.
- **Aucune évaluation sans banque de questions versionnée** : une question modifiée ne doit pas invalider les résultats passés.
- **Aucun contenu non publié** dans les routes élève : les filtres sont appliqués côté API, pas seulement côté UI.
- **Aucun accès parent** sans `parent_link` validé ; les contrôles sont côté serveur.
- **Aucune donnée personnelle** dans les URLs ou les logs.

### E3. Ce que l'UX ne promet pas

- Pas de cours en direct ni de professeur personnel.
- Pas de correction automatique de rédaction libre au MVP.
- Pas de certification officielle : l'examen blanc prépare, il ne remplace pas l'examen.
- Pas de synchronisation automatique avec Massar au MVP.
- Pas de version hors-ligne complète : seules les dernières leçons consultées sont mises en cache.
- Pas de paiement en ligne avant validation du pilote.

### E4. Questions UX à trancher

1. Faut-il un test de positionnement à l'inscription ? (recommandation : non au MVP, choix de l'année + ajustement manuel)
2. Quel niveau de gamification ? (recommandation : feedback + objectifs, badges limités)
3. Faut-il montrer un score chiffré en 3AP–4AP ? (recommandation : maîtrise, pas de note avant la 5AP)
4. Comment gérer les comptes familiaux multi-enfants ? (recommandation : un parent, plusieurs profils enfants)
5. Quelle place pour l'anglais/amazighe ? (recommandation : optionnels, activation par année/académie)
6. Faut-il une version arabe complète dès le MVP ? (recommandation : oui pour l'interface et les matières socles, avec relecture)

---

<a id="ux-annexe-a"></a>
## Annexe A — Design tokens et composants

### A1. Tokens à conserver / ajouter

| Token | Valeur / décision |
|---|---|
| `--couleur-accent` | `#e76f69` (corail) |
| `--couleur-secondaire` | `#2f7d8c` (sarcelle) |
| `--couleur-fond-page` | `#deedf0` (menthe pâle) |
| `--couleur-surface` | `#f4f9fb` |
| `--couleur-panneau` | `#e3f0f3` |
| `--couleur-texte` | `#0f2d2c` |
| `--couleur-texte-doux` | `#557f86` |
| `--rayon-carte` | `18px` |
| `--rayon-panneau` | `24px` (lecture) |
| `--espace-lecture` | `clamp(20px, 4vw, 48px)` |
| `--largeur-lecture` | `760px` (colonne de lecture) |
| `--police-latine` | Poppins |
| `--police-arabe` | IBM Plex Sans Arabic |
| `--taille-lecture` | `18px` (1AP–2AP), `17px` (3AP–6AP) |
| `--cible-tactile` | `44px` |

### A2. Composants du design system

`Bouton`, `Lien`, `Champ`, `Selection`, `Case`, `Alerte`, `Badge`, `Pastille`, `Avatar`, `Carte`, `CarteMatiere`, `CarteChapitre`, `CarteLecon`, `BarreProgression`, `AnneauProgression`, `FilAriane`, `EnTetePage`, `EtatVide`, `Squelette`, `Onglet`, `Accordeon`, `Modale`, `Toast`, `BandeauHorsLigne`, `SelecteurLangue`, `LecteurAudio`, `BlocMedia`, `QuestionQCM`, `QuestionCourte`, `Feedback`, `Minuteur`, `TableauCompetences`, `GraphiqueSimple`.

Chaque composant doit avoir : états (repos, survol, focus, actif, désactivé, chargement, erreur), variantes AR/FR, test clavier.

### A3. Iconographie

- Trait 1,8–2 px, coins arrondis, 24 × 24.
- Les icônes critiques ont toujours un libellé visible ou un `aria-label`.
- En RTL, miroir uniquement pour les flèches et la progression directionnelle.

---

<a id="ux-annexe-b"></a>
## Annexe B — Checklist de validation UX

### Par page
- [ ] Objectif et utilisateur identifiés.
- [ ] Structure et hiérarchie des titres correctes.
- [ ] Toutes les actions ont un état (repos, chargement, succès, erreur).
- [ ] Aucun débordement à 375, 768, 1024, 1440 px.
- [ ] Test AR (RTL) et FR (LTR).
- [ ] Test clavier complet, focus visible.
- [ ] Contraste ≥ 4,5:1 (texte) et 3:1 (composants).
- [ ] Textes alternatifs, transcriptions, labels.
- [ ] Aucune donnée fictive affichée.
- [ ] Aucune action impossible selon le rôle.

### Par parcours
- [ ] Un élève peut faire une leçon + exercice sans aide.
- [ ] Un parent peut lier un enfant et consulter ses progrès.
- [ ] Un auteur peut soumettre, un relecteur valider, un admin publier.
- [ ] Une session expirée ne perd pas la réponse en cours.
- [ ] Une panne réseau affiche un état clair et permet de reprendre.
- [ ] Un contenu retiré ne casse pas la navigation.
- [ ] Les données d'un enfant ne sont jamais visibles par un autre parent.

### Avant pilote
- [ ] 5 élèves testent le parcours 3AP et 6AP.
- [ ] 5 parents testent U-16 sans explication préalable.
- [ ] 2 enseignants testent U-21/U-22.
- [ ] Audit WCAG AA externe.
- [ ] Test sur un téléphone d'entrée de gamme et une connexion 3G.
- [ ] Aucun contenu publié sans source et relecture.

---

> **Fin de `UX.md`.** Toute nouvelle page doit être ajoutée ici avec son identifiant `U-xx`, ses données, ses états et ses critères de validation, avant d'être développée.

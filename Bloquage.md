# Bloquage — Obstacles à la collecte, limites et solutions

| | |
|---|---|
| **Version** | 0.1 — 19 octobre 2026 |
| **Rôle** | recenser tout ce qui empêche ou limite la collecte, et ce qu'il faut faire pour avancer |
| **Documents liés** | [`AnalyseData.md`](./AnalyseData.md) (sources `D-xx`, `P-xx`) · [`Outil.md`](./Outil.md) · [`Scrpt.md`](./Scrpt.md) (scripts `SC-xx`) |
| **Principe** | aucune protection, authentification ou restriction légale n'est contournée. On privilégie la demande d'accès, le téléchargement autorisé et les sources alternatives. |

## Sommaire

- [1. Synthèse : ce qui demande votre intervention](#b1)
- [2. Accès réseau et disponibilité](#b2)
- [3. Authentification et protections anti-automatisation](#b3)
- [4. Absence ou dispersion des documents officiels](#b4)
- [5. Qualité des PDF, extraction et OCR](#b5)
- [6. Données personnelles](#b6)
- [7. Droits de réutilisation](#b7)
- [8. Informations incomplètes ou contradictoires](#b8)
- [9. Contraintes de l'environnement d'analyse](#b9)
- [10. Tableau récapitulatif](#b10)

Chaque blocage suit le même format : **source et URL · problème observé · impact · vérifications faites · solutions techniques · alternatives documentaires · intervention humaine**.

---

<a id="b1"></a>
## 1. Synthèse : ce qui demande votre intervention

| Priorité | Action | Blocages | Pourquoi c'est à vous |
|---|---|---|---|
| **1** | Écrire à la **Direction des curricula** (`dc@men.gov.ma`, adresse imprimée dans D-03 et D-04) pour obtenir les copies officielles du curriculum du primaire 2021, des programmes normaux du collège et du lycée, et de leurs orientations pédagogiques, avec une autorisation de réutilisation | B-02, B-13, B-14, B-15 | demande institutionnelle au nom du projet |
| **2** | Faire valider par un **juriste** l'application de l'article 8 de la loi 2-00 aux curricula, et le cadre de la loi 09-08 | B-15, B-10 | avis juridique |
| **3** | Demander un **accès autorisé à TelmidTICE** (partenariat ou convention avec le ministère) | B-03 | compte institutionnel ; ne doit jamais être un compte d'élève ou d'enseignant prêté |
| **4** | Relancer les sondes **depuis un réseau marocain**, hors du bac à sable de l'outil d'analyse | B-01, B-04, B-06 | accès réseau que je n'ai pas |
| **5** | Désigner un **relecteur arabophone** pour les tables de glyphes et la relecture de D-02 | B-08 | validation humaine obligatoire |
| **6** | Demander l'autorisation écrite d'**AlloSchool** (et d'autres plateformes si besoin) avant tout usage au-delà du repérage d'URL | B-15 | relation contractuelle |
| **7** | Fournir une **adresse de contact** pour le user-agent du collecteur | Scrpt.md §6.1 | identité du projet |

---

<a id="b2"></a>
## 2. Accès réseau et disponibilité

### B-01 — Domaines du ministère injoignables depuis le poste d'analyse

| | |
|---|---|
| **Sources** | <https://www.men.gov.ma/>, <https://telmidtice.men.gov.ma/>, <https://www.taalim.ma/> |
| **Problème** | `curl` répond « Could not resolve host » pour `www.men.gov.ma` et `telmidtice.men.gov.ma`, alors que `dig` résout bien ces noms (196.200.143.135 et 41.137.203.196). Par la même voie, `cnee.men.gov.ma` et `massarservice.men.gov.ma` répondent. Côté WebFetch, `men.gov.ma` répond (200), mais TelmidTICE renvoie « ECONNREFUSED » sur son adresse IPv6. |
| **Impact** | **moyen** : impossible de lire `robots.txt` et de télécharger depuis ce poste les fichiers du portail principal et de TelmidTICE |
| **Vérifications** | `curl` en HTTPS et HTTP ; `dig` sur le résolveur local et sur 1.1.1.1 ; WebFetch ; aucune variable de proxy dans l'environnement |
| **Diagnostic** | probablement une **restriction du bac à sable** de l'outil d'analyse (résolution DNS filtrée pour certains domaines). Pour TelmidTICE, la connexion refusée en IPv6 peut venir du serveur. **Non tranché.** |
| **Solutions** | retester hors du bac à sable ; forcer l'IPv4 (`httpx` avec `local_address="0.0.0.0"`) ; programmer SC-02 pour réessayer plus tard |
| **Alternatives** | miroirs des PDF officiels (AnalyseData D-02 à D-04) en attendant les copies officielles |
| **Humain** | lancer les sondes depuis un réseau marocain (action 4) |

### B-06 — Sites intermittents, fermés ou disparus

| Source | URL | Problème observé (19/10) | Impact | Solution |
|---|---|---|---|---|
| Profey | <https://www.profey.ma/> | délai dépassé après 25 s (HTTPS et HTTP) | faible | réessai à une autre heure ; sinon abandon |
| BacMaroc | `bacmaroc.org` | **le nom de domaine n'existe pas** (DNS vide sur deux résolveurs) | nul | retiré des candidats |
| Orientation Chabab | <https://orientation-chabab.com/> | **403** sur l'accueil ; `robots.txt` lisible | faible (annonces de cadres de référence) | ne pas insister ; utiliser la source CNEE |
| Madrasatii | `madrasatii.com` | **500** sur l'accueil et sur `robots.txt` | nul | retiré |
| e-mehdi, sbiro, toutcours, lemaroc, kitabi | — | aucune réponse (DNS ou connexion) | nul | retirés |
| KoolSkools | <https://www.koolskools.com/> | application JavaScript : la page sans JS ne contient qu'un `div#root` vide ; `robots.txt` renvoie la page HTML (pas de règles lisibles) | faible | Playwright **seulement** si les conditions d'utilisation l'autorisent ; sinon lecture manuelle |

---

<a id="b3"></a>
## 3. Authentification et protections anti-automatisation

### B-03 — TelmidTICE réservé aux comptes `taalim.ma` et Massar

| | |
|---|---|
| **Source** | <https://telmidtice.men.gov.ma/> |
| **Problème** | selon [Médias24 (février 2026)](https://medias24.com/2026/02/03/education-le-ministere-active-lenseignement-a-distance-en-raison-des-intemperies-1622119/), l'accès est réservé aux enseignants (compte `taalim.ma`) et aux élèves (code Massar). Je n'ai **pas pu ouvrir** la plateforme (B-01). |
| **Impact** | **élevé à terme** : c'est la plus grande base de ressources officielles (environ 12 500 selon la presse) ; **faible pour la V0**, dont la structure vient de D-02 |
| **Vérifications** | sondes `curl` et WebFetch (échec réseau) ; recherche de presse |
| **Solutions** | aucune solution technique admise sans autorisation |
| **Alternatives** | D-02 à D-07 pour la structure ; CNEE pour les sujets d'examen |
| **Humain** | demande de partenariat (action 3). **Ne jamais** utiliser un compte d'élève ou d'enseignant prêté : ce sont des données de mineurs et des identifiants personnels. |

### B-04 — Bewize derrière une protection Cloudflare

| | |
|---|---|
| **Source** | <https://bewize.ma/fr/programme-scolaire-primaire-maroc> |
| **Problème** | **503** de Cloudflare pour `curl` (user-agent simple ou de navigateur) et pour WebFetch. La page était lisible le 18/10 (Plan.md S18). |
| **Impact** | **faible** : Bewize est une interprétation privée (confiance B), utile seulement en recoupement |
| **Vérifications** | deux user-agents ; en-têtes `server: cloudflare`, `cf-ray` |
| **Solutions** | **aucun contournement** (pas de `curl_cffi`, pas de navigateur furtif, pas de solveur). Réessayer plus tard avec le user-agent déclaré ; si la protection persiste, lecture manuelle par un humain. |
| **Alternatives** | D-02 donne déjà la liste officielle des matières et des années |
| **Humain** | contacter Bewize si un partenariat est envisagé |

### B-05 — 9alami interdit tout robot

| | |
|---|---|
| **Source** | <https://www.9alami.com/> |
| **Problème** | `robots.txt` : `User-agent: *` / `Disallow: /`. L'accueil renvoie une page « Redirecting… » vers un chemin obfusqué (défi anti-robot). |
| **Impact** | nul |
| **Décision** | **exclu** de la collecte automatique |

### B-07 — Portail du CNEE : formulaires ASP.NET et archive partielle

| | |
|---|---|
| **Source** | <https://cnee.men.gov.ma/WebPrim.aspx>, `WebReg.aspx`, `WebNational.aspx` |
| **Problème** | 1) navigation par **formulaires à postback** (académie → direction → matière → année), sans URL directe par document ; 2) chemins de fichiers à la Windows (`PRIMAIRE\2013\SUJET08\08MATHS7_S.pdf`) ; 3) archive du primaire limitée à **2013 et 2018**, avec un ancien découpage des académies (« 2008-2015 ») ; 4) **pas de `robots.txt`** (404) |
| **Impact** | moyen : les sujets récents de 6AP ne sont pas disponibles ici |
| **Vérifications** | WebFetch sur WebPrim et WebNational ; sonde de `robots.txt` |
| **Solutions** | Scrapy `FormRequest` qui reproduit les choix du formulaire (`__VIEWSTATE`, `__EVENTVALIDATION`), à **faible débit** (1 requête / 15 s) ; normaliser les chemins (`\` → `/`) ; en l'absence de `robots.txt`, appliquer la politesse par défaut |
| **Alternatives** | cadres de référence (D-07) ; sujets récents publiés par les académies régionales (à rechercher) |
| **Humain** | demander au CNEE (`cne@men.gov.ma`, imprimé dans D-07) les sujets et cadres de 2023 à 2026 |

---

<a id="b4"></a>
## 4. Absence ou dispersion des documents officiels

### B-02 — Les curricula ne sont pas publiés à une adresse officielle stable

| | |
|---|---|
| **Sources** | <https://www.men.gov.ma/fr/documents-officiels> ; anciennes URL `men.gov.ma/Ar/Documents/…` |
| **Problème** | la page des documents officiels ne liste **aucun curriculum** (page 1 : Vision 2015-2030, loi-cadre, préscolaire). La version arabe renvoie **404**. Les anciennes URL testées pendant la phase précédente renvoyaient aussi 404 (Plan.md §5.3). Le curriculum du primaire 2021 n'a été trouvé **que sur des miroirs** (ostad.ma, tadrise.ma, educaprof.com…). |
| **Impact** | **élevé** : la base de la V0 repose sur une copie tierce (confiance A-m). Il est impossible de prouver que le fichier est intact. |
| **Vérifications** | WebFetch sur la page FR (page 1 sur 3) et AR ; recherches web en arabe et en français ; lecture du PDF (en-têtes de la Direction des curricula sur chaque page, dates internes de juillet 2021) |
| **Solutions** | parcourir les pages 2 et 3 et les catégories « Guides » et « Référentiels stratégiques » ; surveiller la page (SC-01, mensuel) ; comparer les empreintes et le texte des différents miroirs (SC-07) pour détecter une altération |
| **Alternatives** | plusieurs miroirs indépendants ; archives web (Wayback Machine) d'anciennes URL du ministère, à rechercher |
| **Humain** | **action 1** : demander la copie officielle et son empreinte |

### B-13 — Seuls des programmes « adaptés » sont disponibles pour le secondaire

| | |
|---|---|
| **Sources** | D-03 (collège) et D-04 (lycée), Direction des curricula, janvier 2024 |
| **Problème** | ces documents répondent aux arrêts de cours commencés le 5 octobre 2023. Ils réduisent ou réorganisent les programmes pour 2023-2024. Ce ne sont **pas** les programmes normaux. |
| **Impact** | **élevé** pour le secondaire : risque de publier un programme allégé comme s'il était le programme complet |
| **Solutions** | `programme.type = "adapte"` et `vigueur = "temporaire"` (Scrpt.md §3.3) ; remplacement dès qu'un programme normal est disponible |
| **Alternatives** | G-01 (titres de leçons du collège et du lycée, sans provenance) pour **repérer** les leçons qui manqueraient |
| **Humain** | action 1 |

### B-14 — Orientations pédagogiques du collège et du lycée introuvables

| | |
|---|---|
| **Problème** | les « التوجيهات التربوية والبرامج الخاصة » (programmes et orientations pédagogiques par matière) ne sont trouvés ni sur le site du ministère, ni par recherche directe. La recherche ne remonte que des copies partielles ou des articles qui les citent (exemple : programme de mathématiques de terminale sciences expérimentales « depuis 2007 », copie d'un enseignant). |
| **Impact** | **élevé** pour le collège et le lycée |
| **Solutions** | recherche ciblée par matière et par filière, en arabe et en français ; consultation des dépôts universitaires (ENS, CRMEF) qui les citent |
| **Humain** | action 1 ; éventuellement des enseignants du réseau du projet qui en possèdent une copie, à vérifier ensuite auprès de la source officielle |

### B-12 — Fichier officiel vide sur un miroir

| | |
|---|---|
| **Source** | <https://moutamadris.ma/wp-content/uploads/2024/02/Progra_adapte_primaire.pdf> |
| **Problème** | 2,5 Ko, 1 page, **aucun texte ni police** (Ghostscript, juillet 2024) |
| **Impact** | faible (le programme normal D-02 existe) |
| **Solutions** | SC-02 classe ces fichiers comme `suspect` (taille, absence de texte) |
| **Alternatives** | rechercher le même document sur Tawjihnet ou un autre miroir |

---

<a id="b5"></a>
## 5. Qualité des PDF, extraction et OCR

### B-08 — Texte arabe abîmé par l'encodage des polices (D-02)

| | |
|---|---|
| **Source** | D-02, curriculum du primaire 2021 (556 pages) |
| **Problème** | la couche texte existe, mais certains glyphes arabes sont mal reliés à leurs caractères Unicode : |

| Attendu | PyMuPDF | pypdf |
|---|---|---|
| المناهج | **املناهج** (lam-alef inversée) | المناهج ✅ |
| الدراسي | الدرا**5**سي | الدرا سي |
| صيغتين | **8**صيغتني | — |
| العشرات | العر**رش**ات | — |
| الصيغة | — | ال**�س**يغة |
| أن | — | **اأ**ن |
| *cellule de tableau* « الحصة » | **ةصحلا** (texte inversé par `find_tables`) | — |

| | |
|---|---|
| **Impact** | **très élevé** : c'est la source principale de la V0. Un texte faux produirait un programme faux. |
| **Vérifications** | extraction avec trois bibliothèques sur les pages 2-6, 41, 201, 288-319 et 302 (Outil.md §2) |
| **Solutions** | 1) **table de glyphes par document**, construite sur un échantillon et relue par un arabophone (Scrpt.md, SC-05) ; 2) **OCR de contrôle** des pages abîmées (rendu 300 dpi, Tesseract `ara`), avec mesure de l'écart ; 3) reconstruction des tableaux à partir des **positions** des mots (pdfplumber) au lieu du texte des cellules ; 4) **relecture humaine** de 100 % des objectifs avant le statut `corrige_humain` |
| **Alternatives** | D-03 et D-04 (2024) s'extraient proprement : le problème est propre à D-02 ; une copie officielle (B-02) pourrait avoir de meilleures polices |
| **Humain** | action 5 |

### B-09 — Formes de présentation arabes dans les documents d'enseignants

| | |
|---|---|
| **Source** | exemple : répartition annuelle de mathématiques 1AP sur AlloSchool (2018) |
| **Problème** | texte stocké en **formes de présentation** (U+FB50–U+FEFF : « اﻟﻤﺆﺳﺴﺔ ») au lieu des lettres normales |
| **Impact** | faible : se corrige automatiquement |
| **Solution** | normalisation **NFKC** (SC-05) |

### B-11 — Pas d'OCR disponible pour le tifinagh

| | |
|---|---|
| **Source** | partie amazighe de D-02 (p. 143-215) |
| **Problème** | aucun modèle Tesseract `tzm` dans `tessdata_best` (404 vérifié). La couche texte de D-02 contient bien du tifinagh Unicode (« ⴰⴷ ⴼⴰⵔⵙⵏ… »), mais sa qualité n'est pas contrôlable par OCR. |
| **Impact** | moyen (l'amazighe est une matière du primaire) |
| **Solutions** | extraire la couche texte sans contrôle OCR ; tester PaddleOCR ou un modèle communautaire **à identifier** (non vérifié) |
| **Alternatives** | ressources de l'IRCAM (<https://www.ircam.ma/>) |
| **Humain** | relecture par un enseignant d'amazighe |

### B-20 — Tableaux de droite à gauche et cellules fusionnées

| | |
|---|---|
| **Source** | D-02 : tableaux des programmes annuels (domaine / thème / objectifs) |
| **Problème** | un domaine s'étend sur plusieurs lignes (cellule fusionnée) ; les colonnes se lisent de droite à gauche ; certains tableaux sont coupés sur deux pages ; l'extraction par `find_tables` inverse le texte |
| **Impact** | élevé (structure du programme) |
| **Solutions** | regroupement par coordonnées (x de droite à gauche, y de haut en bas) ; profil de document qui déclare les colonnes ; fusion des tableaux coupés ; contrôle visuel sur une vignette de la zone source (SC-08) |

---

<a id="b6"></a>
## 6. Données personnelles

### B-10 — Noms d'enseignants et d'écoles dans les documents

| | |
|---|---|
| **Source** | documents d'enseignants hébergés par AlloSchool et d'autres plateformes ; exemple lu : la répartition annuelle de mathématiques 1AP contient le **nom de l'enseignant·e**, l'établissement et l'unité scolaire |
| **Problème** | données personnelles sans intérêt pour le programme |
| **Impact** | juridique (loi 09-08) |
| **Solutions** | ne pas télécharger les documents d'enseignants par défaut ; filtres de détection dans SC-03 et SC-04 ; conservation limitée des fichiers bruts (Scrpt.md §6.3) |
| **Exclusion** | Massar (portails personnels), comptes élèves et enseignants |
| **Humain** | action 2 (cadre CNDP) |

---

<a id="b7"></a>
## 7. Droits de réutilisation

### B-15 — Les plateformes interdisent la reproduction ; le statut des curricula est à confirmer

| Source | Conditions observées | Conséquence |
|---|---|---|
| AlloSchool ([CGU, 27/07/2021](https://www.alloschool.com/publication/cgu)) | contenus « propriété exclusive de la Société » sauf mention contraire ; reproduction interdite sans autorisation ; **liens profonds** soumis à autorisation écrite ; une partie des documents vient des utilisateurs | **repérage seulement** : liste d'URL de documents officiels, aucun contenu repris |
| Moutamadris ([conditions](https://moutamadris.ma/terms-of-use/)) | reproduction interdite ; le site dit n'être « pas affilié au ministère » et reprendre des fichiers d'autres sites | les PDF **officiels** qu'il héberge peuvent être repérés ; leur réutilisation repose sur le statut du document officiel, pas sur Moutamadris |
| 9rayti ([CGU](https://9rayti.com/article/conditions-generales-dutilisation-du-site-9rayti-com)) | reproduction soumise à autorisation ; **usage commercial interdit** | exclu |
| Bewize, IMEL | non lues (Cloudflare ; mentions légales non consultées) | exclus tant que non lues |
| Documents officiels (D-02 à D-07) | [loi 2-00, article 8](https://adala.justice.gov.ma/api/uploads/2024/12/13/Droits%20d'auteur%20et%20droits%20voisins-1734085207226.pdf) : la protection ne s'étend pas aux « textes officiels de nature législative, administrative ou judiciaire », ni aux « simples données » | **probablement** réutilisables, mais il reste à confirmer qu'un curriculum est un texte « administratif » au sens de la loi |
| Dépôts GitHub | G-01 sous MIT ; G-03 sans licence | G-01 utilisable en recoupement (MIT) ; G-03 exclu |

| | |
|---|---|
| **Impact** | **élevé** : conditionne tout usage de contenu hors documents officiels |
| **Solutions** | `portee_autorisee` par source dans `sources.yaml` (`reperage`, `extraction`) ; aucune extraction de contenu privé sans autorisation écrite |
| **Humain** | actions 2 et 6 |

---

<a id="b8"></a>
## 8. Informations incomplètes ou contradictoires

### B-16 — Divergences et intégrité

| # | Problème | Sources | Solution |
|---|---|---|---|
| 1 | Accès à TelmidTICE : sans compte (2020) ou avec compte (2026) | Telquel, Médias24 | considérer l'accès comme authentifié (B-03) |
| 2 | Cadres de référence 6AP : « 2025 » ou « 2026-2027 » | Tawjihnet, Orientation Chabab | obtenir la note ministérielle (CNEE) |
| 3 | Anglais au primaire : « intégré à moyen terme » sans volume, ou pilote en 6AP | D-02, presse | fichier `manquant` (AnalyseData V-01) |
| 4 | D-02 recompressé par iLovePDF sur un blog | métadonnées du fichier | comparer les miroirs ; copie officielle (B-02) |
| 5 | Mention « (2020-2023) » non expliquée dans le sélecteur des filières du bac du CNEE | D-06 | vérifier si elle correspond à une réforme des filières |
| 6 | Volumes horaires extraits de D-02 p. 45 dans un ordre de colonnes incertain | D-02 | contrôle visuel (AnalyseData §6.2) |

Toutes les divergences de contenu sont détaillées dans AnalyseData §8. Ce tableau ne garde que celles qui **bloquent** une décision de collecte.

---

<a id="b9"></a>
## 9. Contraintes de l'environnement d'analyse

### B-17 — Limite de l'API GitHub sans authentification

| | |
|---|---|
| **Problème** | 60 requêtes par heure sans jeton ; la limite a été atteinte pendant la vérification des outils |
| **Impact** | faible (vérifications complétées par l'API PyPI) |
| **Solution** | jeton GitHub en lecture seule pour les scripts de veille (SC-01, sources GitHub) |

### B-18 — Python trop ancien sur le poste

| | |
|---|---|
| **Problème** | Python système **3.9.6**, aucune bibliothèque installée. RapidFuzz, CAMeL Tools, OCRmyPDF et PyMuPDF 2.0 exigent Python ≥ 3.11 ; Scrapy, Pydantic et trafilatura exigent Python ≥ 3.10. Tesseract, Ghostscript, `pdftotext` et `pdfinfo` ne sont pas installés. |
| **Solution** | `uv` avec Python 3.12 et un fichier de verrouillage ; dépendances système listées dans Outil.md §12.3 |

### B-19 — Chaîne de certificats TLS incomplète

| | |
|---|---|
| **Source** | <https://www.taalimtice.ma/> |
| **Problème** | WebFetch : « unable to verify the first certificate » ; `curl` sous macOS passe (il utilise le trousseau du système) |
| **Impact** | faible (site d'actualités) |
| **Solution** | **ne jamais** désactiver la vérification TLS ; ajouter le certificat intermédiaire manquant à un bundle dédié à ce domaine, après vérification de son empreinte |

---

<a id="b10"></a>
## 10. Tableau récapitulatif

| ID | Blocage | Source | Impact | Statut | Intervention humaine |
|---|---|---|---|---|---|
| B-01 | domaines du ministère injoignables depuis le poste | men.gov.ma, TelmidTICE | moyen | à retester | oui (réseau marocain) |
| B-02 | curricula absents des adresses officielles | men.gov.ma | **élevé** | ouvert | **oui** (Direction des curricula) |
| B-03 | TelmidTICE authentifié | TelmidTICE | élevé à terme | ouvert | **oui** (partenariat) |
| B-04 | Cloudflare 503 | Bewize | faible | ouvert | facultatif |
| B-05 | `Disallow: /` + défi | 9alami | nul | exclu | non |
| B-06 | sites fermés, en erreur ou en JavaScript | Profey, Orientation Chabab, KoolSkools… | faible | partiellement exclu | non |
| B-07 | formulaires ASP.NET, archive partielle | CNEE | moyen | contournable proprement | oui (demande au CNEE) |
| B-08 | arabe abîmé dans les PDF | D-02 | **très élevé** | solution définie | **oui** (relecteur) |
| B-09 | formes de présentation | documents d'enseignants | faible | résolu par NFKC | non |
| B-10 | données personnelles dans les documents | plateformes | juridique | règle définie | oui (CNDP) |
| B-11 | pas d'OCR tifinagh | D-02 amazighe | moyen | ouvert | oui (relecteur amazighe) |
| B-12 | PDF officiel vide sur un miroir | Moutamadris | faible | contourné | non |
| B-13 | secondaire : programmes adaptés seulement | D-03, D-04 | **élevé** | ouvert | **oui** (Direction des curricula) |
| B-14 | orientations pédagogiques introuvables | collège, lycée | **élevé** | ouvert | **oui** |
| B-15 | droits de réutilisation | plateformes, curricula | **élevé** | ouvert | **oui** (juriste, plateformes) |
| B-16 | divergences et intégrité | plusieurs | moyen | suivi | partiel |
| B-17 | limite de l'API GitHub | GitHub | faible | contourné | non |
| B-18 | Python 3.9 sur le poste | environnement | faible | solution définie | non |
| B-19 | chaîne TLS incomplète | Taalimtice | faible | solution définie | non |
| B-20 | tableaux RTL et cellules fusionnées | D-02 | élevé | solution définie | oui (contrôle visuel) |

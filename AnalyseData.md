# AnalyseData — Sources du programme scolaire marocain

| | |
|---|---|
| **Version** | 0.1 — 19 octobre 2026 |
| **Rôle** | inventaire et évaluation des sources qui alimenteront les fichiers JSON de `data/` |
| **Documents liés** | [`Outil.md`](./Outil.md) (outils) · [`Scrpt.md`](./Scrpt.md) (scripts, schéma JSON) · [`Bloquage.md`](./Bloquage.md) (obstacles `B-xx`) · [`Plan.md`](./Plan.md) §5–§8 |
| **Règle** | une liste de cours n'est **jamais** une preuve de conformité au programme officiel |

> Ce document dit **quoi collecter et avec quelle confiance**. Il ne décrit ni les outils ni les scripts. Les obstacles sont détaillés dans `Bloquage.md` et seulement cités ici par leur identifiant.

## Sommaire

- [1. Méthode et niveau de preuve](#a1)
- [2. Résultat principal](#a2)
- [3. Sources officielles](#a3)
- [4. Plateformes privées et sites de ressources](#a4)
- [5. Datasets, dépôts GitHub et open data](#a5)
- [6. Ce que disent les documents officiels consultés](#a6)
- [7. Tableaux de couverture](#a7)
- [8. Divergences entre sources](#a8)
- [9. Programmes communs et spécifiques au lycée](#a9)
- [10. Priorités de collecte](#a10)
- [11. Points à investiguer](#a11)

---

<a id="a1"></a>
## 1. Méthode et niveau de preuve

### 1.1 Comment chaque source a été vérifiée

| Méthode | Ce qu'elle prouve | Marque |
|---|---|---|
| **Téléchargement direct** (`curl`) + analyse du fichier (pages, polices, texte extrait, empreinte SHA-256) | le contenu existe et a été lu | **Lu** |
| **Lecture de page** (WebFetch) | la page répond et son contenu a été résumé | **Consulté** |
| **Sonde technique** (statut HTTP, `robots.txt`, type de rendu) | accessibilité seulement, pas le contenu | **Sondé** |
| **Moteur de recherche seulement** | la source est citée ailleurs, pas ouverte | **Cité** |
| **Phase précédente** (`Plan.md` §5, 18/10/2026) | consulté hier, non revérifié aujourd'hui | **Plan** |

Toutes les vérifications datent du **19 octobre 2026**, depuis un poste situé hors d'un réseau marocain identifié. Certaines sondes ont échoué à cause de l'environnement d'analyse, pas forcément du site (voir `B-01`).

### 1.2 Trois natures de contenu, à ne jamais mélanger

| Nature | Définition | Exemple | Usage dans TeachMe |
|---|---|---|---|
| **Programme officiel** | texte émis par la Direction des curricula (مديرية المناهج), le CNEE ou le ministère | curriculum du primaire 2021 | **structure de référence** des JSON |
| **Contenu pédagogique complémentaire** | ressource produite par un enseignant ou un éditeur, rattachée à un programme | répartition annuelle, fiche, exercice | **jamais** une preuve de programme ; peut aider à vérifier un découpage |
| **Interprétation d'une plateforme** | organisation choisie par un site privé | arborescence AlloSchool, niveaux Bewize | **indice** de couverture, à confronter à l'officiel |

### 1.3 Niveaux de confiance

Ce sont les mêmes que `Plan.md` §5.1, précisés pour la collecte :

| Code | Signification | Peut remplir un JSON ? |
|---|---|---|
| **A** | document officiel obtenu à une adresse officielle | oui, statut `verifie_source` |
| **A-m** | document officiel obtenu par un **miroir** (site tiers), identité du document vérifiée (en-tête, auteur, date), mais pas l'intégrité | oui, statut `officiel_miroir`, à remplacer par la copie officielle |
| **B** | plateforme privée, information produit consultée | non, seulement en recoupement |
| **C** | presse, forum, blog | non, seulement comme piste |
| **D** | inaccessible, contradictoire ou non vérifiable | non |

---

<a id="a2"></a>
## 2. Résultat principal

1. **Le curriculum officiel du primaire existe et il est exploitable.** C'est la « صيغة نهائية كاملة » (version finale complète) de juillet 2021, signée par la Direction des curricula : 556 pages, 12 parties, toutes les matières de 1AP à 6AP. Pour chaque année, il donne des tableaux **domaines → thèmes → objectifs d'apprentissage**, ainsi que les volumes horaires hebdomadaires et la langue d'enseignement (§6). Il n'a été trouvé que **par des miroirs**, jamais sur `men.gov.ma` (`B-02`).
2. **Pour le collège et le lycée, seuls les « programmes adaptés » 2023-2024 ont été trouvés et lus.** Ce sont des documents officiels de la Direction des curricula (janvier 2024), produits après les arrêts de cours d'octobre 2023. Ils listent les leçons maintenues et les horaires, par matière et par filière. Ce **ne sont pas** les programmes normaux (`B-13`). Les orientations pédagogiques complètes (التوجيهات التربوية) du collège et du lycée n'ont pas été trouvées à une adresse officielle (`B-14`).
3. **Les examens sont la seconde source officielle.** Le portail du CNEE donne les sujets et les corrigés (primaire, régional, national), et les cadres de référence (الأطر المرجعية) décrivent les domaines évalués. Ils servent à **vérifier** la couverture, pas à définir le programme.
4. **Aucun dataset ouvert fiable n'existe.** Le seul dataset structuré trouvé (collège et lycée) ne cite aucune source. Un autre, présenté comme une API, **génère** ses données au hasard (§5).
5. **Les plateformes privées interdisent la réutilisation** dans leurs conditions d'utilisation (AlloSchool, Moutamadris, 9rayti). Elles restent utiles pour **repérer** des documents officiels qu'elles hébergent, mais pas comme source de contenu (`B-15`).

---

<a id="a3"></a>
## 3. Sources officielles

Pour chaque source : URL, organisme, couverture, contenu, format, fiabilité, fraîcheur, accès, intérêt.

### D-01 — Portail du ministère, documents officiels

| | |
|---|---|
| **URL** | <https://www.men.gov.ma/fr/documents-officiels> |
| **Organisme** | Ministère de l'Éducation nationale, du Préscolaire et des Sports |
| **Vérification** | **Consulté** (WebFetch). La version arabe `/ar/documents-officiels` renvoie **404**. |
| **Niveaux** | transversal, préscolaire |
| **Contenu** | catégories : Discours royaux, Éducation nationale, Études et statistiques, Guides, Préscolaire, Rapports et bilans, Référentiels stratégiques, Sports, Textes juridiques. La page 1 contient la Vision 2015-2030, la loi-cadre 51.17 et des guides du préscolaire. **Aucun curriculum du primaire, du collège ou du lycée n'y figure.** |
| **Format** | HTML rendu côté serveur, liens PDF directs (`/sites/default/files/2026-02/…`), pagination `?page=N` (3 pages) |
| **Fiabilité** | A |
| **Fraîcheur** | les dossiers `2026-02` et `2026-03` donnent la date de mise en ligne, pas la date de publication |
| **Accès** | lisible par WebFetch ; injoignable par `curl` depuis le poste d'analyse (`B-01`) |
| **Intérêt** | **moyen** : cadre légal et stratégique ; à surveiller, car la Direction des curricula pourrait y publier les programmes |

### D-02 — Curriculum de l'enseignement primaire, juillet 2021 (version finale complète)

| | |
|---|---|
| **Titre** | « المنهاج الدراسي للتعليم الابتدائي — الصيغة النهائية الكاملة — يوليوز 2021 » |
| **URL lue (miroir)** | <https://www.ostad.ma/wp-content/uploads/2021/07/المنهاج-الدراسي-للتعليم-الابتدائي.pdf> |
| **Autres miroirs cités** | [tadrise.ma](https://www.tadrise.ma/2024/07/pdf_12.html), [jadidalwadifa.com](https://www.jadidalwadifa.com/2021/07/Curriculum-Primaire.html), [educaprof.com](https://www.educaprof.com/2021/07/2021_41.html), [asslmd.com](https://www.asslmd.com/2021/07/2021.html) — **Cités**, non téléchargés |
| **Organisme** | Direction des curricula (en-tête de chaque page : « مديرية المناهج، يوليوز 2021 ») |
| **Vérification** | **Lu** : 556 pages, 5,04 Mo, créé le 27/07/2021, modifié le 29/07/2021, SHA-256 `c9d5fdb0e74a690a…`. Producteur : Acrobat 9.5.5, puis **iLovePDF** (le fichier a été recompressé par un tiers : `B-16`). |
| **Niveaux et années** | primaire, 1AP → 6AP |
| **Matières** | 12 parties (signets du PDF) : cadre général (p. 2) · arabe (p. 56) · amazighe (p. 143) · français (p. 216) · mathématiques (p. 272) · activité scientifique (p. 347) · éducation islamique (p. 401) · sciences sociales — histoire, géographie, éducation civique (p. 444) · éducation artistique (p. 471) · éducation physique (p. 492) · compétences de vie, « المهارات الحياتية » (p. 503) · activités de développement des compétences de vie (p. 534) |
| **Contenus** | profils de sortie, compétences par cycle et par année, organisation en unités de 5 semaines, **tableaux par année : domaines (المجالات) → thèmes (المواضيع) → objectifs d'apprentissage (أهداف التعلم)**, matrice matières × années, volumes horaires, langue d'enseignement |
| **Format** | PDF avec couche texte (644 polices), 25 images. Le texte arabe sort **abîmé** par l'encodage des polices (`B-08`). Le français sort propre. Le tifinagh (amazighe) est présent en Unicode dans la couche texte. |
| **Fiabilité** | **A-m** : document officiel, obtenu par un miroir |
| **Fraîcheur** | juillet 2021. Programme en vigueur selon les sources consultées ; des ajustements liés aux « مدارس الريادة » (écoles pionnières) sont possibles et non vérifiés (§11) |
| **Accès** | téléchargement direct, aucune restriction technique |
| **Intérêt** | **essentiel** : c'est la colonne vertébrale de tous les JSON du primaire |

### D-03 — Programmes adaptés du collège 2023-2024

| | |
|---|---|
| **URL lue (miroir)** | <https://moutamadris.ma/wp-content/uploads/2024/02/Progra_adapte_College.pdf> |
| **Organisme** | Direction des curricula (en-tête, adresse à Rabat, courriel `dc@men.gov.ma`) |
| **Vérification** | **Lu** : 77 pages, 2,9 Mo, créé le 25/01/2024 (InDesign), SHA-256 `05746e1431e02b11…`. pypdf extrait l'arabe correctement. |
| **Niveaux** | collège, 1AC → 3AC |
| **Matières** | éducation islamique, arabe, sciences sociales, mathématiques, SVT, physique-chimie, français, enseignement originel |
| **Contenus** | liste des leçons maintenues, organisation par semaine, références réglementaires |
| **Fiabilité** | A-m, mais **programme temporaire** (`B-13`) |
| **Intérêt** | **élevé pour l'inventaire des leçons** du collège ; ne remplace pas le programme normal |

### D-04 — Programmes adaptés du lycée 2023-2024

| | |
|---|---|
| **URL lue (miroir)** | <https://moutamadris.ma/wp-content/uploads/2024/02/Progra_adapte_Lycee.pdf> |
| **Organisme** | Direction des curricula |
| **Vérification** | **Lu** : 336 pages, 9,6 Mo, créé le 25/01/2024, SHA-256 `7332341fc968452d…`. Le texte français (physique-chimie BIOF, p. 151 : « Transformations lentes et transformations rapides… 4h ») est propre. |
| **Niveaux** | lycée : tronc commun, 1re et 2e année du bac |
| **Matières** (sommaire p. 3) | arabe, français, anglais, philosophie, mathématiques, physique-chimie, SVT, histoire-géographie, éducation islamique, enseignement originel, sciences de l'ingénieur, économie et gestion, arts appliqués, espagnol, allemand, italien |
| **Références citées** | arrêté 2385.06 (16/10/2006) sur le bac, modifié par l'arrêté 162.19 (28/01/2019) ; note 43 (22/03/2006) sur l'organisation des études secondaires ; note 001-24 (02/01/2024) |
| **Fiabilité** | A-m, programme temporaire |
| **Intérêt** | **élevé** : seule source officielle lue qui détaille les leçons par filière scientifique |

### D-05 — Programme adapté du primaire 2023-2024

| | |
|---|---|
| **URL** | <https://moutamadris.ma/wp-content/uploads/2024/02/Progra_adapte_primaire.pdf> |
| **Vérification** | **Lu** : 1 page, 2,5 Ko, **aucun texte ni police** (fichier vide ou cassé, Ghostscript, 21/07/2024) |
| **Fiabilité** | D (`B-12`) |
| **Intérêt** | nul en l'état ; il faut retrouver le vrai fichier |

### D-06 — CNEE, portail des examens certificatifs

| | |
|---|---|
| **URL** | <https://cnee.men.gov.ma/> · primaire <https://cnee.men.gov.ma/WebPrim.aspx> · national <https://cnee.men.gov.ma/WebNational.aspx> · régional `WebReg.aspx` |
| **Organisme** | Centre national de l'évaluation et des examens |
| **Vérification** | **Sondé** (accueil 200, `robots.txt` absent : 404) et **Consulté** (WebPrim, WebNational) |
| **Primaire** | académie → direction provinciale → matière (mathématiques ; arabe et éducation islamique ; français) → année (**2013 et 2018** seulement). Sujets et corrigés en PDF (`PRIMAIRE\2013\SUJET08\08MATHS7_S.pdf`). Plusieurs académies portent la mention « 2008-2015 » (ancien découpage régional). |
| **National (bac)** | 12 filières : lettres et sciences humaines, enseignement originel, services, **sciences expérimentales**, **sciences mathématiques**, sciences et technologies, agriculture, arts appliqués, génie électrique, génie mécanique, sciences économiques et gestion, génie civil et travaux publics ; sessions normale et de rattrapage ; année affichée 2019 ; une mention « 2020-2023 » non expliquée |
| **Format** | ASP.NET WebForms (sélecteurs à postback), PDF |
| **Fiabilité** | A |
| **Fraîcheur** | archive ancienne et partielle (`B-07`) |
| **Intérêt** | **moyen** : sert à vérifier les domaines évalués et à préparer plus tard la partie examens ; ne définit pas le programme |

### D-07 — Cadres de référence des examens (الأطر المرجعية)

| | |
|---|---|
| **URL lue (miroir)** | <https://www.tawjihnet.net/actualites/wp-content/uploads/2022/06/PRIMAIRE-PROVINCIAL-Math_2022.pdf> |
| **Organisme** | CNEE (en-tête « المركز الوطني للتقويم والامتحانات », courriel `cne@men.gov.ma`) |
| **Vérification** | **Lu** : 6 pages, Word 2013, mai-juin 2022, texte arabe extractible |
| **Contenu** | cadre de référence de l'examen provincial unifié de 6AP en mathématiques : domaines de contenu, niveaux cognitifs, poids de chaque domaine |
| **Versions récentes** | 2025 et « 2026-2027 » annoncées par [tawjihnet.net](https://www.tawjihnet.net/vb/threads/134670/) et [orientation-chabab.com](https://orientation-chabab.com/الأطر-المرجعية-للإمتحان-الموحد-الإقليمي-السادس-ابتدائي) — **Cités** ; les libellés d'année se contredisent (`B-16`) |
| **Fiabilité** | A-m (2022) ; C pour les versions annoncées |
| **Intérêt** | **élevé pour la 6AP** : définit ce qui est évalué en fin de primaire |

### D-08 — TelmidTICE

| | |
|---|---|
| **URL** | <https://telmidtice.men.gov.ma/> |
| **Organisme** | ministère |
| **Vérification** | **échec** : connexion refusée (IPv6) côté WebFetch, injoignable côté `curl` (`B-01`) |
| **Ce que dit la presse** | environ 12 500 ressources (11 000 leçons illustrées, 1 000 exercices interactifs, plus de 500 examens blancs) selon la MAP en 2023, relayée par [Hespress](https://fr.hespress.com/361370-361370.html). Accès réservé aux enseignants (compte `taalim.ma`) et aux élèves (code Massar) selon [Médias24, février 2026](https://medias24.com/2026/02/03/education-le-ministere-active-lenseignement-a-distance-en-raison-des-intemperies-1622119/). En 2020, l'accès était sans compte selon [Telquel](https://telquel.ma/2020/03/18/enseignement-a-distance-comment-ca-marche_1673723). |
| **Fiabilité** | A par l'origine, **D** pour nous (non consulté) |
| **Accès** | authentification (`B-03`) |
| **Intérêt** | potentiellement **élevé** (ressources officielles par niveau) ; uniquement par accès autorisé |

### D-09 — Massar (Waliye, Moutamadris)

| | |
|---|---|
| **URL** | <https://massarservice.men.gov.ma/> (sondé, 200) |
| **Nature** | portails personnels (notes, absences) |
| **Décision** | **exclu** : uniquement des données personnelles, aucune donnée de programme |

### D-10 — Portail open data du gouvernement

| | |
|---|---|
| **URL** | <https://www.data.gov.ma/> · API CKAN `…/data/api/3/action/package_search?q=enseignement` |
| **Vérification** | **Lu** par l'API : 14 jeux pour « enseignement », licence **ODbL** |
| **Contenu** | listes d'établissements (primaire, collège, qualifiant, privé, CPGE), mises à jour en septembre 2026 ; données de formation des cadres de 2014 |
| **Intérêt** | **nul pour le programme**. Possible plus tard pour un annuaire d'écoles (Plan.md, lot « écoles »). |

### D-11 — Loi 2-00 sur le droit d'auteur, version consolidée

| | |
|---|---|
| **URL** | <https://adala.justice.gov.ma/api/uploads/2024/12/13/Droits%20d'auteur%20et%20droits%20voisins-1734085207226.pdf> |
| **Organisme** | ministère de la Justice (version consolidée au 5 janvier 2023) |
| **Vérification** | **Lu** : l'article 8 exclut de la protection « les textes officiels de nature législative, administrative ou judiciaire » et les « simples données » |
| **Intérêt** | **décisif pour la réutilisation** des programmes officiels ; l'application à un curriculum doit être validée par un juriste (`B-15`) |

### D-12 — Autres organismes publics (sondés)

| Organisme | URL | Vérification | Intérêt |
|---|---|---|---|
| IRCAM (amazighe) | <https://www.ircam.ma/> | Sondé (200, `robots.txt` présent) | ressources amazighes, à explorer pour la partie amazighe de D-02 |
| CSEFRS | <https://www.csefrs.ma/> | Sondé (200, WordPress, sitemap) | rapports d'évaluation (PNEA) : contexte, pas de programme |
| Taalimtice | <https://www.taalimtice.ma/> | Sondé (200, Drupal) | actualités du ministère et de ses partenaires ; certificat TLS incomplet pour certains clients (`B-19`) |
| GEI Edumedia (dépôt allemand) | <https://edumedia-depot.gei.de/bitstream/handle/11163/7899/1817335960.pdf?sequence=1> | Cité (redirection 301 non suivie) | curriculum d'éducation islamique du secondaire, juin 2016, Direction des curricula — **à télécharger** |

---

<a id="a4"></a>
## 4. Plateformes privées et sites de ressources

Aucune de ces sources ne peut remplir un JSON. Elles servent à repérer des documents officiels et à recouper une couverture.

| ID | Plateforme | URL | Vérification (19/10) | Niveaux | Organisation observée | `robots.txt` | Conditions de réutilisation | Intérêt |
|---|---|---|---|---|---|---|---|---|
| P-01 | **AlloSchool** | <https://www.alloschool.com/category/primary> | **Lu** | primaire → bac | catégorie → cours (année × matière) → sections (« البرنامج البيداغوجي », fiches, leçons, devoirs S1/S2) → éléments ; PDF en lien direct `/assets/documents/course-N/…pdf` | tout autorisé, **`Crawl-delay: 10`** | [CGU du 27/07/2021](https://www.alloschool.com/publication/cgu) : contenus « propriété exclusive de la Société », reproduction interdite sans autorisation écrite ; liens profonds soumis à autorisation ; une partie des documents vient des utilisateurs (`/element/contribe/upload`) | **repérage** : la section « البرنامج البيداغوجي » pointe vers des répartitions annuelles d'enseignants (exemple lu : 1AP maths, 2015/16, nom de l'enseignant en clair → `B-10`) |
| P-02 | **Bewize** | <https://bewize.ma/fr/programme-scolaire-primaire-maroc> | **échec** : Cloudflare 503 (`curl` et WebFetch) | primaire | 6 niveaux, 2 cycles, 34 semaines (Plan.md, S18) | tout autorisé sauf `/api/`, `/_next/`, `/admin/` ; sitemap | non lues (page inaccessible) | recoupement de l'offre (anglais, amazighe) ; `B-04` |
| P-03 | **IMEL** | <https://www.imel.ma/programmes/primaire> | Sondé (200) + Plan | primaire → lycée | P1-P4, P5-P6, collège, lycée ; séances de 55 min ; tarifs | tout autorisé ; sitemap | [mentions légales](https://www.imel.ma/mentions-legales) non lues | offre commerciale, pas de programme détaillé |
| P-04 | **Moutamadris** | <https://moutamadris.ma/> | Sondé + [conditions](https://moutamadris.ma/terms-of-use/) consultées | primaire → bac | WordPress ; héberge des PDF officiels (D-03, D-04) | `/wp-admin/` interdit ; sitemaps | reproduction interdite ; le site dit n'être « pas affilié au ministère » et reprendre des fichiers d'autres sites | **repérage de PDF officiels** |
| P-05 | Dyrassa | <https://dyrassa.com/> | Sondé (200, WordPress) | primaire → bac | cours, exercices | permissif ; `sitemap_index.xml` | [politique de confidentialité](https://dyrassa.com/privacy-policy/) seulement | faible |
| P-06 | Talamidi | <https://talamidi.com/> | Sondé (200) | primaire → bac | cours, devoirs | `/view/` interdit ; sitemap | non trouvées | faible |
| P-07 | 9rayti | <https://9rayti.com/> | Sondé + [CGU](https://9rayti.com/article/conditions-generales-dutilisation-du-site-9rayti-com) consultées | collège → bac, orientation | articles, cours | présent | reproduction soumise à autorisation, **usage commercial interdit** | faible |
| P-08 | Ostad.ma | <https://www.ostad.ma/> | Sondé (200) | tous | blog ; héberge D-02 et un « المرجع في الرياضيات للمستوى الرابع » de la Direction des curricula | présent | non trouvées | **repérage de PDF officiels** |
| P-09 | Tawjihnet | <https://www.tawjihnet.net/> | Sondé (200) | tous, orientation | forum + fichiers (cadres de référence, programmes adaptés, « وثيقة مرجعية لتكييف البرامج » de 2024) | présent | [confidentialité](https://www.tawjihnet.net/vb/help/privacy-policy/) | **repérage** de documents officiels |
| P-10 | Tadrise, Educaprof, Jadidalwadifa… | voir D-02 | Cités / sondés | primaire | blogs qui republient D-02 | variables | non lues | miroirs de secours pour D-02 |
| P-11 | ProfPC, PC1 | <https://www.profpc.ma/>, <https://www.pc1.ma/> | Sondés (200, pas de `robots.txt`) | collège, lycée (physique-chimie) | cours et exercices | absent | non lues | faible, à garder en réserve pour les filières scientifiques |
| P-12 | KoolSkools | <https://www.koolskools.com/> | Sondé : application JavaScript, page vide sans JS | — | — | `robots.txt` renvoie la page HTML | non lues | faible ; `B-06` |
| P-13 | 9alami | <https://www.9alami.com/> | Sondé : **`Disallow: /`** + redirection anti-robot | — | — | tout interdit | — | **exclu** ; `B-05` |
| P-14 | Profey | <https://www.profey.ma/> | Échec : délai dépassé | — | — | — | — | non évaluable ; `B-06` |
| P-15 | Orientation Chabab | <https://orientation-chabab.com/> | Sondé : **403** | — | annonces de cadres de référence | — | — | `B-06` |

**Lecture d'ensemble.** AlloSchool a la couverture la plus large (Plan.md §4.2) et la structure la plus régulière. Mais ses CGU interdisent la reproduction, et une partie de ses documents vient d'utilisateurs. **Les seules informations qu'on peut en tirer sans conflit sont des faits** : « telle année a telle matière », « telle section contient un document officiel hébergé à telle adresse ». Ces faits doivent ensuite être confirmés par l'officiel.

---

<a id="a5"></a>
## 5. Datasets, dépôts GitHub et open data

| ID | Dépôt / dataset | Licence | Contenu vérifié | Provenance | Décision |
|---|---|---|---|---|---|
| G-01 | [Yass5002/moroccan-educational-system](https://github.com/Yass5002/moroccan-educational-system) | MIT | **Lu** : `curriculum.json` (55 Ko), collège et lycée, **titres de leçons en français** (option BIOF) par filière ; `devoirs.json`, `exams.json` (coefficients, durées) ; script de validation | **aucune source par élément** (une seule occurrence du mot « source » dans tout le fichier) | **recoupement uniquement** pour le collège et le lycée scientifiques ; jamais importé tel quel |
| G-02 | [K11E3R/moroccan-education-API](https://github.com/K11E3R/moroccan-education-API) | MIT | **Lu** : le script `collectors/generate_quality_data.py` **génère** des données (`import random`, « Generates comprehensive, realistic education data ») et cite AlloSchool, 9rayti, Dyrassa, men.gov.ma et TelmidTICE comme « sources » | fabriquée | **rejeté** : contraire à la règle « aucune donnée inventée » |
| G-03 | [mohamed-bella/alloschoolApi](https://github.com/mohamed-bella/alloschoolApi) | aucune | un JSON de liens AlloSchool (2023) | copie d'AlloSchool | **rejeté** (aucune licence, CGU AlloSchool) |
| G-04 | [MBZUAI-Paris/DarijaMMLU](https://huggingface.co/datasets/MBZUAI-Paris/DarijaMMLU), [2A2I-R/MMLU-Darija](https://huggingface.co/datasets/2A2I-R/MMLU-Darija) | à vérifier | Cités (API Hugging Face) | évaluation de modèles de langue en darija | hors périmètre |
| G-05 | [slonl/curriculum-lpib](https://github.com/slonl/curriculum-lpib) | à vérifier | Cité | curriculum néerlandais structuré par JSON Schema | **modèle d'inspiration** pour le schéma (Scrpt.md §3) |
| G-06 | data.gov.ma (D-10) | ODbL | Lu | officielle | annuaire d'établissements seulement |

**Conclusion.** Aucun jeu existant ne peut servir de base : soit il n'a pas de provenance, soit il est inventé. TeachMe doit construire le sien à partir de D-02 à D-07.

---

<a id="a6"></a>
## 6. Ce que disent les documents officiels consultés

Ces faits sont **extraits automatiquement** de D-02 (pypdf). L'ordre des colonnes du tableau horaire est **à confirmer visuellement**, parce que l'extraction d'un tableau de droite à gauche peut inverser les colonnes (`B-08`).

### 6.1 Matrice officielle des matières du primaire (D-02, p. 34)

| Domaine | Matière | 1AP | 2AP | 3AP | 4AP | 5AP | 6AP |
|---|---|---|---|---|---|---|---|
| Langues | Arabe | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Langues | Amazighe | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Langues | Français | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Langues | Anglais | `**` « intégré à moyen terme, après la formation des enseignants » | | | | | |
| Maths, sciences, technologie | Mathématiques | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Maths, sciences, technologie | Activité scientifique | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Socialisation et épanouissement | Éducation islamique | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Socialisation et épanouissement | Sciences sociales (histoire, géographie, éducation civique) | — | — | — | ✅ | ✅ | ✅ |
| Socialisation et épanouissement | Éducation artistique | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Socialisation et épanouissement | Éducation physique | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Socialisation et épanouissement | Compétences de vie (المهارات الحياتية) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

La même page donne le nombre de compétences par année : **9, 9, 9, 10, 10, 10**. Les sciences sociales comptent trois coches, que le reste du document place en **4AP, 5AP et 6AP** : c'est cohérent avec AlloSchool.

### 6.2 Volumes horaires et langue d'enseignement (D-02, p. 45)

| Matière | Langue d'enseignement | Volume hebdomadaire extrait |
|---|---|---|
| Arabe | arabe | valeurs 10 h, 9 h, 8 h 30, 6 h, 6 h, 6 h (ordre des années à confirmer) |
| Amazighe | amazighe | 3 h chaque année |
| Français | français | valeurs 4 h, 5 h, 6 h, 6 h, 6 h, 6 h (ordre à confirmer) |
| Mathématiques | **arabe / français** | 5 h chaque année |
| Activité scientifique | **arabe / français** | 2 h chaque année |
| Éducation islamique | arabe | 3 h chaque année |
| Sciences sociales | arabe | entre 1 h et 1 h 30 (4AP–6AP), détail à confirmer |
| Éducation artistique | arabe | entre 1 h et 1 h 30, détail à confirmer |
| Éducation physique | arabe | valeurs à confirmer |
| Compétences de vie | arabe / français | 30 min |
| **Total** | | **30 h** par semaine, chaque année |

Une note précise que l'anglais sera intégré « à moyen terme », c'est-à-dire « six ans après le début de la réforme ».

### 6.3 Structure d'un programme annuel (mathématiques 2AP, D-02, p. 302)

Le tableau de chaque année a trois colonnes : **domaine** (المجالات), **thème** (المواضيع), **objectifs d'apprentissage** (أهداف التعلم). Voici un exemple, **reconstitué à la main** à partir du texte abîmé :

- Domaine : « الأعداد والحساب » (nombres et calcul)
  - Thème : « الأعداد من 0 إلى 99 »
    - Objectif : « يتعرف القيمة المكانية لأرقام عدد معين (الوحدات والعشرات) »
    - Objectif : « يقرأ الأعداد من 0 إلى 99 ويكتبها ويقارنها ويرتبها »

L'année de mathématiques est découpée en **unités d'enseignement de 5 semaines** : 4 semaines de construction des apprentissages, puis 1 semaine d'évaluation et de soutien. La semaine compte 5 séances de 60 minutes (p. 289). Cette **organisation dans le temps** n'est pas la même chose que la **structure du contenu** (domaines, thèmes). Le schéma JSON les garde séparées (Scrpt.md §3).

---

<a id="a7"></a>
## 7. Tableaux de couverture

Légende : **F** = fiable (officiel lu, A ou A-m) · **P** = partiel (officiel temporaire, ou privé seulement) · **R** = recoupement seulement (B ou C) · **∅** = aucune source · **NA** = la matière n'existe pas à ce niveau.

### 7.1 Primaire — structure du programme (domaines, thèmes, objectifs)

| Matière | 1AP | 2AP | 3AP | 4AP | 5AP | 6AP | Source principale | Réserves |
|---|---|---|---|---|---|---|---|---|
| Arabe | F | F | F | F | F | F | D-02 p. 56 | texte arabe abîmé (`B-08`) |
| Amazighe | F | F | F | F | F | F | D-02 p. 143 | tifinagh : pas d'OCR disponible (`B-11`) ; déploiement réel par académie à vérifier |
| Français | F | F | F | F | F | F | D-02 p. 216 | texte propre |
| Mathématiques | F | F | F | F | F | F | D-02 p. 272 | tableaux à reconstituer |
| Activité scientifique | F | F | F | F | F | F | D-02 p. 347 | — |
| Éducation islamique | F | F | F | F | F | F | D-02 p. 401 | relecture par un enseignant qualifié (Plan.md §6.5) |
| Sciences sociales | NA | NA | NA | F | F | F | D-02 p. 444 | — |
| Éducation artistique | F | F | F | F | F | F | D-02 p. 471 | — |
| Éducation physique | F | F | F | F | F | F | D-02 p. 492 | hors MVP (Plan.md §6.5) |
| Compétences de vie | F | F | F | F | F | F | D-02 p. 503 et 534 | ajoutée à Plan.md le 19/10 (§8, V-02) |
| Anglais | ∅ | ∅ | ∅ | ∅ | ∅ | ∅ | — | pas de programme dans D-02 ; pilote 6AP selon la presse (Plan.md S31, S32) |

### 7.2 Primaire — examens et évaluation

| Élément | Statut | Source |
|---|---|---|
| Matières évaluées en 6AP | F | D-06 : mathématiques ; arabe et éducation islamique ; français |
| Cadre de référence 6AP mathématiques | F (2022) / R (2025) | D-07 |
| Cadres de référence 6AP arabe, français | ∅ lu | annoncés par tawjihnet (C) |
| Sujets et corrigés 6AP | P | D-06 (2013, 2018, certaines académies seulement) |

### 7.3 Collège (1AC–3AC)

| Matière | 1AC | 2AC | 3AC | Source | Réserves |
|---|---|---|---|---|---|
| Arabe, français, éducation islamique, sciences sociales | P | P | P | D-03 (adapté) ; AlloSchool (R) | programme normal non trouvé |
| Mathématiques | P | P | P | D-03 ; G-01 (R) | — |
| Physique-chimie, SVT | P | P | P | D-03 ; G-01 (R) | — |
| Anglais, informatique, technologie, arts, EPS | R | R | R | AlloSchool (R) | absents de D-03 |
| Examen régional 3AC | R | | | G-01 (R), D-06 régional (non consulté) | — |

### 7.4 Lycée — priorité aux filières scientifiques

| Matière | TC Sciences | 1Bac SE | 1Bac SM | 2Bac PC | 2Bac SVT | 2Bac SM A/B | Source |
|---|---|---|---|---|---|---|---|
| Mathématiques | P | P | P | P | P | P | D-04 ; G-01 (R) |
| Physique-chimie | P | P | P | P | P | P | D-04 |
| SVT | P | P | P | P | P | P | D-04 |
| Arabe, français, anglais, philosophie, éducation islamique, histoire-géographie | P | P | P | P | P | P | D-04 (matières communes, portée par filière à vérifier) |
| Sciences de l'ingénieur | NA | NA | P | NA | NA | P (SM B) | D-04 |
| Examen national | P | | | P | P | P | D-06 national ; G-01 (R) |

**Autres filières (à ne pas confondre)** : tronc commun Technologies, Lettres et sciences humaines, Enseignement originel ; 1Bac et 2Bac Sciences et technologies électriques / mécaniques, Sciences économiques et gestion, Lettres, Sciences humaines, Arts appliqués, Sciences agronomiques, filières professionnelles. Elles sont **identifiées** (D-06, D-04), mais **pas cartographiées** dans cette phase.

---

<a id="a8"></a>
## 8. Divergences entre sources

| # | Sujet | Source 1 | Source 2 | Conséquence |
|---|---|---|---|---|
| V-01 | Anglais au primaire | D-02 : « intégré à moyen terme », aucun volume horaire | Plan.md §6.2 : « optionnel / variable » ; presse : pilote en 6AP | JSON anglais du primaire = `manquant`, avec la raison ; matière désactivée par défaut |
| V-02 | Compétences de vie | D-02 : matière de 1AP à 6AP (30 min) + activités dédiées | absente de Plan.md §6.2 et §7 | reporté dans Plan.md §6.2 (référentiel des matières, Lot 2) |
| V-03 | Amazighe | D-02 : 1AP–6AP, 3 h | Plan.md : « statut à vérifier » | le programme existe ; reste à vérifier le **déploiement réel** par académie |
| V-04 | Langue des maths et des sciences | D-02 : « arabe / français » | Plan.md : arabe par défaut | le JSON doit porter `langues_enseignement` (liste) |
| V-05 | Programmes du secondaire | D-03 et D-04 : version **adaptée** 2023-2024 | programme normal (non trouvé) | ne jamais étiqueter un JSON issu de D-03 ou D-04 comme « programme officiel en vigueur » sans le préciser |
| V-06 | Accès à TelmidTICE | Telquel 2020 : sans compte | Médias24 2026 : `taalim.ma` ou Massar | considérer l'accès comme authentifié |
| V-07 | Cadres de référence 6AP | forum : « 2025 », réutilisé en 2026 | autre site : « 2026-2027 » | obtenir la note ministérielle (`B-16`) |
| V-08 | Intégrité de D-02 | en-têtes Direction des curricula, 2021 | fichier repassé par iLovePDF sur un blog | comparer avec une copie officielle (`B-02`) |
| V-09 | Organisation annuelle | D-02 : unités de 5 semaines | presse 2020 : « six unités au lieu de huit » ; Bewize : 34 semaines | cohérent (6 × 5 = 30 semaines d'apprentissage) ; à confirmer par le calendrier officiel de l'année |

---

<a id="a9"></a>
## 9. Programmes communs et spécifiques au lycée

Le risque principal au lycée est de **dupliquer** un programme commun ou de **fusionner** deux programmes différents.

| Situation | Exemple (à vérifier) | Règle de modélisation |
|---|---|---|
| Même programme, plusieurs filières | arabe ou philosophie dans plusieurs filières d'une même année | **un seul** JSON dans `_commun/`, avec la liste `filieres` (Scrpt.md §2) |
| Même matière, programmes différents | mathématiques de 2Bac SM ≠ mathématiques de 2Bac PC | un JSON **par filière** (et par option : `pc`, `svt`, `sm_a`, `sm_b`) |
| Même programme, langue d'enseignement différente | option internationale française (BIOF) des sciences | **hypothèse** : même contenu, autre langue ; attribut `langue_enseignement`, jamais un programme séparé tant que l'officiel ne le dit pas |
| Matière propre à une filière | sciences de l'ingénieur (SM B, STE, STM) | JSON dans le dossier de la filière seulement |

Le niveau de détail par filière et par option doit venir de D-04 et, plus tard, des orientations pédagogiques officielles. G-01 sert à **repérer** les écarts entre filières, pas à les définir.

---

<a id="a10"></a>
## 10. Priorités de collecte

| Priorité | Source | Pourquoi | Cible |
|---|---|---|---|
| 1 | **D-02**, primaire 2021 | seule base officielle complète du primaire | JSON 1AP–6AP, toutes matières (V0) |
| 2 | **D-07** + **D-06** primaire | fin de primaire évaluée | contrôle de couverture 6AP |
| 3 | **D-04** filières scientifiques | priorité secondaire demandée | JSON TC Sciences, 1Bac SE/SM, 2Bac PC/SVT/SM (statut `programme_adapte`) |
| 4 | **D-03** collège | continuité 6AP → 1AC | JSON 1AC–3AC (statut `programme_adapte`) |
| 5 | Copies officielles de D-02 à D-04 | intégrité et version (A au lieu de A-m) | demande à la Direction des curricula (`B-02`) |
| 6 | TelmidTICE | ressources officielles | uniquement avec un accès autorisé (`B-03`) |
| — | AlloSchool, Moutamadris, Ostad, Tawjihnet | repérer de nouveaux PDF officiels | liste d'URL candidates, **sans** reprise de contenu |

---

<a id="a11"></a>
## 11. Points à investiguer

- [ ] Trouver D-02, D-03 et D-04 à une **adresse officielle**, ou obtenir une copie certifiée et son empreinte (`B-02`).
- [ ] Vérifier si des **ajustements après 2021** existent pour le primaire (écoles pionnières, « مدارس الريادة », programme TaRL, manuels unifiés évoqués par [Hespress](https://fr.hespress.com/370023-370023.html)).
- [ ] Retrouver les **orientations pédagogiques** complètes du collège et du lycée (`B-14`).
- [ ] Télécharger le curriculum d'éducation islamique du secondaire de 2016 (D-12, GEI).
- [ ] Confirmer **visuellement** les volumes horaires de D-02 p. 45 (§6.2).
- [ ] Vérifier le **déploiement réel** de l'amazighe et de l'anglais par académie pour 2026-2027.
- [ ] Obtenir les cadres de référence 6AP les plus récents (arabe, français, mathématiques) depuis une source CNEE.
- [ ] Faire valider par un juriste l'application de l'article 8 de la loi 2-00 aux curricula (`B-15`).
- [ ] Retester TelmidTICE, Bewize, Profey et Taalim depuis un réseau marocain (`B-01`, `B-04`, `B-06`).
- [x] Mettre à jour `Plan.md` §6.2, §6.5, §7.7 et §12 avec V-01 à V-04 (fait le 19/10/2026).

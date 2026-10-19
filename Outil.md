# Outil — Comparaison et choix des outils de collecte

| | |
|---|---|
| **Version** | 0.1 — 19 octobre 2026 |
| **Rôle** | choisir les outils Python et open source de la collecte, de l'extraction et de la validation |
| **Documents liés** | [`AnalyseData.md`](./AnalyseData.md) (sources `D-xx`, `P-xx`) · [`Scrpt.md`](./Scrpt.md) (scripts `SC-xx`) · [`Bloquage.md`](./Bloquage.md) (`B-xx`) |
| **Vérification** | versions et licences relevées le 19/10/2026 sur PyPI et l'API GitHub ; extraction PDF **testée** sur les documents réels D-02, D-03, D-04 et D-07 |

## Sommaire

- [1. Besoins réels de TeachMe](#o1)
- [2. Test réalisé sur les vrais documents](#o2)
- [3. Requêtes HTTP et crawl](#o3)
- [4. Pages rendues en JavaScript](#o4)
- [5. Extraction HTML](#o5)
- [6. Extraction PDF et tableaux](#o6)
- [7. OCR](#o7)
- [8. Normalisation de l'arabe](#o8)
- [9. Doublons, validation, schéma](#o9)
- [10. Reprise, journalisation, débit, planification, stockage](#o10)
- [11. Outils écartés ou à surveiller](#o11)
- [12. Stack recommandée](#o12)

---

<a id="o1"></a>
## 1. Besoins réels de TeachMe

Ces besoins viennent de `AnalyseData.md`. Ils guident chaque choix.

| Besoin | Constat | Conséquence sur les outils |
|---|---|---|
| **Peu de documents, mais très riches** | la base officielle tient en une poignée de PDF (D-02 : 556 pages ; D-04 : 336 pages) | la difficulté est l'**extraction**, pas le volume de pages web |
| **Arabe abîmé dans les PDF** | ligatures inversées, glyphes remplacés par des chiffres (`B-08`) | plusieurs extracteurs à comparer + OCR de contrôle + normalisation dédiée |
| **Tableaux de droite à gauche** | les tableaux domaines → thèmes → objectifs sortent avec du texte inversé | extracteur de tableaux qui donne les **positions** des mots, pas seulement le texte |
| **Sites HTML simples** | WordPress, Drupal, ASP.NET, pages rendues côté serveur | un crawler poli suffit ; un navigateur sans interface reste l'exception |
| **Politesse obligatoire** | `Crawl-delay: 10` chez AlloSchool, sites publics fragiles | limitation de débit par domaine, respect de `robots.txt`, cache |
| **Provenance stricte** | chaque donnée doit citer sa source, sa page et son empreinte | stockage des fichiers bruts + manifeste + journaux structurés |
| **Rien d'inventé** | règle produit (Plan.md §13) | pas d'extraction par LLM non contrôlée ; validation humaine tracée |
| **Intégration au backend** | NestJS + Prisma + PostgreSQL (Plan.md §11) | schéma JSON versionné, validé en CI, exportable en JSON Schema |
| **Poste d'analyse** | Python système **3.9.6**, aucune bibliothèque installée | environnement isolé en Python ≥ 3.11 (`B-18`) |

---

<a id="o2"></a>
## 2. Test réalisé sur les vrais documents

Test fait dans un environnement temporaire, avec pypdf 6.21.1, PyMuPDF 1.26.5 et pdfplumber 0.11.8.

| Document | pypdf | PyMuPDF (`get_text`) | PyMuPDF (`find_tables`) |
|---|---|---|---|
| D-02 (2021, polices arabes non standard) | ligature lam-alef **correcte** (« المناهج ») ; mais « ص » → « �س », « أ » → « اأ », « لا » perd l'alif | lam-alef **inversée** (« املناهج ») ; glyphes → chiffres (« الدرا5سي », « 8صيغتني », « العررشات ») | détecte les tableaux (p. 288 à 319), mais le **texte des cellules est inversé** (« ةصحلا ») |
| D-03, D-04 (2024, InDesign) | **propre** en arabe et en français | propre, avec quelques coupures | non testé |
| D-07 (2022, Word) | propre, ordre des segments parfois mélangé | propre | non testé |
| Répartition annuelle AlloSchool (2018) | **formes de présentation** arabes (U+FB50–U+FEFF) | idem | — |

**Conclusion du test.**
1. **Aucun extracteur ne suffit seul** sur D-02.
2. pypdf est le meilleur point de départ pour l'arabe.
3. Les **positions** des mots (pdfplumber ou PyMuPDF) sont nécessaires pour reconstruire les tableaux.
4. Un OCR de contrôle sur la page rendue en image permettra d'arbitrer.
5. La normalisation Unicode (NFKC) corrige les formes de présentation, pas les glyphes mal mappés.

---

<a id="o3"></a>
## 3. Requêtes HTTP et crawl

| | **requests** | **httpx** | **Scrapy** |
|---|---|---|---|
| **Rôle** | client HTTP synchrone | client HTTP synchrone et asynchrone, HTTP/2 | framework de crawl complet |
| **Version / licence** | 2.34.2 (mai 2026) · Apache-2.0 | 0.28.1 (déc. 2024) · BSD-3 | 2.19.0 (sept. 2026) · BSD-3 · Python ≥ 3.10 |
| **Avantages** | très connu, simple | API proche de requests, async, délais d'attente fins, transport testable | file de requêtes, **AutoThrottle**, respect de `robots.txt` (Protego), réessais, **cache HTTP**, **reprise** (`JOBDIR`), exports, middlewares |
| **Limites** | pas d'async, pas de HTTP/2 | dernière version publiée fin 2024 (projet actif, publications rares) | courbe d'apprentissage, modèle Twisted, surdimensionné pour 10 PDF |
| **Formats** | tout | tout | tout (HTML et fichiers via `FilesPipeline`) |
| **Cas TeachMe** | — | téléchargements ciblés (liste fermée d'URL officielles), API CKAN, GitHub, PyPI | parcours des sites de **repérage** (sitemaps, catégories AlloSchool) pour lister des URL de PDF officiels |
| **Lien** | [psf/requests](https://github.com/psf/requests) | [encode/httpx](https://github.com/encode/httpx) | [scrapy/scrapy](https://github.com/scrapy/scrapy) |
| **Place** | **écarté** (doublon de httpx) | **SC-02**, téléchargeur | **SC-01**, découverte |

Compléments :

| Outil | Rôle | Licence / version | Lien | Place |
|---|---|---|---|---|
| **Protego** | analyse de `robots.txt` (règles, `Crawl-delay`, sitemaps) ; c'est celui de Scrapy | BSD-3 · 0.7.0 | [scrapy/protego](https://github.com/scrapy/protego) | utilisé aussi dans le téléchargeur httpx |
| **Hishel** | cache HTTP conforme RFC 9111 pour httpx (ETag, Last-Modified) | BSD · 1.4.0 | [karpetrosyan/hishel](https://github.com/karpetrosyan/hishel) | SC-02 : ne retélécharge pas un fichier inchangé |
| curl_cffi | imite l'empreinte TLS d'un navigateur | MIT · 0.16.3 | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) | **écarté** : sert à contourner les protections anti-robot (`B-04`), ce qui est exclu |

---

<a id="o4"></a>
## 4. Pages rendues en JavaScript

| | **Playwright (Python)** | **scrapy-playwright** |
|---|---|---|
| **Rôle** | piloter Chromium, Firefox ou WebKit sans interface | utiliser Playwright depuis Scrapy, requête par requête |
| **Version / licence** | 1.64.0 (oct. 2026) · Apache-2.0 | 0.0.48 (juil. 2026) · BSD-3 |
| **Avantages** | rendu fiable, attente d'éléments, interception réseau (permet de **trouver l'API JSON** derrière une application) | un seul crawler, Playwright seulement là où il le faut |
| **Limites** | lourd (navigateurs à installer), lent, plus visible | encore en version 0.0.x |
| **Cas TeachMe** | KoolSkools (application vide sans JS), pages dynamiques autorisées ; **jamais** pour franchir un défi Cloudflare | idem, dans SC-01 |
| **Dépendances** | binaires de navigateurs (`playwright install chromium`) | Scrapy + Playwright |
| **Lien** | [microsoft/playwright-python](https://github.com/microsoft/playwright-python) | [scrapy-plugins/scrapy-playwright](https://github.com/scrapy-plugins/scrapy-playwright) |
| **Place** | **optionnel**, activé par source dans le registre | **optionnel** |

Selenium n'est pas retenu : Playwright couvre le même besoin avec une API plus moderne.

---

<a id="o5"></a>
## 5. Extraction HTML

| Outil | Rôle | Avantages | Limites | Licence / version | Lien | Place |
|---|---|---|---|---|---|---|
| **parsel** | sélecteurs CSS et XPath (le moteur de Scrapy) | intégré à Scrapy, rapide (lxml) | aucune pour notre usage | BSD-3 · 1.11.0 | [scrapy/parsel](https://github.com/scrapy/parsel) | **SC-03**, sélecteurs déclarés par source |
| **lxml** | analyseur HTML et XML en C | très rapide, XPath complet, lit les sitemaps | messages d'erreur peu lisibles | BSD-3 · 6.1.3 | [lxml/lxml](https://github.com/lxml/lxml) | dépendance de parsel, lecture des sitemaps |
| **BeautifulSoup** | analyseur tolérant | très robuste sur du HTML cassé, simple | plus lent ; doublon de parsel | MIT · 4.15.0 | [PyPI](https://pypi.org/project/beautifulsoup4/) | **secours** seulement (pages ASP.NET mal formées du CNEE) |
| **trafilatura** | extraction du **texte principal** d'une page (sans menus ni pubs), avec métadonnées (date, auteur) | excellent pour les articles de presse et de blog | pas fait pour les tableaux structurés | Apache-2.0 · 2.3.1 (oct. 2026) | [adbar/trafilatura](https://github.com/adbar/trafilatura) | **SC-03**, pages d'annonce (cadres de référence, notes ministérielles) |
| selectolax | analyseur HTML très rapide | vitesse | doublon de parsel | MIT · 1.0.1 | [rushter/selectolax](https://github.com/rushter/selectolax) | écarté |

---

<a id="o6"></a>
## 6. Extraction PDF et tableaux

| Outil | Rôle | Avantages | Limites | Licence / version | Lien | Place |
|---|---|---|---|---|---|---|
| **pypdf** | texte, métadonnées, signets, pages | pur Python ; **meilleur rendu arabe testé** ; lit les signets (les 12 parties de D-02) | pas de positions fines ; glyphes mal mappés sur D-02 | BSD-3 · 6.21.1 (17/10/2026) | [py-pdf/pypdf](https://github.com/py-pdf/pypdf) | **SC-04**, extracteur texte principal |
| **pdfplumber** | mots avec coordonnées, lignes, rectangles, tableaux | contrôle fin des tableaux (colonnes par position x, utile en RTL) ; outils de débogage visuel | lent sur 500 pages ; dépend de pdfminer.six | MIT · 0.11.10 | [jsvine/pdfplumber](https://github.com/jsvine/pdfplumber) | **SC-04**, reconstruction des tableaux domaines → thèmes → objectifs |
| **pypdfium2** | rendu des pages en image (moteur PDFium de Chrome) | rapide, licence permissive | pas d'extraction sémantique | BSD-3 / Apache-2.0 · 5.14.0 | [pypdfium2-team/pypdfium2](https://github.com/pypdfium2-team/pypdfium2) | **SC-04**, image de page pour l'OCR de contrôle |
| PyMuPDF | texte, positions, tableaux, rendu | très rapide, `find_tables` | **AGPL-3.0** (ou licence commerciale) ; lam-alef inversée sur D-02 | AGPL-3.0 · 2.0 (19/10/2026) · Python ≥ 3.11 | [pymupdf/PyMuPDF](https://github.com/pymupdf/PyMuPDF) | **diagnostic local seulement**, pas dans la chaîne livrée |
| Camelot | tableaux à bordures (`lattice`) ou par espacement (`stream`) | bon sur les tableaux bordés | dépendances (Ghostscript, OpenCV) ; texte arabe inversé non géré | MIT · 2.0.0 | [camelot-dev/camelot](https://github.com/camelot-dev/camelot) | **à évaluer** si pdfplumber échoue |
| tabula-py | tableaux via Tabula (Java) | simple | dépend de Java ; dernière version en 2024 | MIT · 2.10.0 | [chezou/tabula-py](https://github.com/chezou/tabula-py) | écarté (doublon de Camelot, Java) |
| **Docling** (IBM) | conversion de documents (PDF, DOCX, HTML) en structure : titres, tableaux, ordre de lecture ; branche plusieurs OCR | modèle de mise en page récent, sortie JSON et Markdown, très actif | lourd (modèles) ; **qualité sur l'arabe RTL non mesurée** | MIT · 2.140.0 (16/10/2026) | [docling-project/docling](https://github.com/docling-project/docling) | **banc d'essai** (SC-04) : à comparer à pypdf + pdfplumber sur 20 pages de D-02 |
| Unstructured | découpage de documents en éléments | nombreux formats | orienté préparation pour la recherche par LLM ; doublon de Docling | Apache-2.0 · 0.27.28 | [Unstructured-IO/unstructured](https://github.com/Unstructured-IO/unstructured) | écarté |
| marker | PDF → Markdown par modèles | bonne qualité générale | **poids des modèles sous licence OpenRAIL-M modifiée** (gratuit sous 5 M$ de financement ou de chiffre d'affaires) | code Apache-2.0 · 2.0.0 | [datalab-to/marker](https://github.com/datalab-to/marker) | écarté pour l'instant (licence des poids, GPU) |
| MinerU | PDF → Markdown/JSON par modèles | très complet | licence maison (Apache-2.0 + seuils commerciaux, attribution) ; lourd | 4.0.12 | [opendatalab/MinerU](https://github.com/opendatalab/MinerU) | écarté (licence, poids) |

---

<a id="o7"></a>
## 7. OCR

L'OCR sert **à contrôler** le texte extrait des PDF (D-02) et à lire les documents numérisés. Il ne remplace pas la couche texte quand elle est saine.

| Outil | Rôle | Langues utiles vérifiées | Avantages | Limites | Licence / version | Lien | Place |
|---|---|---|---|---|---|---|---|
| **Tesseract 5** | moteur OCR classique | `ara`, `fra` et `script/Arabic` présents dans `tessdata_best` (vérifié) ; **pas de `tzm`** (tifinagh) | gratuit, hors ligne, CPU, stable | qualité moyenne sur les tableaux et l'arabe à diacritiques ; prétraitement d'image nécessaire | Apache-2.0 · 5.5.3 (juil. 2026) | [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) | **SC-04**, OCR de contrôle |
| **OCRmyPDF** | ajoute une couche texte OCR à un PDF numérisé (Tesseract en dessous) | idem Tesseract | gère le redressement, le nettoyage et le PDF/A | Python ≥ 3.11, dépend de Ghostscript | MPL-2.0 · 17.13.0 | [ocrmypdf/OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) | **SC-04**, PDF sans texte (scans d'enseignants, sujets anciens du CNEE) |
| PaddleOCR | OCR par apprentissage profond, détection de tableaux | modèle arabe annoncé (à tester) | souvent meilleur que Tesseract sur les mises en page denses | dépend de PaddlePaddle, lourd | Apache-2.0 · 3.7.0 | [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) | **banc d'essai** contre Tesseract |
| EasyOCR | OCR PyTorch | arabe annoncé | simple | dernière version en 2024 | Apache-2.0 · 1.7.2 | [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) | écarté (doublon, peu maintenu) |
| Surya | OCR et mise en page par modèles | multilingue annoncé | qualité récente | poids OpenRAIL-M modifiés (même réserve que marker) | code Apache-2.0 · 0.22.1 | [datalab-to/surya](https://github.com/datalab-to/surya) | écarté pour l'instant |

**Tifinagh** : aucun modèle Tesseract `tzm` dans `tessdata_best` (404 vérifié). La partie amazighe de D-02 doit être lue depuis sa couche texte Unicode, qui existe, ou relue à la main (`B-11`).

---

<a id="o8"></a>
## 8. Normalisation de l'arabe

| Outil | Rôle | Licence / version | Place |
|---|---|---|---|
| `unicodedata` (bibliothèque standard) | **NFKC** : transforme les formes de présentation (U+FB50–U+FEFF) en lettres normales | — | **SC-05**, toujours appliqué |
| **CAMeL Tools** | normalisation arabe (alif, ya, ta marbuta), suppression des diacritiques, tokenisation | MIT · 1.6.0 · Python ≥ 3.11 | [CAMeL-Lab/camel_tools](https://github.com/CAMeL-Lab/camel_tools) · **SC-05**, **clés de comparaison** seulement (jamais pour modifier le texte affiché) |
| Table de correspondance maison | corrige les glyphes mal mappés **d'un document précis** (« 5س »/« 6س »/« ~س » → « س », « 8ص » → « ص », « ررش » → « شر »…) | — | **SC-05**, une table par empreinte de document, relue par un humain |
| ftfy | répare le texte mal décodé (mojibake) | Apache-2.0 · 6.3.1 | SC-05, pages HTML mal encodées seulement |
| PyArabic | utilitaires arabes | **GPL** · 0.6.15 (2022) | écarté (licence, peu maintenu ; doublon de CAMeL) |
| python-bidi | réordonne le texte pour l'**affichage** | LGPL | écarté : on stocke l'ordre **logique**, jamais l'ordre visuel |

---

<a id="o9"></a>
## 9. Doublons, validation, schéma

| Outil | Rôle | Avantages | Licence / version | Lien | Place |
|---|---|---|---|---|---|
| `hashlib` SHA-256 | doublons **exacts** de fichiers (même PDF sur cinq miroirs) | standard, sûr | — | — | **SC-02**, **SC-07** |
| **RapidFuzz** | similarité de chaînes (titres de thèmes, de leçons) | très rapide, plusieurs métriques | MIT · 3.14.6 · Python ≥ 3.11 | [rapidfuzz/RapidFuzz](https://github.com/rapidfuzz/RapidFuzz) | **SC-07**, presque-doublons dans un programme |
| **datasketch** | MinHash et LSH : documents **presque identiques** à grande échelle | évite de comparer tous les documents deux à deux | MIT · 2.0.0 | [ekzhu/datasketch](https://github.com/ekzhu/datasketch) | **SC-07**, versions du même PDF (recompressé, page de garde ajoutée) |
| **Pydantic v2** | modèles typés, validation, **export JSON Schema** | une seule définition du schéma, en Python | MIT · 2.14.1 | [pydantic/pydantic](https://github.com/pydantic/pydantic) | **SC-08**, source de vérité du schéma |
| **jsonschema** | valider les fichiers JSON contre le schéma exporté | indépendant de Pydantic : le même schéma est utilisable côté NestJS (Zod ou AJV) | MIT · 4.26.0 | [python-jsonschema/jsonschema](https://github.com/python-jsonschema/jsonschema) | **SC-08**, contrôle en CI |
| Frictionless | paquets de données (schémas de tableaux CSV) | standard ouvert | MIT · 5.21.0 | [frictionlessdata/frictionless-py](https://github.com/frictionlessdata/frictionless-py) | écarté (nos données sont hiérarchiques, pas tabulaires) |

---

<a id="o10"></a>
## 10. Reprise, journalisation, débit, planification, stockage

| Besoin | Outil retenu | Pourquoi | Écarté |
|---|---|---|---|
| **Reprise du crawl** | `JOBDIR` de Scrapy | reprend la file et les URL déjà vues après un arrêt | — |
| **Reprise du pipeline** | **SQLite** (bibliothèque standard) : une table d'état par document et par étape | aucun serveur, transactions, requêtes simples ; le pipeline reprend chaque document à sa dernière étape validée | Prefect (Apache-2.0, 3.8.8) : utile à grande échelle, mais un serveur de plus pour une dizaine de sources |
| **Réessais** | **Tenacity** (Apache-2.0, 9.2.1) pour httpx ; middleware Retry pour Scrapy | backoff exponentiel, arrêt sur les erreurs non transitoires (403, 404) | — |
| **Débit par domaine** | **PyrateLimiter** (MIT, 4.5.0) pour httpx ; `DOWNLOAD_DELAY` + AutoThrottle pour Scrapy | respecte `Crawl-delay` et un plafond prudent par domaine | — |
| **Journaux** | **structlog** (MIT ou Apache-2.0, 26.1.0) en JSON lignes | chaque ligne porte `run_id`, `source_id`, `url`, `sha256`, `etape` ; facile à filtrer | loguru (doublon) |
| **Archivage HTML** | fichier brut + manifeste (SHA-256, en-têtes, date) | suffit pour la provenance | warcio (Apache-2.0) : à ajouter si un archivage WARC normalisé devient nécessaire |
| **Planification** | `cron` ou `launchd` local, puis tâche planifiée en CI (mensuelle) | les sources officielles changent rarement | APScheduler, Prefect, Airflow : surdimensionnés |
| **Rapports** | **DuckDB** (MIT, 1.5.6) | requêtes SQL directes sur les JSON et les journaux, sans import | pandas seul (moins pratique sur du JSON imbriqué) |
| **Environnement** | **uv** (MIT ou Apache-2.0, 0.13.1) + Python 3.12 | installe Python et les dépendances, fichier de verrouillage reproductible | pip + venv système (Python 3.9 trop ancien) |

---

<a id="o11"></a>
## 11. Outils écartés ou à surveiller

| Outil | Raison |
|---|---|
| **Crawl4AI** (Apache-2.0, 0.9.5, très actif) | crawler pensé pour produire du Markdown destiné aux LLM. Il recouvre Scrapy + Playwright + trafilatura sans apporter la file de reprise ni la politesse fine. **À surveiller.** |
| **Firecrawl** | service de crawl orienté LLM ; le SDK Python est sous MIT (4.53.2) ; la licence du serveur auto-hébergé **n'a pas été vérifiée** (dépôt déplacé). Dépendance externe inutile ici. |
| **Extraction par LLM** (quel que soit l'outil) | risque d'**inventer** un objectif ou un thème absent du document, contraire à Plan.md §13. Admis plus tard seulement comme **aide à la relecture**, jamais comme source d'une valeur. |
| **Selenium** | doublon de Playwright. |
| **curl_cffi**, solveurs de captcha, proxys rotatifs | servent à contourner des protections ; exclus (`Bloquage.md`, principe). |

---

<a id="o12"></a>
## 12. Stack recommandée

### 12.1 Synthèse

| Couche | Outil | Rôle dans la chaîne |
|---|---|---|
| Environnement | **uv + Python 3.12** | reproductible, compatible avec toutes les bibliothèques retenues |
| Découverte | **Scrapy** (+ Protego, `JOBDIR`, AutoThrottle) · scrapy-playwright **optionnel** | sitemaps, catégories, repérage d'URL de PDF |
| Téléchargement | **httpx** + Hishel + Tenacity + PyrateLimiter + Protego | liste fermée d'URL, reprise, cache, empreinte |
| HTML | **parsel** · **trafilatura** · BeautifulSoup en secours | sélecteurs par source, texte principal |
| PDF texte | **pypdf** (texte, signets) + **pdfplumber** (positions, tableaux) | extraction principale |
| PDF image et OCR | **pypdfium2** → **Tesseract** (`ara`, `fra`) ; **OCRmyPDF** pour les scans | contrôle et documents numérisés |
| Banc d'essai | **Docling**, PaddleOCR | à comparer sur 20 pages avant de décider |
| Arabe | **NFKC** + table de correspondance par document + **CAMeL Tools** (clés de comparaison) | texte propre, comparaison robuste |
| Doublons | **SHA-256** + **datasketch** + **RapidFuzz** | fichiers, versions, titres |
| Schéma | **Pydantic v2** → JSON Schema → **jsonschema** en CI | une définition, deux usages (Python, NestJS) |
| État et rapports | **SQLite** · **structlog** · **DuckDB** | reprise, journaux, couverture |

### 12.2 Justification

- **Deux clients HTTP, mais deux rôles distincts.** Scrapy parcourt des sites inconnus. httpx télécharge une liste **fermée** de documents officiels, avec un contrôle total des en-têtes et du cache. Écrire un spider pour 10 PDF serait plus lourd qu'un script.
- **Pas de PyMuPDF dans la chaîne livrée** : sa licence AGPL imposerait des obligations si les scripts étaient un jour exposés comme service. Et sur D-02, pypdf rend mieux l'arabe. pypdfium2 couvre le rendu des pages en image.
- **Pas de modèle de document lourd par défaut** : Docling est prometteur, mais sa qualité sur l'arabe RTL n'est pas mesurée. Il entre seulement s'il bat pypdf + pdfplumber sur le banc d'essai.
- **Aucun outil de contournement.** La stack ne contient rien pour franchir Cloudflare, un captcha ou une authentification.

### 12.3 Dépendances système

| Paquet | Pour | macOS | Linux (CI) |
|---|---|---|---|
| Tesseract + `ara`, `fra` (tessdata_best) | OCR | `brew install tesseract tesseract-lang` | `apt install tesseract-ocr tesseract-ocr-ara tesseract-ocr-fra` |
| Ghostscript | OCRmyPDF | `brew install ghostscript` | `apt install ghostscript` |
| Chromium (optionnel) | Playwright | `uv run playwright install chromium` | idem |

### 12.4 Banc d'essai à faire avant le développement des scripts

1. Choisir 20 pages de D-02 : 5 pages de texte, 10 pages de tableaux de programme (mathématiques, arabe, sciences sociales), 3 pages en français, 2 pages en tifinagh.
2. Les **transcrire à la main** : c'est la vérité de référence. La transcription reste dans `collecte/benchmark/`, avec la source et la page.
3. Mesurer pypdf, pdfplumber, Docling, Tesseract et PaddleOCR : taux d'erreur par caractère, et **taux de lignes de tableau correctement reconstruites**.
4. Retenir la combinaison gagnante, puis mettre à jour ce document.

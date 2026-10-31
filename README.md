# RAO MEDIA TV – Plateforme Web d’Information et d'Actualité en Continu

Bienvenue sur le projet officiel **RAO MEDIA TV**, un portail numérique d'information moderne, élégant, réactif et complet inspiré des plus grands organes de presse sénégalais et internationaux (Seneweb, Dakaractu, RFI, France 24).

---

## 1. Identité Visuelle & Charte Graphique

Le design respecte rigoureusement l'identité du logo officiel **RAO MEDIA TV** fourni :

* **Noir (#111111)** : Menus principaux, typographies des titres, barre de navigation, arrière-plans éditoriaux.
* **Rouge (#D71920)** : Boutons d'action, badges de catégories, alertes en direct, points forts, accents visuels.
* **Blanc (#FFFFFF)** : Fond principal et cartes de lecture assurant un confort visuel optimal.
* **Gris Clair (#F4F6F9)** : Arrière-plans secondaires, séparateurs et cartes administratives.

---

## 2. Technologies Utilisées

Ce projet respecte strictement le cahier des charges :
* **HTML5** : Structure sémantique complète (header, nav, main, article, section, footer).
* **CSS3** : Design responsive avancé, animations fluides (défilement ticker continue, pulse, transitions d'images).
* **Bootstrap 5.3.3 & Bootstrap Icons** : Système de grille responsive et composants interactifs (modales, toasts, dropdowns).
* **JavaScript Vanilla (ES6+)** : Logique dynamique sans framework externe lourd.
* **JSON & localStorage** : Persistance des données complète côté navigateur (CRUD en temps réel sans backend externe).

---

## 3. Structure Complète du Projet

```text
rao-media-tv/
│
├── index.html                  # Page d'accueil générale (Hero, Catégories, Sport, Web TV, Flash Info)
├── article.html                # Page de lecture dédiée avec partages sociaux & espace commentaires
├── categorie.html              # Filtre dynamique par rubrique et moteur de recherche d'articles
├── videos.html                 # Espace Web TV dédié avec lecteur principal et grille de reportages
├── evenements.html             # Agenda complet des événements (Culture, Économie, Religion, Sport)
│
├── admin/
│   ├── login.html              # Authentification administrateur avec remplissage démo en 1 clic
│   ├── dashboard.html          # Statistiques dynamiques, articles récents et modération rapide
│   ├── articles.html           # Gestion complète des articles (recherche, filtres, publication)
│   ├── ajouter-article.html    # Éditeur WYSIWYG, téléversement avec compression Canvas & aperçu
│   ├── evenements.html         # Ajout, modification et suivi des événements
│   ├── sports.html             # Gestion des affiches sportives, disciplines et scores
│   ├── videos.html             # Ajout de liens YouTube avec extraction automatique de miniatures
│   ├── categories.html         # Gestion des rubriques, slugs et couleurs
│   ├── utilisateurs.html       # Gestion des journalistes, rôles et accès
│   ├── commentaires.html       # Espace de modération des avis et commentaires lecteurs
│   └── parametres.html         # Configuration générale, export/import JSON et réinitialisation
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Styles du site public et de la charte graphique
│   │   └── admin.css           # Styles spécifiques de l'espace administration
│   │
│   ├── js/
│   │   ├── storage.js          # Schéma JSON, données sénégalaises riches & fonctions CRUD
│   │   ├── app.js              # Header, ticker d'actualité, date en français, météo & newsletter
│   │   ├── articles.js         # Affichage dynamique des articles, partage réseaux & commentaires
│   │   ├── sports.js           # Rendu des matchs, fiches de scores et disciplines
│   │   ├── videos.js           # Gestion du lecteur vidéo modal et intégration YouTube
│   │   ├── events.js           # Rendu de l'agenda avec filtres de statut et badges dates
│   │   └── admin.js            # Contrôleur global de l'administration et session guard
│   │
│   ├── images/
│   │   ├── logo.png            # Logo officiel RAO MEDIA TV
│   │   └── logo.jpg
│   │
│   └── uploads/                # Répertoire de stockage pour images locales
│
└── README.md                   # Documentation technique et guide d'utilisation
```

---

## 4. Fonctionnalités de la Partie Publique

1. **Header & Navigation** :
   - Horloge et date réelle en français (*ex: Samedi 31 Octobre 2026*).
   - Indicateur météo Dakar en direct.
   - Logo officiel RAO MEDIA TV cliquable.
   - Barre de navigation réactive avec surlignage rouge de la rubrique courante.
   - Bouton clignotant **« DIRECT TV »** vers la Web TV.
   - Liens vers les réseaux sociaux (Facebook, X, YouTube, TikTok, WhatsApp).
   - Accès discret à l'Espace Administration.

2. **Bandeau Défilant « DERNIÈRE MINUTE » (Breaking News)** :
   - Défilement continu et fluide des dernières dépêches publiées avec pause automatique au survol du curseur.

3. **Section Éditoriale « À LA UNE »** :
   - Grande actualité en vedette avec image haute résolution, badge de catégorie personnalisé, titre accrocheur, résumé et métadonnées.
   - 4 actualités secondaires ordonnées avec badges et temps de lecture.

4. **Sections Thématiques Spécialisées** :
   - **Politique** (Vision Sénégal 2050, réformes institutionnelles).
   - **Économie & Développement** (Hydrocarbures de Sangomar, Grand Tortue Ahmeyim, investissements).
   - **Société & Citoyenneté** (TER Dakar - AIBD, santé publique).
   - **Culture & Arts** (Biennale Dak'Art, Festival de Jazz de Saint-Louis).
   - **Technologie & Santé** (FinTech, AgriTech, hôpitaux).

5. **Section Spéciale Sport (RAO SPORT)** :
   - Fiches de résultats en direct pour le Football (Lions de la Teranga), la Lutte avec frappe (Lamb sénégalais - *Modou Lô vs Siteu*), le Basketball (BAL) et le Handball.

6. **Web TV & Vidéos** :
   - Visionnage instantané de reportages et interviews via une modale Bootstrap responsive sans quitter la page.

7. **Page de Lecture Dédiée (`article.html`)** :
   - Fil d'Ariane dynamique.
   - Chapeau éditorial stylisé avec liseré rouge.
   - Boutons de partage 1-clic pour **WhatsApp**, **Facebook**, **X (Twitter)** et **Copie d'URL**.
   - Mots-clés / Tags cliquables.
   - Articles similaires recommandés.
   - Espace commentaires interactif avec persistance immédiate dans le `localStorage`.

8. **Recherche & Filtrage (`categorie.html`)** :
   - Recherche en temps réel par mot-clé dans les titres, résumés et contenus d'articles.
   - Filtre par pilules de rubriques sans rechargement lourd.
   - Système de pagination fonctionnel.

---

## 5. Espace Administrateur Sécurisé

Accessible depuis `/admin/login.html` ou le lien **Espace Admin** dans la barre supérieure.

### Identifiants de Démonstration :
* **Email** : `admin@raomediatv.com`
* **Mot de passe** : `Admin123!`
* *(Un bouton **« Remplir avec les identifiants démo »** est disponible sur la page de connexion pour un test instantané).*

### Modules Administrateur :
1. **Dashboard (`admin/dashboard.html`)** :
   - Statistiques en direct : Total articles, articles publiés, brouillons, nombre de vues, catégories, événements et vidéos.
   - Tableaux des 5 dernières parutions et des derniers commentaires avec actions rapides.
2. **Gestion des Articles (`admin/articles.html`)** :
   - Table de supervision avec aperçus, filtrage instantané par catégorie, statut ou titre.
   - Basculement direct de publication (Publié / Brouillon).
   - Suppression avec confirmation modale sécurisée.
3. **Rédacteur d'Article (`admin/ajouter-article.html`)** :
   - Éditeur WYSIWYG complet : Gras, Italique, Titres H2/H3, Paragraphes, Listes à puces, Citations, Liens et Images.
   - Support d'URL distante ou de téléversement direct d'image avec **compression automatique via Canvas HTML5** pour préserver le quota du `localStorage`.
   - Option « À la une ».
4. **Gestion des Événements (`admin/evenements.html`)** :
   - Planification d'agendas : nom, description, date, heure, lieu, catégorie et statut.
5. **Gestion des Sports (`admin/sports.html`)** :
   - Publication des scores et résultats par discipline.
6. **Gestion des Vidéos (`admin/videos.html`)** :
   - Intégration de vidéos YouTube avec extraction automatique de l'identifiant et de la miniature officielle.
7. **Gestion des Catégories (`admin/categories.html`)** :
   - Ajout et personnalisation des rubriques avec palette de couleurs et compteur d'articles liés.
8. **Gestion des Utilisateurs (`admin/utilisateurs.html`)** :
   - Administration des comptes journalistes, modérateurs et super-administrateurs.
9. **Modération des Commentaires (`admin/commentaires.html`)** :
   - Validation, suppression et contrôle des avis des internautes.
10. **Paramètres & Outils de Sauvegarde (`admin/parametres.html`)** :
    - Mise à jour du nom du média, logo, coordonnées téléphoniques, email et liens sociaux.
    - **Exportation complète** en fichier JSON (`rao_media_tv_backup.json`).
    - **Importation et restauration** d'une sauvegarde JSON.
    - **Bouton de réinitialisation** vers les données de démonstration officielles.

---

## 6. Guide de Démarrage et Test

1. Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur web moderne (Google Chrome, Firefox, Edge, Safari).
2. Naviguez librement entre les rubriques, lisez les articles, testez le partage WhatsApp ou la soumission de commentaires.
3. Cliquez sur **« Espace Admin »** ou rendez-vous sur `admin/login.html`.
4. Connectez-vous avec `admin@raomediatv.com` / `Admin123!`.
5. Ajoutez un nouvel article, modifiez un score sportif ou changez le logo dans les paramètres : revenez sur le site public, le contenu est immédiatement mis à jour !

/**
 * RAO MEDIA TV - storage.js
 * Gestion centralisée du stockage localStorage, données JSON et opérations CRUD
 */

const STORAGE_KEYS = {
    ARTICLES: 'rao_articles',
    CATEGORIES: 'rao_categories',
    EVENTS: 'rao_events',
    SPORTS: 'rao_sports',
    VIDEOS: 'rao_videos',
    USERS: 'rao_users',
    COMMENTS: 'rao_comments',
    SETTINGS: 'rao_settings',
    AUTH: 'rao_admin_auth'
};

// Données initiales de démonstration réalistes (Actualité sénégalaise)
const INITIAL_DATA = {
    settings: {
        siteName: "RAO MEDIA TV",
        slogan: "Le premier portail d'information et d'actualité en continu au Sénégal",
        logo: "assets/images/logo.png",
        email: "contact@raomediatv.com",
        phone: "+221 33 824 10 10",
        whatsapp: "+221 77 000 00 00",
        address: "Avenue Cheikh Anta Diop, Fann Résidence, Dakar, Sénégal",
        facebook: "https://facebook.com",
        twitter: "https://x.com",
        youtube: "https://youtube.com",
        instagram: "https://instagram.com",
        tiktok: "https://tiktok.com",
        footerAbout: "RAO MEDIA TV est une plateforme d'information indépendante de premier plan, dédiée au décryptage de l'actualité politique, économique, sociale, culturelle et sportive du Sénégal et du monde entier.",
        breakingNewsEnabled: true
    },
    categories: [
        { id: "politique", name: "Politique", color: "#D71920", icon: "bi-bank", slug: "politique", description: "Institutions, gouvernement, assemblée et partis politiques" },
        { id: "societe", name: "Société", color: "#0d6efd", icon: "bi-people", slug: "societe", description: "Faits divers, éducation, santé et vie citoyenne" },
        { id: "economie", name: "Économie", color: "#198754", icon: "bi-graph-up-arrow", slug: "economie", description: "Finance, investissements, pétrole, gaz et développement" },
        { id: "sport", name: "Sport", color: "#fd7e14", icon: "bi-trophy", slug: "sport", description: "Football, lutte sénégalaise, basketball et compétitions" },
        { id: "culture", name: "Culture", color: "#6f42c1", icon: "bi-music-note-beamed", slug: "culture", description: "Musique, cinéma, arts, traditions et patrimoine" },
        { id: "international", name: "International", color: "#0dcaf0", icon: "bi-globe", slug: "international", description: "Afrique, CEDEAO, diplomatie et actualités mondiales" },
        { id: "technologie", name: "Technologie", color: "#20c997", icon: "bi-cpu", slug: "technologie", description: "Numérique, startups, innovation et télécoms" },
        { id: "education", name: "Éducation", color: "#ffc107", icon: "bi-mortarboard", slug: "education", description: "Universités, écoles, formation et réformes scolaires" },
        { id: "sante", name: "Santé", color: "#d63384", icon: "bi-heart-pulse", slug: "sante", description: "Hôpitaux, prévention, bien-être et médecine" }
    ],
    articles: [
        {
            id: "art-1",
            title: "Projet Sénégal 2050 : Le Président Bassirou Diomaye Faye dévoile la nouvelle trajectoire de souveraineté économique",
            slug: "projet-senegal-2050-bassirou-diomaye-faye-souverainete",
            category: "politique",
            summary: "À l'occasion d'une cérémonie solennelle à Diamniadio, le chef de l'État a présenté la vision stratégique nationale visant une transformation systémique d'ici 2050.",
            content: `<p class="lead">Le chef de l'État sénégalais, Bassirou Diomaye Faye, entouré des membres du gouvernement et des partenaires techniques et financiers, a officiellement lancé la nouvelle feuille de route nationale dénommée « Sénégal 2050 : Agenda national de transformation ».</p>
            <p>Ce programme ambitieux repose sur quatre piliers fondamentaux : une économie compétitive créatrice d'emplois, un capital humain de qualité et une équité sociale renforcée, un aménagement durable du territoire et une bonne gouvernance républicaine.</p>
            <blockquote class="blockquote my-4 ps-4 border-start border-danger border-4">
                <p class="fst-italic">« Notre ambition est d'asseoir une véritable souveraineté économique et de bâtir un Sénégal juste, prospère et ancré dans des valeurs de solidarité et de travail. »</p>
                <footer class="blockquote-footer">Bassirou Diomaye Faye, <cite>Président de la République du Sénégal</cite></footer>
            </blockquote>
            <h4>Une rupture dans le modèle de développement</h4>
            <p>Selon les orientations présentées par le Premier ministre, ce nouveau plan ambitionne de tripler le revenu par habitant et d'atteindre une croissance économique annuelle moyenne supérieure à 6,5% sur les deux prochaines décennies, notamment grâce à la valorisation locale des ressources pétrolières et gazières du champ de Sangomar et de Grand Tortue Ahmeyim (GTA).</p>
            <p>Les priorités immédiates incluent la réduction du train de vie de l'État, la numérisation complète de l'administration fiscale et douanière, ainsi qu'un soutien massif aux filières agro-pastorales de la vallée du fleuve Sénégal et de la Casamance.</p>`,
            image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
            author: "Mamadou Lamine Ndiaye",
            authorRole: "Rédacteur en chef Politique",
            date: "2026-10-30",
            time: "10:30",
            featured: true,
            status: "published",
            views: 4520,
            tags: ["Sénégal 2050", "Bassirou Diomaye Faye", "Économie", "Diamniadio"]
        },
        {
            id: "art-2",
            title: "Hydrocarbures au Sénégal : Les premières retombées du champ pétrolier de Sangomar confirment les prévisions de recettes",
            slug: "hydrocarbures-senegal-retombees-champ-sangomar",
            category: "economie",
            summary: "Le ministère des Finances et Petrosen dressent un bilan intermédiaire très positif des premiers barils exportés, avec un impact direct sur le budget de l'État.",
            content: `<p>Quatre mois après l'extraction du tout premier baril de pétrole brut au large des côtes sénégalaises, les perspectives financières se précisent. Selon les données communiquées par Petrosen et Woodside Energy, les volumes produits respectent scrupuleusement la feuille de route technique.</p>
            <p>La part revenant à l'État du Sénégal via le mécanisme de partage de production permettra d'alimenter directement le Fonds Intergénérationnel et le Fonds de Stabilisation, logés à la Banque Centrale.</p>
            <p>Pour les spécialistes du secteur énergétique, cette étape symbolise l'entrée du Sénégal dans le concert des nations productrices d'hydrocarbures, avec l'impératif absolu d'une gouvernance transparente des revenus pour le bien-être des populations.</p>`,
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
            author: "Aïssatou Sow",
            authorRole: "Grand Reporter Économie",
            date: "2026-10-29",
            time: "14:15",
            featured: true,
            status: "published",
            views: 3120,
            tags: ["Pétrole", "Sangomar", "Petrosen", "Énergie"]
        },
        {
            id: "art-3",
            title: "Lions de la Teranga : Sadio Mané et l'équipe nationale en stage de préparation pour les éliminatoires de la Coupe du Monde",
            slug: "lions-teranga-sadio-mane-preparation-coupe-du-monde",
            category: "sport",
            summary: "Le sélectionneur national a dévoilé sa liste de 26 joueurs. Le groupe affiche une grande sérénité avant le choc prévu au Stade Me Abdoulaye Wade de Diamniadio.",
            content: `<p>L'ambiance est au beau fixe dans la tanière des Lions de la Teranga. Réunis au complexe sportif de Diamniadio, les hommes d'Aliou Cissé intensifient leurs séances tactiques à l'approche de la double confrontation décisive pour le Mondial.</p>
            <p>Arrivé dès les premières heures du rassemblement, le leader d'attaque Sadio Mané a réaffirmé la détermination collective du groupe : <em>« Chaque match avec le maillot national est une mission sacrée. Nous voulons offrir la victoire au peuple sénégalais. »</em></p>
            <p>Le public dakarois est invité à venir nombreux soutenir les champions d'Afrique dans une enceinte qui s'annonce à guichets fermés.</p>`,
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
            author: "Cheikh Tidiane Diop",
            authorRole: "Chef de rubrique Sports",
            date: "2026-10-30",
            time: "08:45",
            featured: true,
            status: "published",
            views: 5890,
            tags: ["Lions du Sénégal", "Sadio Mané", "Football", "Diamniadio"]
        },
        {
            id: "art-4",
            title: "Arène nationale : Choc des titans confirmé pour le titre suprême de Roi des Arènes",
            slug: "arene-nationale-choc-des-titans-roi-des-arenes",
            category: "sport",
            summary: "Le promoteur a finalisé les contrats pour l'affiche la plus attendue de la saison de lutte avec frappe. Les deux camps se promettent un combat éclair.",
            content: `<p>C'est désormais officiel : le Comité National de Gestion de la Lutte (CNG) a homologué la date du grand combat qui opposera les deux ténors de l'arène sénégalaise. Les amateurs de lutte avec frappe peuvent d'ores et déjà cocher la date sur leur agenda.</p>
            <p>Les face-à-face verbaux s'annoncent particulièrement intenses, les états-majors des deux écuries rivalisant d'ingéniosité mystique et d'entraînements physiques intensifs entre Dakar et les centres d'entraînement spécialisés à l'étranger.</p>`,
            image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
            author: "Cheikh Tidiane Diop",
            authorRole: "Chef de rubrique Sports",
            date: "2026-10-28",
            time: "18:00",
            featured: false,
            status: "published",
            views: 2840,
            tags: ["Lutte Sénégalaise", "Arène Nationale", "Lamb"]
        },
        {
            id: "art-5",
            title: "Infrastructures et Mobilité : Le TER de Dakar franchit un nouveau cap avec l'ouverture de la phase 2 vers l'AIBD",
            slug: "ter-dakar-phase-2-aibd-mobilite-urbaine",
            category: "societe",
            summary: "Les voyageurs peuvent désormais rejoindre l'Aéroport International Blaise Diagne en moins de 45 minutes depuis la gare historique de Dakar.",
            content: `<p>Une nouvelle ère s'ouvre pour les transports en commun au Sénégal. L'extension du Train Express Régional (TER) reliant la gare de Diamniadio à l'Aéroport International Blaise Diagne (AIBD) est officiellement entrée en phase commerciale.</p>
            <p>Grâce à des rames ultramodernes et cadencées toutes les dix minutes aux heures de pointe, cette liaison stratégique désengorge significativement les autoroutes et facilite les départs internationaux pour des dizaines de milliers de passagers quotidiens.</p>`,
            image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
            author: "Fatou Bintou Ndao",
            authorRole: "Journaliste Société & Urbanisme",
            date: "2026-10-27",
            time: "11:20",
            featured: false,
            status: "published",
            views: 3950,
            tags: ["TER", "AIBD", "Transports", "Dakar"]
        },
        {
            id: "art-6",
            title: "Culture et Patrimoine : La 15e Biennale de l'Art Africain Contemporain de Dakar s'ouvre sous le signe de l'éveil",
            slug: "dakart-biennale-art-africain-contemporain",
            category: "culture",
            summary: "Des centaines d'artistes venus des cinq continents exposent leurs œuvres dans les galeries et espaces publics de la capitale sénégalaise.",
            content: `<p>Dakar vibre au rythme de l'art contemporain. Le Dak'Art rassemble cette année des créateurs audacieux, des collectionneurs renommés et des critiques d'art du monde entier.</p>
            <p>Du Musée Théodore Monod à la Maison de la Culture Douta Seck, en passant par les centaines de lieux « OFF », les installations visuelles, sculptures et performances vivantes célèbrent la richesse et la force créatrice de la jeunesse africaine.</p>`,
            image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
            author: "Oumar Babacar Kane",
            authorRole: "Critique d'art & Culture",
            date: "2026-10-26",
            time: "16:40",
            featured: false,
            status: "published",
            views: 1820,
            tags: ["DakArt", "Biennale", "Art", "Culture"]
        },
        {
            id: "art-7",
            title: "Diplomatie ouest-africaine : Réunion extraordinaire de la CEDEAO sur la coopération sécuritaire et commerciale",
            slug: "cedeao-diplomatie-securite-commerce-afrique-ouest",
            category: "international",
            summary: "Les ministres des Affaires étrangères sont réunis à Abuja pour renforcer les corridors de transport et apaiser les tensions régionales.",
            content: `<p>Face aux bouleversements géopolitiques dans le Sahel, les États membres de la communauté ouest-africaine cherchent à refonder les bases d'un partenariat économique mutuellement avantageux.</p>
            <p>Le Sénégal, par la voix de sa délégation diplomatique, a insisté sur l'urgence de préserver la libre circulation des personnes et des biens tout en réactivant les mécanismes de dialogue fraternel.</p>`,
            image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80",
            author: "Mamadou Lamine Ndiaye",
            authorRole: "Rédacteur en chef Politique",
            date: "2026-10-25",
            time: "09:10",
            featured: false,
            status: "published",
            views: 2410,
            tags: ["CEDEAO", "Diplomatie", "Afrique", "Paix"]
        },
        {
            id: "art-8",
            title: "Tech & Innovation : Les startups sénégalaises lèvent plus de 40 milliards FCFA dans l'AgriTech et la FinTech",
            slug: "tech-startups-senegal-fintech-agritech-levee-fonds",
            category: "technologie",
            summary: "L'écosystème numérique dakarois confirme son statut de hub technologique majeur en Afrique francophone grâce à l'essor des solutions mobiles.",
            content: `<p>Le secteur technologique sénégalais connaît une accélération sans précédent. Des applications de paiement instantané aux plateformes d'assurance indicielle pour les agriculteurs, les jeunes entrepreneurs locaux attirent des fonds de capital-risque internationaux.</p>
            <p>La Délégation générale à l'Entreprenariat Rapide (DER) et plusieurs incubateurs privés multiplient les programmes d'accélération pour soutenir l'industrialisation des solutions Made in Senegal.</p>`,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            author: "Aïssatou Sow",
            authorRole: "Grand Reporter Économie",
            date: "2026-10-24",
            time: "15:00",
            featured: false,
            status: "published",
            views: 2900,
            tags: ["Tech", "Startups", "Fintech", "Dakar"]
        },
        {
            id: "art-9",
            title: "Réforme du système universitaire : Concertation nationale sur l'orientation et l'insertion professionnelle",
            slug: "reforme-systeme-universitaire-ucad-etudiants",
            category: "education",
            summary: "Le ministère de l'Enseignement Supérieur réunit recteurs, syndicats d'enseignants et représentants étudiants pour repenser l'offre pédagogique.",
            content: `<p>L'Université Cheikh Anta Diop de Dakar (UCAD) et les universités régionales entament un cycle de réflexion majeur sur l'adéquation entre formation académique et besoins du marché du travail.</p>
            <p>L'accent sera mis sur le renforcement des filières scientifiques, le numérique, l'intelligence artificielle et les métiers de l'ingénierie pétrolière et minière.</p>`,
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
            author: "Fatou Bintou Ndao",
            authorRole: "Journaliste Société & Urbanisme",
            date: "2026-10-23",
            time: "11:50",
            featured: false,
            status: "published",
            views: 1670,
            tags: ["UCAD", "Éducation", "Université", "Jeunesse"]
        },
        {
            id: "art-10",
            title: "Santé publique : Inauguration du nouveau pôle mère-enfant à l'Hôpital Principal de Dakar",
            slug: "sante-inauguration-pole-mere-enfant-hopital-principal",
            category: "sante",
            summary: "Équipé de technologies d'imagerie de dernière génération, ce centre permettra d'améliorer considérablement la prise en charge pédiatrique.",
            content: `<p>Un pas de plus vers l'excellence médicale à Dakar. Le nouveau pôle médico-chirurgical dédié à la pédiatrie et à la maternité de l'Hôpital Principal a été officiellement réceptionné ce jeudi.</p>
            <p>Doté d'une capacité de plus de 120 lits, de blocs opératoires spécialisés et d'une unité de néonatalogie avancée, cet équipement est destiné à réduire significativement la mortalité maternelle et infantile dans la sous-région.</p>`,
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
            author: "Fatou Bintou Ndao",
            authorRole: "Journaliste Société & Urbanisme",
            date: "2026-10-22",
            time: "14:30",
            featured: false,
            status: "published",
            views: 2150,
            tags: ["Santé", "Hôpital Principal", "Pédiatrie"]
        }
    ],
    events: [
        {
            id: "ev-1",
            name: "Forum Économique International de Dakar",
            description: "Rendez-vous économique réunissant plus de 1 500 décideurs, investisseurs et chefs d'entreprises pour échanger sur le développement durable en Afrique.",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
            date: "2026-11-15",
            time: "09:00",
            venue: "Centre International de Conférences Abdou Diouf (CICAD), Diamniadio",
            category: "Économie",
            status: "À venir"
        },
        {
            id: "ev-2",
            name: "Grand Magal de Touba 2026",
            description: "L'une des plus grandes commémorations religieuses d'Afrique de l'Ouest célébrant le départ en exil de Cheikh Ahmadou Bamba Khadimou Rassoul.",
            image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
            date: "2026-11-28",
            time: "Toute la journée",
            venue: "Grande Mosquée de Touba, Région de Diourbel",
            category: "Religion & Société",
            status: "À venir"
        },
        {
            id: "ev-3",
            name: "Saint-Louis Jazz Festival - 34e Édition",
            description: "Le prestigieux festival international réunissant les légendes du jazz mondial et les sonorités afro-cubaines sur les rives du fleuve Sénégal.",
            image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
            date: "2026-12-04",
            time: "20:00",
            venue: "Place Faidherbe, Saint-Louis",
            category: "Culture & Musique",
            status: "À venir"
        },
        {
            id: "ev-4",
            name: "Finale de la Coupe du Sénégal de Football",
            description: "L'apogée de la saison footballistique nationale entre les deux meilleures équipes qualifiées pour le trophée national suprême.",
            image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
            date: "2026-11-10",
            time: "17:00",
            venue: "Stade Léopold Sédar Senghor, Dakar",
            category: "Sport",
            status: "À venir"
        }
    ],
    sports: [
        {
            id: "sp-1",
            discipline: "Football",
            matchTitle: "Éliminatoires Coupe du Monde 2026",
            team1: "Sénégal (Lions)",
            team2: "RD Congo",
            score1: "2",
            score2: "1",
            status: "Terminé",
            date: "2026-10-25",
            description: "Buts splendides de Sadio Mané et Nicolas Jackson pour offrir les 3 points précieux aux Lions devant 50 000 spectateurs.",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "sp-2",
            discipline: "Lutte avec Frappe",
            matchTitle: "Grand Gala de l'Arène Nationale",
            team1: "Modou Lô",
            team2: "Siteu",
            score1: "Victoire",
            score2: "Défaite",
            status: "Terminé",
            date: "2026-10-20",
            description: "Un affrontement spectaculaire où le Roi des arènes a conservé sa couronne après un combat héroïque de 18 minutes.",
            image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "sp-3",
            discipline: "Basketball BAL",
            matchTitle: "Basketball Africa League - Conférence Sahara",
            team1: "AS Douanes (Sénégal)",
            team2: "US Monastir (Tunisie)",
            score1: "78",
            score2: "74",
            status: "Terminé",
            date: "2026-10-27",
            description: "Qualification historique de l'AS Douanes pour les phases finales de la BAL après un match au suspense insoutenable.",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "sp-4",
            discipline: "Handball",
            matchTitle: "Championnat National Féminin",
            team1: "Disso HC",
            team2: "DUC Handball",
            score1: "29",
            score2: "26",
            status: "Terminé",
            date: "2026-10-28",
            description: "Belle victoire de Disso HC qui prend la tête du classement au terme d'une rencontre rythmée.",
            image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80"
        }
    ],
    videos: [
        {
            id: "vid-1",
            title: "Édition Spéciale : Le point complet sur la transformation économique et le projet Sénégal 2050",
            description: "Grand format avec les analystes et économistes invités sur le plateau de RAO MEDIA TV pour décrypter les annonces phares.",
            youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            youtubeId: "dQw4w9WgXcQ",
            thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
            category: "Débats & Analyses",
            duration: "24:15",
            date: "2026-10-30"
        },
        {
            id: "vid-2",
            title: "Reportage exclusif : Au cœur des plateformes pétrolières de Sangomar au large de Dakar",
            description: "Nos envoyés spéciaux ont embarqué à bord du FPSO Léopold Sédar Senghor pour vous faire vivre les coulisses de l'extraction pétrolière.",
            youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
            youtubeId: "ScMzIvxBSi4",
            thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
            category: "Reportages",
            duration: "18:40",
            date: "2026-10-29"
        },
        {
            id: "vid-3",
            title: "Entretien exclusif avec le sélectionneur national : « Nous irons au bout de notre rêve »",
            description: "Grand entretien sportif sur les ambitions des Lions de la Teranga et les nouvelles tactiques mises en place.",
            youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
            youtubeId: "fJ9rUzIMcZQ",
            thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
            category: "Interviews",
            duration: "32:10",
            date: "2026-10-28"
        },
        {
            id: "vid-4",
            title: "Journal Télévisé RAO MEDIA TV : Édition du soir - Tous les titres de l'actualité",
            description: "Le résumé complet des grands titres nationaux et internationaux présentés par la rédaction.",
            youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
            youtubeId: "kJQP7kiw5Fk",
            thumbnail: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80",
            category: "JT & Directs",
            duration: "20:05",
            date: "2026-10-30"
        }
    ],
    users: [
        {
            id: "usr-1",
            name: "Aly Dieng",
            email: "admin@raomediatv.com",
            role: "Administrateur en Chef",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            status: "Actif",
            lastLogin: "2026-10-31 01:15"
        },
        {
            id: "usr-2",
            name: "Mamadou Lamine Ndiaye",
            email: "m.ndiaye@raomediatv.com",
            role: "Rédacteur en Chef",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            status: "Actif",
            lastLogin: "2026-10-30 18:20"
        },
        {
            id: "usr-3",
            name: "Aïssatou Sow",
            email: "a.sow@raomediatv.com",
            role: "Journaliste Senior",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
            status: "Actif",
            lastLogin: "2026-10-30 16:45"
        },
        {
            id: "usr-4",
            name: "Cheikh Tidiane Diop",
            email: "c.diop@raomediatv.com",
            role: "Journaliste Sportif",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            status: "Actif",
            lastLogin: "2026-10-30 14:10"
        }
    ],
    comments: [
        {
            id: "com-1",
            articleId: "art-1",
            authorName: "Abdoulaye Diallo",
            authorEmail: "a.diallo@gmail.com",
            comment: "Une vision claire et structurante pour le pays ! Il est crucial d'accompagner la jeunesse et d'accélérer l'industrialisation locale.",
            date: "2026-10-30 11:45",
            status: "approved"
        },
        {
            id: "com-2",
            articleId: "art-1",
            authorName: "Aminata Touré",
            authorEmail: "aminata.t@yahoo.fr",
            comment: "Article très bien rédigé par RAO MEDIA TV. Bravo pour le travail de journalisme de précision.",
            date: "2026-10-30 12:20",
            status: "approved"
        },
        {
            id: "com-3",
            articleId: "art-3",
            authorName: "Khadim Seck",
            authorEmail: "kseck@hotmail.com",
            comment: "Allez les Lions ! Sadio Mané reste le véritable meneur d'hommes de cette équipe nationale.",
            date: "2026-10-30 09:30",
            status: "approved"
        },
        {
            id: "com-4",
            articleId: "art-2",
            authorName: "Cheikh Sarr",
            authorEmail: "csarr@outlook.com",
            comment: "La transparence dans la gestion des revenus pétroliers est primordiale. Continuez de nous informer fidèlement.",
            date: "2026-10-29 17:10",
            status: "approved"
        }
    ]
};

// Initialisation au chargement
function initStorage() {
    try {
        if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
            localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_DATA.articles));
        }
        if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_DATA.categories));
        }
        if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
            localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_DATA.events));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SPORTS)) {
            localStorage.setItem(STORAGE_KEYS.SPORTS, JSON.stringify(INITIAL_DATA.sports));
        }
        if (!localStorage.getItem(STORAGE_KEYS.VIDEOS)) {
            localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(INITIAL_DATA.videos));
        }
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_DATA.users));
        }
        if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
            localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_DATA.comments));
        }
        if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_DATA.settings));
        }
    } catch (e) {
        console.error("Erreur lors de l'initialisation du storage:", e);
    }
}

// Utilitaires génériques
function getData(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error(`Erreur de lecture getData(${key}):`, e);
        return null;
    }
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error(`Erreur d'écriture saveData(${key}):`, e);
        if (e.name === 'QuotaExceededError') {
            alert("Espace de stockage local saturé ! Veuillez réduire la taille des images ou supprimer d'anciens articles.");
        }
        return false;
    }
}

// ----------------- GESTION DES ARTICLES -----------------
function getArticles(filter = {}) {
    const list = getData(STORAGE_KEYS.ARTICLES) || [];
    return list.filter(art => {
        if (filter.status && art.status !== filter.status) return false;
        if (filter.category && art.category !== filter.category) return false;
        if (filter.featured !== undefined && art.featured !== filter.featured) return false;
        if (filter.search) {
            const q = filter.search.toLowerCase();
            const inTitle = art.title && art.title.toLowerCase().includes(q);
            const inSummary = art.summary && art.summary.toLowerCase().includes(q);
            const inContent = art.content && art.content.toLowerCase().includes(q);
            if (!inTitle && !inSummary && !inContent) return false;
        }
        return true;
    }).sort((a, b) => new Date(b.date + ' ' + (b.time || '00:00')) - new Date(a.date + ' ' + (a.time || '00:00')));
}

function getArticleById(id) {
    const list = getData(STORAGE_KEYS.ARTICLES) || [];
    return list.find(a => a.id === id) || null;
}

function addArticle(article) {
    const list = getData(STORAGE_KEYS.ARTICLES) || [];
    const newArt = {
        id: "art-" + Date.now(),
        views: 0,
        status: "published",
        featured: false,
        time: new Date().toTimeString().slice(0, 5),
        ...article
    };
    list.unshift(newArt);
    saveData(STORAGE_KEYS.ARTICLES, list);
    return newArt;
}

function updateArticle(id, updatedFields) {
    const list = getData(STORAGE_KEYS.ARTICLES) || [];
    const index = list.findIndex(a => a.id === id);
    if (index !== -1) {
        list[index] = { ...list[index], ...updatedFields };
        saveData(STORAGE_KEYS.ARTICLES, list);
        return list[index];
    }
    return null;
}

function deleteArticle(id) {
    let list = getData(STORAGE_KEYS.ARTICLES) || [];
    list = list.filter(a => a.id !== id);
    saveData(STORAGE_KEYS.ARTICLES, list);
    // Supprimer aussi les commentaires associés
    let comments = getData(STORAGE_KEYS.COMMENTS) || [];
    comments = comments.filter(c => c.articleId !== id);
    saveData(STORAGE_KEYS.COMMENTS, comments);
    return true;
}

function incrementArticleViews(id) {
    const list = getData(STORAGE_KEYS.ARTICLES) || [];
    const article = list.find(a => a.id === id);
    if (article) {
        article.views = (article.views || 0) + 1;
        saveData(STORAGE_KEYS.ARTICLES, list);
    }
}

// ----------------- GESTION DES CATÉGORIES -----------------
function getCategories() {
    return getData(STORAGE_KEYS.CATEGORIES) || [];
}

function getCategoryById(id) {
    const list = getCategories();
    return list.find(c => c.id === id || c.slug === id) || null;
}

function addCategory(cat) {
    const list = getCategories();
    const id = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat = {
        id: id,
        slug: id,
        color: "#D71920",
        icon: "bi-tag",
        ...cat
    };
    list.push(newCat);
    saveData(STORAGE_KEYS.CATEGORIES, list);
    return newCat;
}

function updateCategory(id, updatedFields) {
    const list = getCategories();
    const index = list.findIndex(c => c.id === id);
    if (index !== -1) {
        list[index] = { ...list[index], ...updatedFields };
        saveData(STORAGE_KEYS.CATEGORIES, list);
        return list[index];
    }
    return null;
}

function deleteCategory(id) {
    let list = getCategories();
    list = list.filter(c => c.id !== id);
    saveData(STORAGE_KEYS.CATEGORIES, list);
    return true;
}

// ----------------- GESTION DES ÉVÉNEMENTS -----------------
function getEvents() {
    const list = getData(STORAGE_KEYS.EVENTS) || [];
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function getEventById(id) {
    const list = getEvents();
    return list.find(e => e.id === id) || null;
}

function addEvent(eventData) {
    const list = getData(STORAGE_KEYS.EVENTS) || [];
    const newEv = {
        id: "ev-" + Date.now(),
        status: "À venir",
        ...eventData
    };
    list.push(newEv);
    saveData(STORAGE_KEYS.EVENTS, list);
    return newEv;
}

function updateEvent(id, updatedFields) {
    const list = getData(STORAGE_KEYS.EVENTS) || [];
    const index = list.findIndex(e => e.id === id);
    if (index !== -1) {
        list[index] = { ...list[index], ...updatedFields };
        saveData(STORAGE_KEYS.EVENTS, list);
        return list[index];
    }
    return null;
}

function deleteEvent(id) {
    let list = getData(STORAGE_KEYS.EVENTS) || [];
    list = list.filter(e => e.id !== id);
    saveData(STORAGE_KEYS.EVENTS, list);
    return true;
}

// ----------------- GESTION DES SPORTS -----------------
function getSports() {
    const list = getData(STORAGE_KEYS.SPORTS) || [];
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function addSport(sportData) {
    const list = getData(STORAGE_KEYS.SPORTS) || [];
    const newSp = {
        id: "sp-" + Date.now(),
        status: "Terminé",
        ...sportData
    };
    list.unshift(newSp);
    saveData(STORAGE_KEYS.SPORTS, list);
    return newSp;
}

function updateSport(id, updatedFields) {
    const list = getData(STORAGE_KEYS.SPORTS) || [];
    const index = list.findIndex(s => s.id === id);
    if (index !== -1) {
        list[index] = { ...list[index], ...updatedFields };
        saveData(STORAGE_KEYS.SPORTS, list);
        return list[index];
    }
    return null;
}

function deleteSport(id) {
    let list = getData(STORAGE_KEYS.SPORTS) || [];
    list = list.filter(s => s.id !== id);
    saveData(STORAGE_KEYS.SPORTS, list);
    return true;
}

// ----------------- GESTION DES VIDÉOS -----------------
function extractYoutubeId(url) {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
}

function getVideos() {
    const list = getData(STORAGE_KEYS.VIDEOS) || [];
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function addVideo(videoData) {
    const list = getData(STORAGE_KEYS.VIDEOS) || [];
    const yId = extractYoutubeId(videoData.youtubeUrl);
    const newVid = {
        id: "vid-" + Date.now(),
        youtubeId: yId,
        thumbnail: videoData.thumbnail || (yId ? `https://img.youtube.com/vi/${yId}/hqdefault.jpg` : "assets/images/logo.png"),
        date: new Date().toISOString().slice(0, 10),
        ...videoData
    };
    list.unshift(newVid);
    saveData(STORAGE_KEYS.VIDEOS, list);
    return newVid;
}

function updateVideo(id, updatedFields) {
    const list = getData(STORAGE_KEYS.VIDEOS) || [];
    const index = list.findIndex(v => v.id === id);
    if (index !== -1) {
        if (updatedFields.youtubeUrl) {
            updatedFields.youtubeId = extractYoutubeId(updatedFields.youtubeUrl);
            if (!updatedFields.thumbnail) {
                updatedFields.thumbnail = `https://img.youtube.com/vi/${updatedFields.youtubeId}/hqdefault.jpg`;
            }
        }
        list[index] = { ...list[index], ...updatedFields };
        saveData(STORAGE_KEYS.VIDEOS, list);
        return list[index];
    }
    return null;
}

function deleteVideo(id) {
    let list = getData(STORAGE_KEYS.VIDEOS) || [];
    list = list.filter(v => v.id !== id);
    saveData(STORAGE_KEYS.VIDEOS, list);
    return true;
}

// ----------------- GESTION DES COMMENTAIRES -----------------
function getComments(articleId = null) {
    const list = getData(STORAGE_KEYS.COMMENTS) || [];
    if (articleId) {
        return list.filter(c => c.articleId === articleId && c.status === 'approved');
    }
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function addComment(commentData) {
    const list = getData(STORAGE_KEYS.COMMENTS) || [];
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
    const newCom = {
        id: "com-" + Date.now(),
        status: "approved", // auto-approuvé pour expérience fluide, mais modérable dans l'admin
        date: dateStr,
        ...commentData
    };
    list.unshift(newCom);
    saveData(STORAGE_KEYS.COMMENTS, list);
    return newCom;
}

function updateCommentStatus(id, status) {
    const list = getData(STORAGE_KEYS.COMMENTS) || [];
    const comment = list.find(c => c.id === id);
    if (comment) {
        comment.status = status;
        saveData(STORAGE_KEYS.COMMENTS, list);
        return true;
    }
    return false;
}

function deleteComment(id) {
    let list = getData(STORAGE_KEYS.COMMENTS) || [];
    list = list.filter(c => c.id !== id);
    saveData(STORAGE_KEYS.COMMENTS, list);
    return true;
}

// ----------------- GESTION DES UTILISATEURS -----------------
function getUsers() {
    return getData(STORAGE_KEYS.USERS) || [];
}

function addUser(userData) {
    const list = getUsers();
    const newUser = {
        id: "usr-" + Date.now(),
        status: "Actif",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        lastLogin: "Jamais",
        ...userData
    };
    list.push(newUser);
    saveData(STORAGE_KEYS.USERS, list);
    return newUser;
}

function updateUser(id, updatedFields) {
    const list = getUsers();
    const index = list.findIndex(u => u.id === id);
    if (index !== -1) {
        list[index] = { ...list[index], ...updatedFields };
        saveData(STORAGE_KEYS.USERS, list);
        return list[index];
    }
    return null;
}

function deleteUser(id) {
    let list = getUsers();
    list = list.filter(u => u.id !== id);
    saveData(STORAGE_KEYS.USERS, list);
    return true;
}

// ----------------- PARAMÈTRES DU SITE -----------------
function getSettings() {
    return getData(STORAGE_KEYS.SETTINGS) || INITIAL_DATA.settings;
}

function updateSettings(newSettings) {
    const current = getSettings();
    const updated = { ...current, ...newSettings };
    saveData(STORAGE_KEYS.SETTINGS, updated);
    return updated;
}

// ----------------- STATISTIQUES DASHBOARD -----------------
function getDashboardStats() {
    const articles = getData(STORAGE_KEYS.ARTICLES) || [];
    const categories = getData(STORAGE_KEYS.CATEGORIES) || [];
    const events = getData(STORAGE_KEYS.EVENTS) || [];
    const videos = getData(STORAGE_KEYS.VIDEOS) || [];
    const sports = getData(STORAGE_KEYS.SPORTS) || [];
    const comments = getData(STORAGE_KEYS.COMMENTS) || [];

    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const publishedArticles = articles.filter(a => a.status === 'published').length;
    const draftArticles = articles.filter(a => a.status === 'draft').length;
    const pendingComments = comments.filter(c => c.status === 'pending').length;

    return {
        totalArticles: articles.length,
        publishedArticles,
        draftArticles,
        totalCategories: categories.length,
        totalEvents: events.length,
        totalVideos: videos.length,
        totalSports: sports.length,
        totalComments: comments.length,
        pendingComments,
        totalViews
    };
}

// ----------------- EXPORT / IMPORT / RESET -----------------
function exportDatabase() {
    const backup = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        settings: getSettings(),
        categories: getCategories(),
        articles: getData(STORAGE_KEYS.ARTICLES),
        events: getData(STORAGE_KEYS.EVENTS),
        sports: getData(STORAGE_KEYS.SPORTS),
        videos: getData(STORAGE_KEYS.VIDEOS),
        users: getData(STORAGE_KEYS.USERS),
        comments: getData(STORAGE_KEYS.COMMENTS)
    };
    return JSON.stringify(backup, null, 2);
}

function importDatabase(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        if (parsed.articles) saveData(STORAGE_KEYS.ARTICLES, parsed.articles);
        if (parsed.categories) saveData(STORAGE_KEYS.CATEGORIES, parsed.categories);
        if (parsed.events) saveData(STORAGE_KEYS.EVENTS, parsed.events);
        if (parsed.sports) saveData(STORAGE_KEYS.SPORTS, parsed.sports);
        if (parsed.videos) saveData(STORAGE_KEYS.VIDEOS, parsed.videos);
        if (parsed.users) saveData(STORAGE_KEYS.USERS, parsed.users);
        if (parsed.comments) saveData(STORAGE_KEYS.COMMENTS, parsed.comments);
        if (parsed.settings) saveData(STORAGE_KEYS.SETTINGS, parsed.settings);
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

function resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_DATA.articles));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_DATA.categories));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_DATA.events));
    localStorage.setItem(STORAGE_KEYS.SPORTS, JSON.stringify(INITIAL_DATA.sports));
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(INITIAL_DATA.videos));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_DATA.users));
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(INITIAL_DATA.comments));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_DATA.settings));
    return true;
}

// Compression d'image via Canvas pour préserver le quota de localStorage
function compressImage(file, maxWidth = 900, maxHeight = 600, quality = 0.7) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.match(/image.*/)) {
            return reject(new Error("Le fichier fourni n'est pas une image valide"));
        }
        const reader = new FileReader();
        reader.onload = function(readerEvent) {
            const image = new Image();
            image.onload = function() {
                let width = image.width;
                let height = image.height;
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            image.onerror = reject;
            image.src = readerEvent.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Auto-initialisation au chargement du script
initStorage();

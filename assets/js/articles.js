/**
 * RAO MEDIA TV - articles.js
 * Logique d'affichage et d'interaction des articles sur le site public :
 * - Page d'accueil (Hero, catégories, tendances)
 * - Page de détail d'article (lecture, partages, commentaires)
 * - Page de catégorie & recherche
 */

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.toLowerCase();

    // Détection de la page courante
    if (path.endsWith('article.html') || window.location.href.includes('article.html')) {
        initArticleDetailPage();
    } else if (path.endsWith('categorie.html') || window.location.href.includes('categorie.html')) {
        initCategoryPage();
    } else if (path.endsWith('index.html') || path.endsWith('/') || path.endsWith('rao-media-tv')) {
        initHomePageArticles();
    }
});

// =========================================================================
// 1. PAGE D'ACCUEIL : AFFICHAGE DES ARTICLES
// =========================================================================
function initHomePageArticles() {
    const publishedArticles = getArticles({ status: 'published' });
    if (!publishedArticles || publishedArticles.length === 0) return;

    // 1.1 Section À LA UNE (Hero)
    const featuredArticles = publishedArticles.filter(a => a.featured);
    const mainHeroArticle = featuredArticles.length > 0 ? featuredArticles[0] : publishedArticles[0];
    const secondaryHeroArticles = publishedArticles.filter(a => a.id !== mainHeroArticle.id).slice(0, 4);

    renderMainHero(mainHeroArticle);
    renderSecondaryHero(secondaryHeroArticles);

    // 1.2 Section Flash Info / Tendances (Les plus lus)
    renderTrendingArticles(publishedArticles);

    // 1.3 Sections par catégories (Politique, Économie, Société, Culture, etc.)
    renderCategorySection('politique-articles-container', 'politique', 4);
    renderCategorySection('economie-articles-container', 'economie', 4);
    renderCategorySection('societe-articles-container', 'societe', 4);
    renderCategorySection('culture-articles-container', 'culture', 4);
    renderCategorySection('international-articles-container', 'international', 4);
    renderCategorySection('tech-sante-articles-container', ['technologie', 'sante', 'education'], 4);
}

function renderMainHero(article) {
    const container = document.getElementById('hero-main-container');
    if (!container || !article) return;

    const cat = getCategoryById(article.category);
    const catName = cat ? cat.name : article.category;
    const catColor = cat ? cat.color : '#D71920';

    container.innerHTML = `
        <div class="hero-main-card">
            <img src="${article.image || 'assets/images/logo.png'}" alt="${escapeHtml(article.title)}" class="hero-main-img">
            <div class="hero-overlay">
                <span class="badge-category mb-2" style="background-color: ${catColor};">${escapeHtml(catName)}</span>
                <h1 class="hero-title">
                    <a href="article.html?id=${article.id}">${escapeHtml(article.title)}</a>
                </h1>
                <p class="text-light mb-3 d-none d-md-block opacity-75">${escapeHtml(article.summary || '')}</p>
                <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-2 border-top border-secondary border-opacity-50">
                    <div class="text-light small opacity-75">
                        <i class="bi bi-person-fill me-1"></i> ${escapeHtml(article.author || 'Rédaction')} &nbsp;|&nbsp;
                        <i class="bi bi-clock me-1"></i> ${formatDateFR(article.date)}
                    </div>
                    <a href="article.html?id=${article.id}" class="btn btn-rao-red btn-sm px-3">
                        Lire l'article <i class="bi bi-arrow-right ms-1"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderSecondaryHero(articles) {
    const container = document.getElementById('hero-secondary-container');
    if (!container) return;

    if (!articles || articles.length === 0) {
        container.innerHTML = '<p class="text-muted">Aucune actualité secondaire.</p>';
        return;
    }

    let html = '<div class="row g-3">';
    articles.forEach(art => {
        const cat = getCategoryById(art.category);
        const catName = cat ? cat.name : art.category;
        const catColor = cat ? cat.color : '#D71920';

        html += `
            <div class="col-sm-6">
                <div class="hero-secondary-card">
                    <div class="hero-secondary-img-wrapper">
                        <img src="${art.image || 'assets/images/logo.png'}" alt="${escapeHtml(art.title)}" class="hero-secondary-img">
                        <span class="badge-category position-absolute top-0 start-0 m-2" style="background-color: ${catColor};">${escapeHtml(catName)}</span>
                    </div>
                    <div class="card-body">
                        <div class="text-muted small mb-1">
                            <i class="bi bi-clock me-1"></i> ${formatDateFR(art.date)}
                        </div>
                        <h3 class="hero-secondary-title">
                            <a href="article.html?id=${art.id}">${escapeHtml(art.title)}</a>
                        </h3>
                        <a href="article.html?id=${art.id}" class="mt-auto text-rao-red fw-bold small">
                            Lire la suite <i class="bi bi-chevron-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderTrendingArticles(articles) {
    const container = document.getElementById('trending-articles-container');
    if (!container) return;

    // Trier par nombre de vues
    const sorted = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
    let html = '';

    sorted.forEach((art, idx) => {
        const cat = getCategoryById(art.category);
        const catName = cat ? cat.name : art.category;

        html += `
            <div class="mini-article">
                <span class="fw-bold fs-4 text-rao-red me-2" style="width: 25px;">0${idx + 1}</span>
                <div class="mini-img-wrap">
                    <img src="${art.image || 'assets/images/logo.png'}" alt="${escapeHtml(art.title)}" class="mini-img">
                </div>
                <div class="flex-grow-1">
                    <span class="text-uppercase text-muted fw-bold" style="font-size: 0.68rem;">${escapeHtml(catName)}</span>
                    <h4 class="mini-title">
                        <a href="article.html?id=${art.id}">${escapeHtml(art.title)}</a>
                    </h4>
                    <span class="text-muted" style="font-size: 0.72rem;">
                        <i class="bi bi-eye me-1"></i> ${art.views || 0} vues
                    </span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderCategorySection(containerId, categoryFilter, limit = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allArticles = getArticles({ status: 'published' });
    let filtered = [];

    if (Array.isArray(categoryFilter)) {
        filtered = allArticles.filter(a => categoryFilter.includes(a.category));
    } else {
        filtered = allArticles.filter(a => a.category === categoryFilter);
    }

    filtered = filtered.slice(0, limit);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="col-12 text-muted py-3">Aucun article dans cette rubrique pour le moment.</div>';
        return;
    }

    let html = '';
    filtered.forEach(art => {
        const cat = getCategoryById(art.category);
        const catName = cat ? cat.name : art.category;
        const catColor = cat ? cat.color : '#D71920';

        html += `
            <div class="col-md-6 col-lg-3">
                <div class="article-card">
                    <div class="article-img-wrap">
                        <img src="${art.image || 'assets/images/logo.png'}" alt="${escapeHtml(art.title)}" class="article-img">
                        <span class="badge-category position-absolute top-0 start-0 m-2" style="background-color: ${catColor};">${escapeHtml(catName)}</span>
                    </div>
                    <div class="p-3 d-flex flex-column flex-grow-1">
                        <div class="article-meta">
                            <span><i class="bi bi-clock me-1"></i>${formatDateFR(art.date)}</span>
                            <span><i class="bi bi-chat-dots me-1"></i>${getComments(art.id).length}</span>
                        </div>
                        <h3 class="article-title">
                            <a href="article.html?id=${art.id}">${escapeHtml(art.title)}</a>
                        </h3>
                        <p class="article-summary">${escapeHtml(art.summary || '')}</p>
                        <div class="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                            <span class="text-muted small">${escapeHtml(art.author || 'Rédaction')}</span>
                            <a href="article.html?id=${art.id}" class="text-rao-red fw-bold small">
                                Lire <i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// =========================================================================
// 2. PAGE DÉTAIL D'UN ARTICLE (article.html)
// =========================================================================
function initArticleDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');

    if (!articleId) {
        const container = document.getElementById('article-detail-container');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-warning text-center my-5">
                    <h4><i class="bi bi-exclamation-triangle me-2"></i>Article non spécifié</h4>
                    <p>Veuillez sélectionner un article depuis la page d'accueil.</p>
                    <a href="index.html" class="btn btn-rao-red mt-2">Retour à l'accueil</a>
                </div>
            `;
        }
        return;
    }

    const article = getArticleById(articleId);
    if (!article) {
        const container = document.getElementById('article-detail-container');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger text-center my-5">
                    <h4><i class="bi bi-x-circle me-2"></i>Article introuvable</h4>
                    <p>L'article demandé n'existe pas ou a été retiré de la publication.</p>
                    <a href="index.html" class="btn btn-rao-red mt-2">Retour à l'accueil</a>
                </div>
            `;
        }
        return;
    }

    // Incrémenter le compteur de vues
    incrementArticleViews(article.id);

    // Mettre à jour le titre du document
    document.title = `${article.title} - RAO MEDIA TV`;

    // Catégorie
    const cat = getCategoryById(article.category);
    const catName = cat ? cat.name : article.category;
    const catColor = cat ? cat.color : '#D71920';

    // Remplir le fil d'Ariane
    const breadcrumbCat = document.getElementById('breadcrumb-category');
    if (breadcrumbCat) {
        breadcrumbCat.textContent = catName;
        breadcrumbCat.href = `categorie.html?cat=${article.category}`;
    }
    const breadcrumbTitle = document.getElementById('breadcrumb-title');
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = article.title;
    }

    // Remplir les données de l'article
    const titleEl = document.getElementById('article-title');
    if (titleEl) titleEl.textContent = article.title;

    const catBadge = document.getElementById('article-category-badge');
    if (catBadge) {
        catBadge.textContent = catName;
        catBadge.style.backgroundColor = catColor;
    }

    const dateEl = document.getElementById('article-date');
    if (dateEl) {
        dateEl.innerHTML = `<i class="bi bi-calendar3 me-1"></i> Publié le ${formatDateFR(article.date)} à ${article.time || '10:00'}`;
    }

    const viewsEl = document.getElementById('article-views');
    if (viewsEl) {
        viewsEl.innerHTML = `<i class="bi bi-eye me-1"></i> ${(article.views || 0) + 1} vues`;
    }

    const authorEl = document.getElementById('article-author');
    if (authorEl) authorEl.textContent = article.author || 'Rédaction RAO MEDIA TV';

    const authorRoleEl = document.getElementById('article-author-role');
    if (authorRoleEl) authorRoleEl.textContent = article.authorRole || 'Journaliste / Correspondant';

    const leadEl = document.getElementById('article-lead');
    if (leadEl) {
        if (article.summary) {
            leadEl.textContent = article.summary;
            leadEl.style.display = 'block';
        } else {
            leadEl.style.display = 'none';
        }
    }

    const imgEl = document.getElementById('article-image');
    if (imgEl) {
        imgEl.src = article.image || 'assets/images/logo.png';
        imgEl.alt = article.title;
    }

    const contentEl = document.getElementById('article-content');
    if (contentEl) {
        contentEl.innerHTML = article.content || '<p>Aucun contenu textuel disponible.</p>';
    }

    // Tags
    const tagsContainer = document.getElementById('article-tags');
    if (tagsContainer) {
        if (article.tags && article.tags.length > 0) {
            tagsContainer.innerHTML = article.tags.map(t =>
                `<a href="categorie.html?q=${encodeURIComponent(t)}" class="badge bg-light text-dark border p-2 me-1 mb-1 text-decoration-none"><i class="bi bi-tag me-1 text-danger"></i>${escapeHtml(t)}</a>`
            ).join('');
        } else {
            tagsContainer.innerHTML = `<a href="categorie.html?cat=${article.category}" class="badge bg-light text-dark border p-2"><i class="bi bi-tag me-1 text-danger"></i>${catName}</a>`;
        }
    }

    // Initialiser les boutons de partage
    initShareButtons(article);

    // Initialiser les articles similaires
    renderRelatedArticles(article);

    // Initialiser les commentaires
    initComments(article.id);
}

function initShareButtons(article) {
    const currentUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title + " - RAO MEDIA TV");

    const btnWa = document.getElementById('share-whatsapp');
    if (btnWa) {
        btnWa.href = `https://api.whatsapp.com/send?text=${title}%20${currentUrl}`;
        btnWa.target = "_blank";
    }

    const btnFb = document.getElementById('share-facebook');
    if (btnFb) {
        btnFb.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        btnFb.target = "_blank";
    }

    const btnTw = document.getElementById('share-twitter');
    if (btnTw) {
        btnTw.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`;
        btnTw.target = "_blank";
    }

    const btnCopy = document.getElementById('share-copy');
    if (btnCopy) {
        btnCopy.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast("Lien copié !", "L'URL de l'article a été copiée dans votre presse-papiers.", "success");
            }).catch(() => {
                showToast("Erreur", "Impossible de copier automatiquement le lien.", "danger");
            });
        });
    }
}

function renderRelatedArticles(currentArticle) {
    const container = document.getElementById('related-articles-container');
    if (!container) return;

    const allArticles = getArticles({ status: 'published' });
    const related = allArticles.filter(a => a.id !== currentArticle.id && a.category === currentArticle.category).slice(0, 3);
    const fallback = related.length > 0 ? related : allArticles.filter(a => a.id !== currentArticle.id).slice(0, 3);

    let html = '';
    fallback.forEach(art => {
        html += `
            <div class="col-md-4 mb-3">
                <div class="article-card h-100">
                    <div class="article-img-wrap" style="height: 140px;">
                        <img src="${art.image || 'assets/images/logo.png'}" alt="${escapeHtml(art.title)}" class="article-img">
                    </div>
                    <div class="p-3 d-flex flex-column flex-grow-1">
                        <span class="text-muted small mb-1"><i class="bi bi-clock me-1"></i>${formatDateFR(art.date)}</span>
                        <h5 class="fs-6 fw-bold mb-2">
                            <a href="article.html?id=${art.id}">${escapeHtml(art.title)}</a>
                        </h5>
                        <a href="article.html?id=${art.id}" class="mt-auto text-rao-red small fw-bold">Lire <i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function initComments(articleId) {
    const commentsListContainer = document.getElementById('comments-list');
    const commentCountBadge = document.getElementById('comments-count-badge');
    const commentForm = document.getElementById('article-comment-form');

    function refreshCommentsList() {
        const approvedComments = getComments(articleId);
        if (commentCountBadge) {
            commentCountBadge.textContent = approvedComments.length;
        }

        if (!commentsListContainer) return;

        if (approvedComments.length === 0) {
            commentsListContainer.innerHTML = `
                <div class="text-center py-4 bg-light rounded text-muted">
                    <i class="bi bi-chat-square-text fs-2 d-block mb-2"></i>
                    Soyez le premier à commenter cet article !
                </div>
            `;
            return;
        }

        let html = '';
        approvedComments.forEach(c => {
            html += `
                <div class="comment-card">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-dark text-white fw-bold d-flex align-items-center justify-content-center me-2" style="width: 36px; height: 36px; font-size: 0.9rem;">
                                ${escapeHtml(c.authorName.charAt(0).toUpperCase())}
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold">${escapeHtml(c.authorName)}</h6>
                                <span class="text-muted" style="font-size: 0.75rem;"><i class="bi bi-clock me-1"></i>${c.date}</span>
                            </div>
                        </div>
                    </div>
                    <p class="mb-0 text-secondary" style="font-size: 0.92rem; line-height: 1.5;">${escapeHtml(c.comment)}</p>
                </div>
            `;
        });
        commentsListContainer.innerHTML = html;
    }

    refreshCommentsList();

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('comment-author-name');
            const emailInput = document.getElementById('comment-author-email');
            const messageInput = document.getElementById('comment-author-message');

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                showToast("Attention", "Veuillez renseigner tous les champs obligatoires.", "danger");
                return;
            }

            addComment({
                articleId: articleId,
                authorName: nameInput.value.trim(),
                authorEmail: emailInput.value.trim(),
                comment: messageInput.value.trim()
            });

            showToast("Commentaire publié !", "Merci pour votre contribution au débat.", "success");
            commentForm.reset();
            refreshCommentsList();
        });
    }
}

// =========================================================================
// 3. PAGE CATÉGORIE & RÉSULTATS DE RECHERCHE (categorie.html)
// =========================================================================
function initCategoryPage() {
    const params = new URLSearchParams(window.location.search);
    const currentCatSlug = params.get('cat');
    const searchQuery = params.get('q');

    const pageTitle = document.getElementById('category-page-title');
    const pageDesc = document.getElementById('category-page-desc');
    const categoryPills = document.getElementById('category-pills-container');
    const articlesContainer = document.getElementById('category-articles-container');
    const paginationContainer = document.getElementById('category-pagination');

    // Générer les pilules de catégories
    const categories = getCategories();
    if (categoryPills) {
        let pillsHtml = `
            <a href="categorie.html" class="btn btn-sm ${!currentCatSlug && !searchQuery ? 'btn-rao-red' : 'btn-outline-dark'} me-2 mb-2">
                Toutes les rubriques
            </a>
        `;
        categories.forEach(c => {
            const isActive = currentCatSlug === c.id || currentCatSlug === c.slug;
            pillsHtml += `
                <a href="categorie.html?cat=${c.id}" class="btn btn-sm ${isActive ? 'btn-rao-red' : 'btn-outline-dark'} me-2 mb-2">
                    <i class="bi ${c.icon || 'bi-tag'} me-1"></i>${escapeHtml(c.name)}
                </a>
            `;
        });
        categoryPills.innerHTML = pillsHtml;
    }

    // Filtrer les articles
    let articles = [];
    if (searchQuery) {
        if (pageTitle) pageTitle.innerHTML = `<i class="bi bi-search text-rao-red me-2"></i>Résultats de recherche : "${escapeHtml(searchQuery)}"`;
        if (pageDesc) pageDesc.textContent = "Articles correspondants à votre requête dans les archives de RAO MEDIA TV";
        articles = getArticles({ status: 'published', search: searchQuery });
    } else if (currentCatSlug) {
        const cat = getCategoryById(currentCatSlug);
        const catName = cat ? cat.name : currentCatSlug;
        if (pageTitle) pageTitle.innerHTML = `<i class="bi ${cat ? cat.icon : 'bi-folder'} text-rao-red me-2"></i>Rubrique : ${escapeHtml(catName)}`;
        if (pageDesc) pageDesc.textContent = cat && cat.description ? cat.description : "Toute l'actualité en continu décryptée par la rédaction.";
        articles = getArticles({ status: 'published', category: currentCatSlug });
    } else {
        if (pageTitle) pageTitle.innerHTML = `<i class="bi bi-newspaper text-rao-red me-2"></i>Toutes les Actualités`;
        if (pageDesc) pageDesc.textContent = "L'ensemble du fil d'information de RAO MEDIA TV au Sénégal et à l'international.";
        articles = getArticles({ status: 'published' });
    }

    // Pagination (6 articles par page)
    const ITEMS_PER_PAGE = 6;
    const currentPage = parseInt(params.get('p') || '1', 10);
    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (articlesContainer) {
        if (articles.length === 0) {
            articlesContainer.innerHTML = `
                <div class="col-12 py-5 text-center">
                    <i class="bi bi-search display-3 text-muted mb-3 d-block"></i>
                    <h4>Aucun article ne correspond à vos critères</h4>
                    <p class="text-muted">Essayez un autre mot-clé ou parcourez nos autres rubriques.</p>
                    <a href="categorie.html" class="btn btn-rao-red mt-2">Voir tous les articles</a>
                </div>
            `;
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        let html = '';
        pageArticles.forEach(art => {
            const cat = getCategoryById(art.category);
            const catName = cat ? cat.name : art.category;
            const catColor = cat ? cat.color : '#D71920';

            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="article-card h-100">
                        <div class="article-img-wrap">
                            <img src="${art.image || 'assets/images/logo.png'}" alt="${escapeHtml(art.title)}" class="article-img">
                            <span class="badge-category position-absolute top-0 start-0 m-2" style="background-color: ${catColor};">${escapeHtml(catName)}</span>
                        </div>
                        <div class="p-3 d-flex flex-column flex-grow-1">
                            <div class="article-meta">
                                <span><i class="bi bi-clock me-1"></i>${formatDateFR(art.date)}</span>
                                <span><i class="bi bi-eye me-1"></i>${art.views || 0}</span>
                            </div>
                            <h3 class="article-title">
                                <a href="article.html?id=${art.id}">${escapeHtml(art.title)}</a>
                            </h3>
                            <p class="article-summary">${escapeHtml(art.summary || '')}</p>
                            <div class="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                                <span class="text-muted small">${escapeHtml(art.author || 'Rédaction')}</span>
                                <a href="article.html?id=${art.id}" class="text-rao-red fw-bold small">
                                    Lire l'article <i class="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        articlesContainer.innerHTML = html;

        // Construire la pagination
        if (paginationContainer && totalPages > 1) {
            let pagHtml = `<nav aria-label="Pagination articles"><ul class="pagination justify-content-center">`;
            // Bouton précédent
            pagHtml += `
                <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="${buildPageUrl(currentPage - 1, currentCatSlug, searchQuery)}">Précédent</a>
                </li>
            `;
            // Numéros
            for (let i = 1; i <= totalPages; i++) {
                pagHtml += `
                    <li class="page-item ${currentPage === i ? 'active' : ''}">
                        <a class="page-link" href="${buildPageUrl(i, currentCatSlug, searchQuery)}">${i}</a>
                    </li>
                `;
            }
            // Bouton suivant
            pagHtml += `
                <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="${buildPageUrl(currentPage + 1, currentCatSlug, searchQuery)}">Suivant</a>
                </li>
            `;
            pagHtml += `</ul></nav>`;
            paginationContainer.innerHTML = pagHtml;
        } else if (paginationContainer) {
            paginationContainer.innerHTML = '';
        }
    }
}

function buildPageUrl(pageNum, catSlug, searchQuery) {
    const params = new URLSearchParams();
    if (catSlug) params.set('cat', catSlug);
    if (searchQuery) params.set('q', searchQuery);
    params.set('p', pageNum);
    return `categorie.html?${params.toString()}`;
}

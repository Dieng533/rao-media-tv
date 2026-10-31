/**
 * RAO MEDIA TV - admin.js
 * Logique complète de l'Espace Administration :
 * - Authentification & Session guard
 * - Statistiques dynamiques du Dashboard
 * - CRUD Articles, Événements, Sports, Vidéos, Catégories, Utilisateurs, Commentaires
 * - Outils d'export / import / reset JSON et paramètres du site
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Vérification d'authentification
    checkAdminAuth();

    // 2. Gestion de la sidebar responsive & déconnexion
    initAdminLayout();

    // 3. Détection de la page courante et initialisation du contrôleur associé
    const currentPath = window.location.pathname.toLowerCase();

    if (currentPath.endsWith('login.html')) {
        initLoginPage();
    } else if (currentPath.endsWith('dashboard.html')) {
        initDashboardPage();
    } else if (currentPath.endsWith('articles.html')) {
        initArticlesListPage();
    } else if (currentPath.endsWith('ajouter-article.html')) {
        initArticleEditorPage();
    } else if (currentPath.endsWith('evenements.html')) {
        initAdminEventsPage();
    } else if (currentPath.endsWith('sports.html')) {
        initAdminSportsPage();
    } else if (currentPath.endsWith('videos.html')) {
        initAdminVideosPage();
    } else if (currentPath.endsWith('categories.html')) {
        initAdminCategoriesPage();
    } else if (currentPath.endsWith('utilisateurs.html')) {
        initAdminUsersPage();
    } else if (currentPath.endsWith('commentaires.html')) {
        initAdminCommentsPage();
    } else if (currentPath.endsWith('parametres.html')) {
        initAdminSettingsPage();
    }
});

// =========================================================================
// 1. AUTHENTIFICATION & SESSION
// =========================================================================
function checkAdminAuth() {
    const isLoginPage = window.location.pathname.toLowerCase().endsWith('login.html');
    const authData = getData(STORAGE_KEYS.AUTH);

    if (!isLoginPage && !authData) {
        window.location.href = 'login.html';
    } else if (isLoginPage && authData) {
        window.location.href = 'dashboard.html';
    }
}

function initLoginPage() {
    const loginForm = document.getElementById('admin-login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const demoFillBtn = document.getElementById('btn-fill-demo');
    const loginAlert = document.getElementById('login-alert');

    if (demoFillBtn) {
        demoFillBtn.addEventListener('click', () => {
            if (emailInput) emailInput.value = 'admin@raomediatv.com';
            if (passwordInput) passwordInput.value = 'Admin123!';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Identifiants requis par la spécification : admin@raomediatv.com / Admin123!
            if (email === 'admin@raomediatv.com' && password === 'Admin123!') {
                const sessionUser = {
                    name: 'Aly Dieng',
                    email: email,
                    role: 'Administrateur en Chef',
                    loginTime: new Date().toISOString()
                };
                saveData(STORAGE_KEYS.AUTH, sessionUser);
                window.location.href = 'dashboard.html';
            } else {
                if (loginAlert) {
                    loginAlert.textContent = "Identifiants invalides. Utilisez admin@raomediatv.com et Admin123!";
                    loginAlert.classList.remove('d-none');
                }
            }
        });
    }
}

function initAdminLayout() {
    // Bouton de déconnexion
    const logoutBtns = document.querySelectorAll('.btn-admin-logout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("Êtes-vous sûr de vouloir vous déconnecter de l'administration ?")) {
                localStorage.removeItem(STORAGE_KEYS.AUTH);
                window.location.href = 'login.html';
            }
        });
    });

    // Toggle sidebar mobile
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    // Affichage nom administrateur connecté
    const authData = getData(STORAGE_KEYS.AUTH);
    if (authData) {
        document.querySelectorAll('.admin-user-name').forEach(el => el.textContent = authData.name || 'Admin');
        document.querySelectorAll('.admin-user-role').forEach(el => el.textContent = authData.role || 'Super Admin');
    }

    // Mettre en évidence le lien actif de la sidebar
    const currentPageName = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// =========================================================================
// 2. DASHBOARD
// =========================================================================
function initDashboardPage() {
    const stats = getDashboardStats();

    // Mettre à jour les compteurs
    setText('stat-total-articles', stats.totalArticles);
    setText('stat-published-articles', stats.publishedArticles);
    setText('stat-draft-articles', stats.draftArticles);
    setText('stat-categories', stats.totalCategories);
    setText('stat-events', stats.totalEvents);
    setText('stat-videos', stats.totalVideos);
    setText('stat-total-comments', stats.totalComments);
    setText('stat-total-views', stats.totalViews.toLocaleString());

    // Remplir la table des 5 derniers articles
    const recentArticlesTable = document.getElementById('dashboard-recent-articles');
    if (recentArticlesTable) {
        const articles = getArticles().slice(0, 5);
        let html = '';
        articles.forEach(art => {
            const cat = getCategoryById(art.category);
            const catName = cat ? cat.name : art.category;
            const isPub = art.status === 'published';

            html += `
                <tr>
                    <td style="width: 70px;">
                        <img src="${art.image || '../assets/images/logo.png'}" class="table-thumb" alt="${escapeHtml(art.title)}">
                    </td>
                    <td>
                        <a href="ajouter-article.html?id=${art.id}" class="fw-bold text-dark text-decoration-none">
                            ${escapeHtml(art.title)}
                        </a>
                        <div class="small text-muted">${formatDateFR(art.date)} par ${escapeHtml(art.author || 'Rédaction')}</div>
                    </td>
                    <td><span class="badge bg-light text-dark border">${escapeHtml(catName)}</span></td>
                    <td>
                        <span class="badge-status ${isPub ? 'badge-status-published' : 'badge-status-draft'}">
                            ${isPub ? 'Publié' : 'Brouillon'}
                        </span>
                    </td>
                    <td><i class="bi bi-eye me-1"></i>${art.views || 0}</td>
                    <td class="text-end">
                        <a href="../article.html?id=${art.id}" target="_blank" class="btn btn-sm btn-outline-secondary" title="Voir"><i class="bi bi-box-arrow-up-right"></i></a>
                        <a href="ajouter-article.html?id=${art.id}" class="btn btn-sm btn-outline-primary" title="Modifier"><i class="bi bi-pencil"></i></a>
                    </td>
                </tr>
            `;
        });
        recentArticlesTable.innerHTML = html || '<tr><td colspan="6" class="text-center py-3 text-muted">Aucun article enregistré.</td></tr>';
    }

    // Remplir les derniers commentaires
    const recentCommentsTable = document.getElementById('dashboard-recent-comments');
    if (recentCommentsTable) {
        const comments = getComments().slice(0, 5);
        let html = '';
        comments.forEach(c => {
            const art = getArticleById(c.articleId);
            const artTitle = art ? art.title : 'Article supprimé';

            html += `
                <tr>
                    <td>
                        <strong>${escapeHtml(c.authorName)}</strong>
                        <div class="small text-muted">${c.authorEmail}</div>
                    </td>
                    <td style="max-width: 250px;">
                        <div class="text-truncate">${escapeHtml(c.comment)}</div>
                        <span class="small text-muted">Sur : ${escapeHtml(artTitle)}</span>
                    </td>
                    <td><span class="badge-status ${c.status === 'approved' ? 'badge-status-approved' : 'badge-status-pending'}">${c.status === 'approved' ? 'Approuvé' : 'En attente'}</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteComment('${c.id}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        recentCommentsTable.innerHTML = html || '<tr><td colspan="4" class="text-center py-3 text-muted">Aucun commentaire pour le moment.</td></tr>';
    }
}

function setText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text;
}

// =========================================================================
// 3. GESTION DES ARTICLES (articles.html)
// =========================================================================
function initArticlesListPage() {
    const tableBody = document.getElementById('admin-articles-table-body');
    const searchInput = document.getElementById('article-filter-search');
    const categorySelect = document.getElementById('article-filter-category');
    const statusSelect = document.getElementById('article-filter-status');

    // Remplir les catégories dans le filtre
    if (categorySelect) {
        const cats = getCategories();
        cats.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            categorySelect.appendChild(opt);
        });
    }

    function renderArticlesTable() {
        if (!tableBody) return;

        const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const selectedCat = categorySelect ? categorySelect.value : '';
        const selectedStatus = statusSelect ? statusSelect.value : '';

        const allArticles = getArticles();
        const filtered = allArticles.filter(art => {
            if (selectedCat && art.category !== selectedCat) return false;
            if (selectedStatus && art.status !== selectedStatus) return false;
            if (searchQuery) {
                const inTitle = art.title && art.title.toLowerCase().includes(searchQuery);
                const inAuthor = art.author && art.author.toLowerCase().includes(searchQuery);
                if (!inTitle && !inAuthor) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-muted">Aucun article ne correspond aux critères de recherche.</td></tr>';
            return;
        }

        let html = '';
        filtered.forEach(art => {
            const cat = getCategoryById(art.category);
            const catName = cat ? cat.name : art.category;
            const isPub = art.status === 'published';

            html += `
                <tr>
                    <td style="width: 70px;">
                        <img src="${art.image || '../assets/images/logo.png'}" class="table-thumb" alt="${escapeHtml(art.title)}">
                    </td>
                    <td>
                        <strong class="text-dark">${escapeHtml(art.title)}</strong>
                        ${art.featured ? '<span class="badge bg-danger ms-1" style="font-size: 0.65rem;">À la une</span>' : ''}
                    </td>
                    <td><span class="badge bg-light text-dark border">${escapeHtml(catName)}</span></td>
                    <td>${escapeHtml(art.author || 'Rédaction')}</td>
                    <td>${formatDateFR(art.date)}</td>
                    <td>
                        <button class="btn btn-sm ${isPub ? 'btn-success' : 'btn-warning'} py-0 px-2 text-white" onclick="adminTogglePublishArticle('${art.id}')" title="Cliquer pour changer de statut" style="font-size: 0.75rem;">
                            ${isPub ? 'Publié' : 'Brouillon'}
                        </button>
                    </td>
                    <td><i class="bi bi-eye me-1"></i>${art.views || 0}</td>
                    <td class="text-end">
                        <div class="btn-group btn-group-sm">
                            <a href="../article.html?id=${art.id}" target="_blank" class="btn btn-outline-secondary" title="Prévisualiser sur le site"><i class="bi bi-box-arrow-up-right"></i></a>
                            <a href="ajouter-article.html?id=${art.id}" class="btn btn-outline-primary" title="Modifier"><i class="bi bi-pencil"></i></a>
                            <button class="btn btn-outline-danger" onclick="adminConfirmDeleteArticle('${art.id}', '${escapeHtml(art.title)}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }

    renderArticlesTable();

    if (searchInput) searchInput.addEventListener('input', renderArticlesTable);
    if (categorySelect) categorySelect.addEventListener('change', renderArticlesTable);
    if (statusSelect) statusSelect.addEventListener('change', renderArticlesTable);
}

// Basculer statut publié / brouillon
window.adminTogglePublishArticle = function(id) {
    const article = getArticleById(id);
    if (!article) return;
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    updateArticle(id, { status: newStatus });
    initArticlesListPage();
};

// Suppression sécurisée avec confirmation
window.adminConfirmDeleteArticle = function(id, title) {
    if (confirm(`Êtes-vous certain de vouloir supprimer définitivement l'article suivant ?\n\n"${title}"`)) {
        deleteArticle(id);
        initArticlesListPage();
    }
};

// =========================================================================
// 4. ÉDITION / AJOUT D'ARTICLE (ajouter-article.html)
// =========================================================================
function initArticleEditorPage() {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('id');

    const form = document.getElementById('article-form');
    const pageTitle = document.getElementById('editor-page-title');
    const categorySelect = document.getElementById('article-category');
    const imageInput = document.getElementById('article-image-url');
    const imageFileInput = document.getElementById('article-image-file');
    const imagePreview = document.getElementById('article-image-preview');
    const contentArea = document.getElementById('article-editor-content');

    // Remplir les catégories
    if (categorySelect) {
        const cats = getCategories();
        categorySelect.innerHTML = '<option value="">Sélectionnez une catégorie...</option>';
        cats.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.name;
            categorySelect.appendChild(opt);
        });
    }

    // Gestion de l'aperçu d'image depuis l'URL
    if (imageInput && imagePreview) {
        imageInput.addEventListener('input', () => {
            if (imageInput.value.trim()) {
                imagePreview.src = imageInput.value.trim();
                imagePreview.classList.remove('d-none');
            } else {
                imagePreview.classList.add('d-none');
            }
        });
    }

    // Gestion du téléversement d'image avec compression pour localStorage
    if (imageFileInput && imageInput && imagePreview) {
        imageFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const compressedBase64 = await compressImage(file, 900, 600, 0.7);
                    imageInput.value = compressedBase64;
                    imagePreview.src = compressedBase64;
                    imagePreview.classList.remove('d-none');
                } catch (err) {
                    alert("Erreur lors de la compression de l'image : " + err.message);
                }
            }
        });
    }

    // Barre d'outils d'édition (Gras, Italique, Titres, Citations, etc.)
    initWysiwygToolbar(contentArea);

    // Mode Édition si ID présent
    if (editId) {
        const article = getArticleById(editId);
        if (article) {
            if (pageTitle) pageTitle.innerHTML = `<i class="bi bi-pencil-square text-rao-red me-2"></i>Modifier l'article`;
            document.getElementById('article-title').value = article.title || '';
            if (categorySelect) categorySelect.value = article.category || '';
            document.getElementById('article-author').value = article.author || '';
            document.getElementById('article-date').value = article.date || '';
            document.getElementById('article-summary').value = article.summary || '';
            if (contentArea) contentArea.innerHTML = article.content || '';
            if (imageInput) imageInput.value = article.image || '';
            if (imagePreview && article.image) {
                imagePreview.src = article.image;
                imagePreview.classList.remove('d-none');
            }
            const featuredCheckbox = document.getElementById('article-featured');
            if (featuredCheckbox) featuredCheckbox.checked = !!article.featured;
        }
    } else {
        // Préremplir la date d'aujourd'hui
        const dateInput = document.getElementById('article-date');
        if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
    }

    // Soumission du formulaire
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveArticleHandler(editId, 'published');
        });

        const btnDraft = document.getElementById('btn-save-draft');
        if (btnDraft) {
            btnDraft.addEventListener('click', () => {
                saveArticleHandler(editId, 'draft');
            });
        }
    }
}

function initWysiwygToolbar(contentArea) {
    if (!contentArea) return;
    document.querySelectorAll('.editor-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cmd = btn.getAttribute('data-cmd');
            const val = btn.getAttribute('data-val') || null;

            if (cmd === 'formatBlock') {
                document.execCommand('formatBlock', false, val);
            } else if (cmd === 'insertImage') {
                const url = prompt("Entrez l'URL de l'image à insérer dans l'article :");
                if (url) document.execCommand('insertImage', false, url);
            } else if (cmd === 'createLink') {
                const url = prompt("Entrez l'URL du lien :");
                if (url) document.execCommand('createLink', false, url);
            } else {
                document.execCommand(cmd, false, val);
            }
            contentArea.focus();
        });
    });
}

function saveArticleHandler(editId, status = 'published') {
    const title = document.getElementById('article-title').value.trim();
    const category = document.getElementById('article-category').value;
    const author = document.getElementById('article-author').value.trim();
    const date = document.getElementById('article-date').value;
    const summary = document.getElementById('article-summary').value.trim();
    const contentArea = document.getElementById('article-editor-content');
    const content = contentArea ? contentArea.innerHTML.trim() : '';
    const image = document.getElementById('article-image-url').value.trim() || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80';
    const featured = document.getElementById('article-featured').checked;

    if (!title || !category || !content) {
        alert("Veuillez renseigner au moins le titre, la catégorie et le contenu de l'article.");
        return;
    }

    const articleData = {
        title,
        category,
        author: author || 'Rédaction RAO MEDIA TV',
        date: date || new Date().toISOString().slice(0, 10),
        summary,
        content,
        image,
        featured,
        status
    };

    if (editId) {
        updateArticle(editId, articleData);
        alert("L'article a été mis à jour avec succès !");
    } else {
        addArticle(articleData);
        alert("Le nouvel article a été enregistré avec succès !");
    }

    window.location.href = 'articles.html';
}

// =========================================================================
// 5. GESTION DES ÉVÉNEMENTS (evenements.html)
// =========================================================================
function initAdminEventsPage() {
    const tableBody = document.getElementById('admin-events-table-body');
    const form = document.getElementById('event-modal-form');

    function renderEvents() {
        if (!tableBody) return;
        const events = getEvents();

        if (events.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">Aucun événement enregistré.</td></tr>';
            return;
        }

        let html = '';
        events.forEach(ev => {
            html += `
                <tr>
                    <td style="width: 70px;">
                        <img src="${ev.image || '../assets/images/logo.png'}" class="table-thumb" alt="${escapeHtml(ev.name)}">
                    </td>
                    <td>
                        <strong>${escapeHtml(ev.name)}</strong>
                        <div class="small text-muted">${escapeHtml(ev.description.slice(0, 60))}...</div>
                    </td>
                    <td><span class="badge bg-light text-dark border">${escapeHtml(ev.category || 'Général')}</span></td>
                    <td><i class="bi bi-geo-alt me-1 text-danger"></i>${escapeHtml(ev.venue)}</td>
                    <td>${formatDateFR(ev.date)} à ${escapeHtml(ev.time || '10:00')}</td>
                    <td><span class="badge bg-primary">${escapeHtml(ev.status || 'À venir')}</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteEvent('${ev.id}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }

    renderEvents();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('event-name').value.trim();
            const description = document.getElementById('event-description').value.trim();
            const venue = document.getElementById('event-venue').value.trim();
            const date = document.getElementById('event-date').value;
            const time = document.getElementById('event-time').value.trim();
            const category = document.getElementById('event-category').value.trim();
            const image = document.getElementById('event-image').value.trim() || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80';
            const status = document.getElementById('event-status').value;

            addEvent({ name, description, venue, date, time, category, image, status });
            form.reset();

            // Fermer modale
            const modalEl = document.getElementById('addEventModal');
            if (modalEl && window.bootstrap) {
                bootstrap.Modal.getInstance(modalEl).hide();
            }

            renderEvents();
        });
    }
}

window.adminDeleteEvent = function(id) {
    if (confirm("Supprimer cet événement ?")) {
        deleteEvent(id);
        initAdminEventsPage();
    }
};

// =========================================================================
// 6. GESTION DES SPORTS (sports.html)
// =========================================================================
function initAdminSportsPage() {
    const tableBody = document.getElementById('admin-sports-table-body');
    const form = document.getElementById('sport-modal-form');

    function renderSports() {
        if (!tableBody) return;
        const sports = getSports();

        if (sports.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-muted">Aucune fiche sportive enregistrée.</td></tr>';
            return;
        }

        let html = '';
        sports.forEach(sp => {
            html += `
                <tr>
                    <td><span class="badge bg-danger text-uppercase">${escapeHtml(sp.discipline)}</span></td>
                    <td><strong>${escapeHtml(sp.matchTitle)}</strong></td>
                    <td>${escapeHtml(sp.team1)} vs ${escapeHtml(sp.team2)}</td>
                    <td><span class="badge bg-dark fs-6">${escapeHtml(sp.score1 || '0')} - ${escapeHtml(sp.score2 || '0')}</span></td>
                    <td>${formatDateFR(sp.date)}</td>
                    <td><span class="badge bg-secondary">${escapeHtml(sp.status || 'Terminé')}</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteSport('${sp.id}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }

    renderSports();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const discipline = document.getElementById('sport-discipline').value.trim();
            const matchTitle = document.getElementById('sport-match-title').value.trim();
            const team1 = document.getElementById('sport-team1').value.trim();
            const team2 = document.getElementById('sport-team2').value.trim();
            const score1 = document.getElementById('sport-score1').value.trim();
            const score2 = document.getElementById('sport-score2').value.trim();
            const date = document.getElementById('sport-date').value;
            const description = document.getElementById('sport-description').value.trim();

            addSport({ discipline, matchTitle, team1, team2, score1, score2, date, description });
            form.reset();

            const modalEl = document.getElementById('addSportModal');
            if (modalEl && window.bootstrap) {
                bootstrap.Modal.getInstance(modalEl).hide();
            }

            renderSports();
        });
    }
}

window.adminDeleteSport = function(id) {
    if (confirm("Supprimer cette actualité sportive ?")) {
        deleteSport(id);
        initAdminSportsPage();
    }
};

// =========================================================================
// 7. GESTION DES VIDÉOS (videos.html)
// =========================================================================
function initAdminVideosPage() {
    const tableBody = document.getElementById('admin-videos-table-body');
    const form = document.getElementById('video-modal-form');

    function renderVideos() {
        if (!tableBody) return;
        const videos = getVideos();

        if (videos.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">Aucune vidéo enregistrée.</td></tr>';
            return;
        }

        let html = '';
        videos.forEach(v => {
            html += `
                <tr>
                    <td style="width: 80px;">
                        <img src="${v.thumbnail || '../assets/images/logo.png'}" class="table-thumb" alt="${escapeHtml(v.title)}">
                    </td>
                    <td>
                        <strong>${escapeHtml(v.title)}</strong>
                        <div class="small text-muted">${escapeHtml(v.description ? v.description.slice(0, 60) + '...' : '')}</div>
                    </td>
                    <td><span class="badge bg-light text-dark border">${escapeHtml(v.category || 'Général')}</span></td>
                    <td><a href="${v.youtubeUrl}" target="_blank" class="small text-danger"><i class="bi bi-youtube me-1"></i>Ouvrir</a></td>
                    <td>${formatDateFR(v.date)}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteVideo('${v.id}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }

    renderVideos();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('video-title').value.trim();
            const youtubeUrl = document.getElementById('video-url').value.trim();
            const category = document.getElementById('video-category').value.trim();
            const description = document.getElementById('video-description').value.trim();

            addVideo({ title, youtubeUrl, category, description });
            form.reset();

            const modalEl = document.getElementById('addVideoModal');
            if (modalEl && window.bootstrap) {
                bootstrap.Modal.getInstance(modalEl).hide();
            }

            renderVideos();
        });
    }
}

window.adminDeleteVideo = function(id) {
    if (confirm("Supprimer cette vidéo ?")) {
        deleteVideo(id);
        initAdminVideosPage();
    }
};

// =========================================================================
// 8. GESTION DES CATÉGORIES (categories.html)
// =========================================================================
function initAdminCategoriesPage() {
    const tableBody = document.getElementById('admin-categories-table-body');
    const form = document.getElementById('category-modal-form');

    function renderCategories() {
        if (!tableBody) return;
        const categories = getCategories();
        const articles = getArticles();

        let html = '';
        categories.forEach(c => {
            const count = articles.filter(a => a.category === c.id || a.category === c.slug).length;

            html += `
                <tr>
                    <td><span class="badge px-3 py-2 text-white" style="background-color: ${c.color || '#D71920'};"><i class="bi ${c.icon || 'bi-tag'} me-2"></i>${escapeHtml(c.name)}</span></td>
                    <td><code>${escapeHtml(c.slug || c.id)}</code></td>
                    <td>${escapeHtml(c.description || '-')}</td>
                    <td><span class="badge bg-secondary">${count} articles</span></td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteCategory('${c.id}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }

    renderCategories();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cat-name').value.trim();
            const slug = document.getElementById('cat-slug').value.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
            const color = document.getElementById('cat-color').value;
            const description = document.getElementById('cat-description').value.trim();

            addCategory({ name, slug, color, description });
            form.reset();

            const modalEl = document.getElementById('addCategoryModal');
            if (modalEl && window.bootstrap) {
                bootstrap.Modal.getInstance(modalEl).hide();
            }

            renderCategories();
        });
    }
}

window.adminDeleteCategory = function(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
        deleteCategory(id);
        initAdminCategoriesPage();
    }
};

// =========================================================================
// 9. GESTION DES UTILISATEURS (utilisateurs.html)
// =========================================================================
function initAdminUsersPage() {
    const tableBody = document.getElementById('admin-users-table-body');
    const form = document.getElementById('user-modal-form');

    function renderUsers() {
        if (!tableBody) return;
        const users = getUsers();

        let html = '';
        users.forEach(u => {
            html += `
                <tr>
                    <td style="width: 50px;">
                        <img src="${u.avatar || '../assets/images/logo.png'}" class="rounded-circle" style="width: 38px; height: 38px; object-fit: cover;" alt="${escapeHtml(u.name)}">
                    </td>
                    <td>
                        <strong>${escapeHtml(u.name)}</strong>
                        <div class="small text-muted">${escapeHtml(u.email)}</div>
                    </td>
                    <td><span class="badge bg-dark">${escapeHtml(u.role)}</span></td>
                    <td><span class="badge bg-success">${escapeHtml(u.status || 'Actif')}</span></td>
                    <td>${escapeHtml(u.lastLogin || '-')}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="adminDeleteUser('${u.id}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }

    renderUsers();

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('user-name').value.trim();
            const email = document.getElementById('user-email').value.trim();
            const role = document.getElementById('user-role').value;

            addUser({ name, email, role, status: 'Actif' });
            form.reset();

            const modalEl = document.getElementById('addUserModal');
            if (modalEl && window.bootstrap) {
                bootstrap.Modal.getInstance(modalEl).hide();
            }

            renderUsers();
        });
    }
}

window.adminDeleteUser = function(id) {
    if (confirm("Supprimer cet utilisateur ?")) {
        deleteUser(id);
        initAdminUsersPage();
    }
};

// =========================================================================
// 10. GESTION DES COMMENTAIRES (commentaires.html)
// =========================================================================
function initAdminCommentsPage() {
    const tableBody = document.getElementById('admin-comments-table-body');

    function renderComments() {
        if (!tableBody) return;
        const comments = getComments();

        if (comments.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">Aucun commentaire enregistré.</td></tr>';
            return;
        }

        let html = '';
        comments.forEach(c => {
            const art = getArticleById(c.articleId);
            const artTitle = art ? art.title : 'Article supprimé';
            const isApproved = c.status === 'approved';

            html += `
                <tr>
                    <td>
                        <strong>${escapeHtml(c.authorName)}</strong>
                        <div class="small text-muted">${escapeHtml(c.authorEmail)}</div>
                    </td>
                    <td style="max-width: 300px;">
                        <p class="mb-1">${escapeHtml(c.comment)}</p>
                        <span class="small text-muted"><i class="bi bi-newspaper me-1"></i>${escapeHtml(artTitle)}</span>
                    </td>
                    <td>${c.date}</td>
                    <td>
                        <span class="badge-status ${isApproved ? 'badge-status-approved' : 'badge-status-pending'}">
                            ${isApproved ? 'Approuvé' : 'En attente'}
                        </span>
                    </td>
                    <td class="text-end">
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-success" onclick="adminApproveComment('${c.id}')" title="Approuver"><i class="bi bi-check-lg"></i></button>
                            <button class="btn btn-outline-danger" onclick="adminDeleteComment('${c.id}')" title="Supprimer"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }

    renderComments();
}

window.adminApproveComment = function(id) {
    updateCommentStatus(id, 'approved');
    initAdminCommentsPage();
};

window.adminDeleteComment = function(id) {
    if (confirm("Supprimer définitivement ce commentaire ?")) {
        deleteComment(id);
        initAdminCommentsPage();
    }
};

// =========================================================================
// 11. PARAMÈTRES DU SITE & MAINTENANCE (parametres.html)
// =========================================================================
function initAdminSettingsPage() {
    const settings = getSettings();

    // Remplir les champs
    setVal('setting-site-name', settings.siteName);
    setVal('setting-slogan', settings.slogan);
    setVal('setting-logo', settings.logo);
    setVal('setting-email', settings.email);
    setVal('setting-phone', settings.phone);
    setVal('setting-whatsapp', settings.whatsapp);
    setVal('setting-address', settings.address);
    setVal('setting-facebook', settings.facebook);
    setVal('setting-twitter', settings.twitter);
    setVal('setting-youtube', settings.youtube);
    setVal('setting-instagram', settings.instagram);
    setVal('setting-tiktok', settings.tiktok);
    setVal('setting-footer-about', settings.footerAbout);

    // Formulaire des paramètres
    const settingsForm = document.getElementById('site-settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newSettings = {
                siteName: getVal('setting-site-name'),
                slogan: getVal('setting-slogan'),
                logo: getVal('setting-logo'),
                email: getVal('setting-email'),
                phone: getVal('setting-phone'),
                whatsapp: getVal('setting-whatsapp'),
                address: getVal('setting-address'),
                facebook: getVal('setting-facebook'),
                twitter: getVal('setting-twitter'),
                youtube: getVal('setting-youtube'),
                instagram: getVal('setting-instagram'),
                tiktok: getVal('setting-tiktok'),
                footerAbout: getVal('setting-footer-about')
            };

            updateSettings(newSettings);
            alert("Les paramètres du site ont été mis à jour avec succès !");
        });
    }

    // Export JSON
    const btnExport = document.getElementById('btn-export-database');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            const jsonStr = exportDatabase();
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `rao_media_tv_backup_${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Import JSON
    const importFileInput = document.getElementById('import-database-file');
    if (importFileInput) {
        importFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    const result = importDatabase(evt.target.result);
                    if (result.success) {
                        alert("Sauvegarde importée avec succès ! La page va se recharger.");
                        window.location.reload();
                    } else {
                        alert("Erreur lors de l'import : " + result.error);
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    // Reset Demo Data
    const btnReset = document.getElementById('btn-reset-demo');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm("Attention : Cette action va réinitialiser l'ensemble des données du site avec les données de démonstration par défaut. Voulez-vous continuer ?")) {
                resetDemoData();
                alert("Données de démonstration restaurées !");
                window.location.reload();
            }
        });
    }
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

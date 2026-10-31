/**
 * RAO MEDIA TV - app.js
 * Logique globale du site public : Header, Navigation, Ticker, Date, Météo, Recherche & Newsletter
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation de la date en français
    initCurrentDate();

    // 2. Chargement des paramètres du site (nom, logo, réseaux sociaux, footer)
    loadSiteSettings();

    // 3. Initialisation du bandeau d'actualités "Dernière Minute"
    initBreakingTicker();

    // 4. Initialisation de la barre de recherche globale
    initGlobalSearch();

    // 5. Initialisation du formulaire de Newsletter
    initNewsletter();
});

/**
 * Affiche la date actuelle au format sénégalais/français
 */
function initCurrentDate() {
    const dateEl = document.getElementById('current-date-display');
    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const now = new Date();
        const dateStr = now.toLocaleDateString('fr-FR', options);
        dateEl.innerHTML = `<i class="bi bi-calendar3 me-1 text-rao-red"></i> ${dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}`;
    }
}

/**
 * Applique dynamiquement les paramètres enregistrés dans localStorage (Logo, Titres, Liens)
 */
function loadSiteSettings() {
    const settings = getSettings();
    if (!settings) return;

    // Logos
    document.querySelectorAll('.brand-logo-img').forEach(img => {
        img.src = settings.logo || 'assets/images/logo.png';
        img.alt = settings.siteName || 'RAO MEDIA TV';
    });

    // Titres & Slogans
    document.querySelectorAll('.site-name-text').forEach(el => {
        el.textContent = settings.siteName;
    });
    document.querySelectorAll('.site-slogan-text').forEach(el => {
        el.textContent = settings.slogan;
    });

    // Coordonnées footer
    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) footerEmail.textContent = settings.email;

    const footerPhone = document.getElementById('footer-phone');
    if (footerPhone) footerPhone.textContent = settings.phone;

    const footerAddress = document.getElementById('footer-address');
    if (footerAddress) footerAddress.textContent = settings.address;

    const footerAbout = document.getElementById('footer-about');
    if (footerAbout) footerAbout.textContent = settings.footerAbout;

    // Liens réseaux sociaux
    const socialLinks = {
        'social-fb': settings.facebook,
        'social-tw': settings.twitter,
        'social-yt': settings.youtube,
        'social-ig': settings.instagram,
        'social-tk': settings.tiktok,
        'social-wa': settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}` : '#'
    };

    Object.keys(socialLinks).forEach(id => {
        document.querySelectorAll('.' + id).forEach(link => {
            if (socialLinks[id]) {
                link.href = socialLinks[id];
                link.target = '_blank';
            }
        });
    });
}

/**
 * Charge les derniers articles publiés dans le bandeau défilant "Dernière Minute"
 */
function initBreakingTicker() {
    const tickerContainer = document.getElementById('ticker-track');
    if (!tickerContainer) return;

    const articles = getArticles({ status: 'published' }).slice(0, 8);
    if (!articles || articles.length === 0) {
        tickerContainer.innerHTML = `<span class="ticker-item">Bienvenue sur RAO MEDIA TV - L'actualité en continu au Sénégal et dans le monde.</span>`;
        return;
    }

    let tickerHTML = '';
    articles.forEach(art => {
        tickerHTML += `
            <a href="article.html?id=${art.id}" class="ticker-item">
                <i class="bi bi-dot text-danger fs-5 align-middle"></i>
                <strong>[${art.category.toUpperCase()}]</strong> ${escapeHtml(art.title)}
            </a>
        `;
    });

    // Dupliquer pour un défilement continu fluide
    tickerContainer.innerHTML = tickerHTML + tickerHTML;
}

/**
 * Gestion de la recherche globale (input de recherche en navbar ou modal)
 */
function initGlobalSearch() {
    const searchForm = document.getElementById('global-search-form');
    const searchInput = document.getElementById('global-search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length > 0) {
                window.location.href = `categorie.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Modal search si présent
    const modalSearchForm = document.getElementById('modal-search-form');
    const modalSearchInput = document.getElementById('modal-search-input');
    if (modalSearchForm && modalSearchInput) {
        modalSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = modalSearchInput.value.trim();
            if (query.length > 0) {
                window.location.href = `categorie.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

/**
 * Gestion de l'inscription à la Newsletter
 */
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showToast("Félicitations !", "Votre inscription à la newsletter de RAO MEDIA TV a été prise en compte avec succès.", "success");
                emailInput.value = '';
            }
        });
    }
}

/**
 * Utilitaire pour afficher un message Toast temporaire
 */
function showToast(title, message, type = 'info') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success text-white' : type === 'danger' ? 'bg-danger text-white' : 'bg-dark text-white';

    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <strong>${escapeHtml(title)}</strong><br>
                    ${escapeHtml(message)}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fermer"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && bootstrap.Toast) {
        const bsToast = new bootstrap.Toast(toastEl, { delay: 4500 });
        bsToast.show();
        toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    } else {
        setTimeout(() => toastEl.remove(), 4500);
    }
}

/**
 * Échappement HTML sécurisé
 */
function escapeHtml(text) {
    if (!text) return '';
    return text
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Formate une date YYYY-MM-DD en format lisible en français (ex: 30 Octobre 2026)
 */
function formatDateFR(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

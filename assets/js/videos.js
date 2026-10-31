/**
 * RAO MEDIA TV - videos.js
 * Logique d'affichage des contenus audiovisuels, reportages et intégration YouTube
 */

document.addEventListener('DOMContentLoaded', () => {
    initVideosSection();
    initVideoModalHandler();
});

function initVideosSection() {
    const homeVideosContainer = document.getElementById('home-videos-container');
    const allVideosContainer = document.getElementById('all-videos-container');

    const videos = getVideos();
    if (!videos || videos.length === 0) return;

    // Rendu sur la page d'accueil (4 vidéos)
    if (homeVideosContainer) {
        let html = '';
        videos.slice(0, 4).forEach(v => {
            html += `
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="video-card" onclick="openVideoPlayer('${v.youtubeId}', '${escapeHtml(v.title)}')">
                        <div class="video-thumb-wrap">
                            <img src="${v.thumbnail || 'assets/images/logo.png'}" alt="${escapeHtml(v.title)}" class="video-thumb">
                            <div class="video-play-btn"><i class="bi bi-play-fill"></i></div>
                            <span class="video-duration">${v.duration || 'Vidéo'}</span>
                        </div>
                        <div class="video-info">
                            <span class="badge bg-danger mb-1" style="font-size: 0.68rem;">${escapeHtml(v.category || 'RAO MEDIA TV')}</span>
                            <h4 class="video-title text-truncate-2">${escapeHtml(v.title)}</h4>
                            <span class="text-secondary small"><i class="bi bi-clock me-1"></i>${formatDateFR(v.date)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        homeVideosContainer.innerHTML = html;
    }

    // Rendu sur la page dédiée `videos.html`
    if (allVideosContainer) {
        // Mettre en avant la première vidéo dans le lecteur principal si présent
        const mainPlayer = document.getElementById('main-video-player-frame');
        const mainTitle = document.getElementById('main-video-title');
        const mainDesc = document.getElementById('main-video-desc');

        if (mainPlayer && videos.length > 0) {
            mainPlayer.src = `https://www.youtube.com/embed/${videos[0].youtubeId}?autoplay=0&rel=0`;
            if (mainTitle) mainTitle.textContent = videos[0].title;
            if (mainDesc) mainDesc.textContent = videos[0].description;
        }

        let html = '';
        videos.forEach(v => {
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="video-card h-100 d-flex flex-column" onclick="openVideoPlayer('${v.youtubeId}', '${escapeHtml(v.title)}')">
                        <div class="video-thumb-wrap">
                            <img src="${v.thumbnail || 'assets/images/logo.png'}" alt="${escapeHtml(v.title)}" class="video-thumb">
                            <div class="video-play-btn"><i class="bi bi-play-fill"></i></div>
                            <span class="video-duration">${v.duration || 'Vidéo'}</span>
                        </div>
                        <div class="video-info d-flex flex-column flex-grow-1">
                            <span class="badge bg-danger align-self-start mb-2" style="font-size: 0.7rem;">${escapeHtml(v.category || 'Reportage')}</span>
                            <h4 class="video-title">${escapeHtml(v.title)}</h4>
                            <p class="text-secondary small mt-1 flex-grow-1" style="font-size: 0.84rem;">${escapeHtml(v.description || '')}</p>
                            <span class="text-secondary small mt-auto pt-2 border-top border-secondary border-opacity-25">
                                <i class="bi bi-calendar3 me-1"></i>${formatDateFR(v.date)}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });
        allVideosContainer.innerHTML = html;
    }
}

/**
 * Ouvre la vidéo dans une modale Bootstrap avec player YouTube fluide
 */
function openVideoPlayer(youtubeId, title) {
    let modal = document.getElementById('videoPlayerModal');
    if (!modal) {
        const modalHtml = `
            <div class="modal fade" id="videoPlayerModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content bg-dark text-white border-0">
                        <div class="modal-header border-bottom border-secondary py-2">
                            <h5 class="modal-title fs-6 fw-bold text-truncate" id="videoModalTitle">Lecteur Vidéo</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fermer"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="ratio ratio-16x9">
                                <iframe id="videoModalIframe" src="" title="RAO MEDIA TV Video" allowfullscreen allow="autoplay; encrypted-media"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('videoPlayerModal');
    }

    const titleEl = document.getElementById('videoModalTitle');
    const iframeEl = document.getElementById('videoModalIframe');

    if (titleEl) titleEl.textContent = title;
    if (iframeEl) iframeEl.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    modal.addEventListener('hidden.bs.modal', () => {
        if (iframeEl) iframeEl.src = '';
    }, { once: true });
}

function initVideoModalHandler() {
    // Écouteur global si besoin
}

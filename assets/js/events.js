/**
 * RAO MEDIA TV - events.js
 * Logique d'affichage et de filtrage des événements et agendas au Sénégal
 */

document.addEventListener('DOMContentLoaded', () => {
    initEventsPage();
    initHomeEventsSection();
});

function initHomeEventsSection() {
    const container = document.getElementById('home-events-container');
    if (!container) return;

    const events = getEvents().slice(0, 3);
    if (!events || events.length === 0) {
        container.innerHTML = '<div class="col-12 text-muted">Aucun événement planifié pour le moment.</div>';
        return;
    }

    let html = '';
    events.forEach(ev => {
        const dateObj = new Date(ev.date);
        const day = dateObj.getDate() || '15';
        const month = dateObj.toLocaleDateString('fr-FR', { month: 'short' }) || 'Nov';

        html += `
            <div class="col-md-4 mb-3">
                <div class="event-card h-100 d-flex flex-column p-3">
                    <div class="d-flex align-items-start gap-3 mb-2">
                        <div class="event-date-badge">
                            <span class="day">${day}</span>
                            <span class="month">${month}</span>
                        </div>
                        <div class="flex-grow-1">
                            <span class="badge bg-light text-danger border border-danger border-opacity-25 mb-1" style="font-size: 0.68rem;">${escapeHtml(ev.category || 'Événement')}</span>
                            <h5 class="fs-6 fw-bold mb-1">${escapeHtml(ev.name)}</h5>
                            <div class="text-muted small"><i class="bi bi-geo-alt-fill text-danger me-1"></i>${escapeHtml(ev.venue)}</div>
                        </div>
                    </div>
                    <p class="text-secondary small mt-2 mb-3 flex-grow-1" style="line-height: 1.4;">${escapeHtml(ev.description)}</p>
                    <a href="evenements.html" class="btn btn-outline-dark btn-sm w-100 mt-auto">
                        Voir l'agenda complet <i class="bi bi-arrow-right ms-1"></i>
                    </a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function initEventsPage() {
    const eventsContainer = document.getElementById('events-page-list');
    if (!eventsContainer) return;

    const filterBtns = document.querySelectorAll('.event-filter-btn');
    let currentFilter = 'all';

    function renderFilteredEvents(statusFilter = 'all') {
        const allEvents = getEvents();
        const filtered = statusFilter === 'all' ? allEvents : allEvents.filter(e => e.status === statusFilter);

        if (filtered.length === 0) {
            eventsContainer.innerHTML = `
                <div class="col-12 py-5 text-center">
                    <i class="bi bi-calendar-x display-4 text-muted mb-3 d-block"></i>
                    <h5>Aucun événement dans cette catégorie</h5>
                    <p class="text-muted">Revenez bientôt pour découvrir les nouveaux rendez-vous de l'agenda.</p>
                </div>
            `;
            return;
        }

        let html = '';
        filtered.forEach(ev => {
            const dateObj = new Date(ev.date);
            const day = dateObj.getDate() || '01';
            const month = dateObj.toLocaleDateString('fr-FR', { month: 'short' }) || 'JAN';

            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="event-card h-100 d-flex flex-column">
                        <div class="position-relative" style="height: 180px; overflow: hidden; background: #000;">
                            <img src="${ev.image || 'assets/images/logo.png'}" alt="${escapeHtml(ev.name)}" class="w-100 h-100" style="object-fit: cover;">
                            <span class="badge bg-danger position-absolute top-0 end-0 m-2">${escapeHtml(ev.status || 'À venir')}</span>
                        </div>
                        <div class="p-3 d-flex flex-column flex-grow-1">
                            <div class="d-flex align-items-center gap-3 mb-3">
                                <div class="event-date-badge">
                                    <span class="day">${day}</span>
                                    <span class="month">${month}</span>
                                </div>
                                <div>
                                    <span class="badge bg-light text-dark border mb-1" style="font-size: 0.7rem;">${escapeHtml(ev.category || 'Général')}</span>
                                    <h4 class="fs-6 fw-bold mb-0">${escapeHtml(ev.name)}</h4>
                                </div>
                            </div>

                            <p class="text-secondary small mb-3 flex-grow-1" style="line-height: 1.5;">${escapeHtml(ev.description)}</p>

                            <div class="pt-2 border-top text-muted small mb-3">
                                <div class="mb-1"><i class="bi bi-geo-alt-fill text-danger me-2"></i><strong>Lieu :</strong> ${escapeHtml(ev.venue)}</div>
                                <div><i class="bi bi-clock-fill text-secondary me-2"></i><strong>Horaire :</strong> ${escapeHtml(ev.time || 'Non spécifié')}</div>
                            </div>

                            <button class="btn btn-rao-red btn-sm w-100 mt-auto" onclick="alert('Rappel programmé pour : ${escapeHtml(ev.name)}')">
                                <i class="bi bi-bell-fill me-1"></i> Me rappeler cet événement
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        eventsContainer.innerHTML = html;
    }

    renderFilteredEvents('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active', 'btn-rao-red'));
            filterBtns.forEach(b => b.classList.add('btn-outline-dark'));
            btn.classList.add('active', 'btn-rao-red');
            btn.classList.remove('btn-outline-dark');
            const filter = btn.getAttribute('data-filter') || 'all';
            renderFilteredEvents(filter);
        });
    });
}

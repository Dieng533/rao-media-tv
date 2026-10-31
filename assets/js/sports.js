/**
 * RAO MEDIA TV - sports.js
 * Logique d'affichage des scores, matchs et actualités sportives
 * (Football, Lutte sénégalaise, Basketball BAL, Handball)
 */

document.addEventListener('DOMContentLoaded', () => {
    initSportsSection();
});

function initSportsSection() {
    const scoresContainer = document.getElementById('sports-scores-container');
    if (!scoresContainer) return;

    const sportsList = getSports();
    if (!sportsList || sportsList.length === 0) {
        scoresContainer.innerHTML = '<div class="col-12 text-muted">Aucun résultat sportif récent.</div>';
        return;
    }

    let html = '';
    sportsList.slice(0, 4).forEach(sp => {
        html += `
            <div class="col-md-6 col-lg-3 mb-3">
                <div class="sport-match-card h-100 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="sport-discipline-tag"><i class="bi bi-trophy-fill me-1"></i>${escapeHtml(sp.discipline)}</span>
                        <span class="badge bg-secondary" style="font-size: 0.68rem;">${escapeHtml(sp.status || 'Terminé')}</span>
                    </div>
                    <div class="small text-muted fw-bold mb-2">${escapeHtml(sp.matchTitle)}</div>
                    
                    <div class="match-scores-box">
                        <div class="team-name">${escapeHtml(sp.team1)}</div>
                        <div class="match-score-badge">${escapeHtml(sp.score1 || '0')} - ${escapeHtml(sp.score2 || '0')}</div>
                        <div class="team-name">${escapeHtml(sp.team2)}</div>
                    </div>

                    <p class="text-secondary small mt-2 mb-0 flex-grow-1" style="font-size: 0.82rem; line-height: 1.4;">
                        ${escapeHtml(sp.description || '')}
                    </p>
                    <div class="text-end text-muted mt-2 pt-2 border-top" style="font-size: 0.72rem;">
                        <i class="bi bi-calendar-event me-1"></i>${formatDateFR(sp.date)}
                    </div>
                </div>
            </div>
        `;
    });

    scoresContainer.innerHTML = html;
}

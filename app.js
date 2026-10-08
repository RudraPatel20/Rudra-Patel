'use strict';
const projects = window.portfolioProjects;
const grid = document.querySelector('#projects');
const dialog = document.querySelector('#case-study');
let lastTrigger;
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function render(filter = 'All') {
    const visible = projects.filter(p => filter === 'All' || p.category === filter);
    grid.innerHTML = visible.map(p => `<article class="project-card"><div class="card-top"><span>${p.type}</span><span>${p.number}</span></div><h3>${escapeHTML(p.title)}</h3><p class="project-name">${escapeHTML(p.subtitle)}</p><p>${escapeHTML(p.summary)}</p><div class="tags">${p.tags.map(t => `<span>${escapeHTML(t)}</span>`).join('')}</div><button class="case-link" data-project="${p.id}">Explore case study <span aria-hidden="true">+</span></button></article>`).join('');
    document.querySelector('#project-status').textContent = `${visible.length} projects shown`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    render(button.dataset.filter);
}));
grid.addEventListener('click', e => {
    const trigger = e.target.closest('[data-project]'); if (!trigger) return;
    const p = projects.find(p => p.id === trigger.dataset.project); lastTrigger = trigger;
    document.querySelector('#case-body').innerHTML = `<div class="eyebrow">${p.type} / ${p.category}</div><h2 id="case-title">${escapeHTML(p.subtitle)}</h2><div class="flow" aria-label="Project architecture">${p.flow.map((f, i) => `<div><span>0${i + 1}</span>${escapeHTML(f)}</div>`).join('')}</div><h3>The problem</h3><p>${escapeHTML(p.challenge)}</p><h3>My contribution</h3><p>${escapeHTML(p.contribution)}</p><h3>Result & scope</h3><p>${escapeHTML(p.result)}</p><div class="tags">${p.tags.map(t => `<span>${escapeHTML(t)}</span>`).join('')}</div>${p.url ? `<a class="button primary" href="${p.url}" target="_blank" rel="noopener noreferrer">View source on GitHub</a>` : '<p class="scope-note">Professional project overview. Internal source code and research data are not published here.</p>'}`;
    dialog.showModal();
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => lastTrigger?.focus());
document.querySelector('#copy-email').addEventListener('click', async () => { const status = document.querySelector('#copy-status'); try { await navigator.clipboard.writeText('rudrapatel20@gmail.com'); status.textContent = 'Email copied'; } catch { status.textContent = 'Please copy the email address above.'; } });
document.querySelector('#year').textContent = new Date().getFullYear();
render();

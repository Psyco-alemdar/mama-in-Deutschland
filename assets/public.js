'use strict';
try { localStorage.setItem('mama_lang', document.documentElement.lang); } catch (_) {}
const search = document.querySelector('#tool-search');
if (search) search.addEventListener('input', () => {
 const normalise = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
 const term = normalise(search.value.trim()); let count = 0;
 document.querySelectorAll('.tool').forEach(card => { card.hidden = !normalise(card.dataset.search).includes(term); if (!card.hidden) count++; });
 document.querySelector('#result-count').textContent = count;
 document.querySelector('#no-results').hidden = count !== 0;
});
const tabs = [...document.querySelectorAll('[data-tab]')];
function chooseTab(tab) {
 tabs.forEach(t => { const active = t === tab; t.setAttribute('aria-selected', active); t.tabIndex = active ? 0 : -1; document.getElementById('panel-' + t.dataset.tab).hidden = !active; });
}
tabs.forEach((tab, i) => { tab.tabIndex = i ? -1 : 0; tab.addEventListener('click', () => chooseTab(tab)); tab.addEventListener('keydown', e => { let next; if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();chooseTab(tabs[next]);tabs[next].focus();} }); });
const checks = [...document.querySelectorAll('.bag-check')];
function updateBag(){const count=checks.filter(c=>c.checked).length;document.getElementById('bag-count').textContent=`${count} / ${checks.length} préparés`;document.getElementById('bag-progress').value=count;}
checks.forEach(c=>c.addEventListener('change',updateBag));
document.getElementById('reset-bag')?.addEventListener('click',()=>{checks.forEach(c=>c.checked=false);updateBag();});
const amounts=[...document.querySelectorAll('.budget-value')];
amounts.forEach(input=>input.addEventListener('input',()=>{let sum=0;for(const field of amounts){if(!field.validity.valid){document.getElementById('budget-total').textContent='Vérifie les montants (0 à 100 000 €).';return;}sum+=Math.round(Number(field.value||0)*100);}document.getElementById('budget-total').textContent=new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(sum/100);}));
// Preserve old email-confirmation URLs that targeted the homepage.
if (/(?:^#|&)(access_token|error_description|type=recovery)/.test(location.hash)) location.replace('account.html'+location.search+location.hash);

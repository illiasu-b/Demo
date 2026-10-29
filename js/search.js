// search.js — live header search dropdown
function toggleSearchBox() {
  const box = document.getElementById('searchBox');
  box.classList.toggle('open');
  if (box.classList.contains('open')) document.getElementById('searchInput').focus();
  else document.getElementById('searchResults').classList.remove('open');
}

function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.classList.remove('open'); return; }
    const hits = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.section.toLowerCase().includes(q)
    ).slice(0, 6);
    const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
    results.innerHTML = hits.length
      ? hits.map(p => `
          <a href="product.html?id=${p.id}" class="search-result-item">
            <img src="${p.image}" alt="">
            <div><p>${p.name.replace(re, '<mark>$1</mark>')}</p><span>${formatPrice(p.price)}</span></div>
          </a>`).join('')
      : '<div class="search-no-results">No products found</div>';
    results.classList.add('open');
  });

  document.addEventListener('click', (e) => {
    const box = document.getElementById('searchBox');
    if (!box.contains(e.target)) { box.classList.remove('open'); results.classList.remove('open'); }
  });
});

// wishlist.js — wishlist state (localStorage)
function loadWishlist() {
  try { return JSON.parse(localStorage.getItem('stylenest_wishlist')) || []; } catch (e) { return []; }
}

function toggleWishlist(id) {
  id = Number(id);
  let list = loadWishlist();
  const adding = !list.includes(id);
  list = adding ? [...list, id] : list.filter(x => x !== id);
  try { localStorage.setItem('stylenest_wishlist', JSON.stringify(list)); } catch (e) {}
  updateWishlistButtons();
  const p = getProductById(id);
  if (p) showToast(adding ? `${p.name} saved to wishlist` : `${p.name} removed from wishlist`);
}

function updateWishlistButtons() {
  const list = loadWishlist();
  document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
    const on = list.includes(Number(btn.dataset.wishlistBtn));
    btn.classList.toggle('active', on);
    if (!btn.querySelector('span')) btn.textContent = on ? '♥' : '♡';
  });
  document.querySelectorAll('[data-wishlist-count]').forEach(el => {
    el.textContent = list.length;
    el.style.display = list.length ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateWishlistButtons);

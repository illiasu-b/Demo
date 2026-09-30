// cart.js — cart state (localStorage), drawer UI, WhatsApp checkout
const WHATSAPP_NUMBER = '233204018670';   // international format, no + or spaces
const FREE_SHIPPING_OVER = 75;
const SHIPPING_FEE = 10;

function loadCart() {
  try { return JSON.parse(localStorage.getItem('stylenest_cart')) || []; } catch (e) { return []; }
}
function saveCart(cart) {
  try { localStorage.setItem('stylenest_cart', JSON.stringify(cart)); } catch (e) {}
}

function showToast(msg) {
  let box = document.getElementById('toastContainer');
  if (!box) { box = document.createElement('div'); box.id = 'toastContainer'; document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  box.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2200);
}

function addToCart(id, size, color, qty) {
  const p = getProductById(id);
  if (!p) return;
  size = size !== undefined ? size : (p.sizes[0] || '');
  color = color !== undefined ? color : (p.colors[0] || '');
  qty = qty || 1;
  const cart = loadCart();
  const line = cart.find(i => i.id === p.id && i.size === size && i.color === color);
  if (line) line.qty += qty; else cart.push({ id: p.id, size, color, qty });
  saveCart(cart);
  renderCart();
  showToast(`${p.name} added to cart`);
}

function changeCartQty(index, delta) {
  const cart = loadCart();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty < 1) cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}
function removeFromCart(index) {
  const cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function toggleCartDrawer() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('drawerOverlay').classList.toggle('open');
}

function checkoutWhatsApp() {
  const cart = loadCart();
  if (!cart.length) return;
  let subtotal = 0;
  const lines = cart.map(i => {
    const p = getProductById(i.id);
    const total = p.price * i.qty;
    subtotal += total;
    const opts = [i.size && `Size: ${i.size}`, i.color].filter(Boolean).join(', ');
    return `• ${p.name}${opts ? ` (${opts})` : ''} x${i.qty} — ${formatPrice(total)}`;
  });
  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  const msg = `Hello, I want to order:\n\n${lines.join('\n')}\n\nSubtotal: ${formatPrice(subtotal)}\nShipping: ${shipping ? formatPrice(shipping) : 'Free'}\nTotal: ${formatPrice(subtotal + shipping)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function renderCart() {
  const cart = loadCart().filter(i => getProductById(i.id));
  const list = document.getElementById('cartItemsList');
  const empty = document.getElementById('cartEmptyState');
  const summary = document.getElementById('cartSummary');
  const count = cart.reduce((n, i) => n + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = count; el.style.display = count ? '' : 'none'; });
  if (!list) return;

  if (!cart.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    summary.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  summary.style.display = 'block';

  let subtotal = 0;
  list.innerHTML = cart.map((i, idx) => {
    const p = getProductById(i.id);
    subtotal += p.price * i.qty;
    const meta = [i.size && `Size: ${i.size}`, i.color].filter(Boolean).join(' · ');
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-item-info">
          <p class="cart-item-name">${p.name}</p>
          <p class="cart-item-meta">${meta}</p>
          <div class="cart-item-qty">
            <button onclick="changeCartQty(${idx}, -1)" aria-label="Decrease">−</button>
            <span>${i.qty}</span>
            <button onclick="changeCartQty(${idx}, 1)" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${formatPrice(p.price * i.qty)}</span>
          <button class="cart-item-remove" onclick="removeFromCart(${idx})" aria-label="Remove">✕</button>
        </div>
      </div>`;
  }).join('');

  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  summary.innerHTML = `
    <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
    <div class="cart-summary-row"><span>Shipping</span><span>${shipping ? formatPrice(shipping) : 'Free'}</span></div>
    <div class="cart-summary-row cart-summary-total"><span>Total</span><span>${formatPrice(subtotal + shipping)}</span></div>
    <button class="btn whatsapp-btn btn-block" onclick="checkoutWhatsApp()">💬 Checkout on WhatsApp</button>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  const ov = document.getElementById('drawerOverlay');
  if (ov) ov.addEventListener('click', toggleCartDrawer);
});

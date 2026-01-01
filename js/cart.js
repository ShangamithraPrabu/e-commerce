/* cart.js
   Basic cart and wishlist with localStorage persistence
*/
const CART_KEY = 'agri_cart_v1';
const WISH_KEY = 'agri_wish_v1';

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); renderCartIfNeeded(); }

function addToCart(productId){
  let cart = getCart();
  const found = cart.find(c=>c.id===productId);
  if(found) found.qty += 1;
  else cart.push({id:productId, qty:1});
  saveCart(cart);
  alert('Added to cart');
}

function removeFromCart(productId){
  let cart = getCart().filter(c=>c.id!==productId);
  saveCart(cart);
}

function changeQty(productId, qty){
  let cart = getCart();
  const item = cart.find(c=>c.id===productId);
  if(!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

// render cart page if present
function renderCartIfNeeded(){
  const container = document.getElementById('cartContainer');
  if(!container) return;
  const cart = getCart();
  container.innerHTML = '';
  if(cart.length===0){
    container.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cartSubtotal').innerText = '0';
    return;
  }
  let subtotal = 0;
  cart.forEach(item=>{
    const p = PRODUCTS.find(x=>x.id===item.id);
    if(!p) return;
    subtotal += p.price * item.qty;
    const row = document.createElement('div');
    row.className = 'card';
    row.style.display='flex';
    row.style.alignItems='center';
    row.style.gap='12px';
    row.innerHTML = `
      <img src="${p.img}" style="width:120px;height:80px;object-fit:cover;border-radius:8px" />
      <div style="flex:1">
        <h4>${p.title}</h4>
        <div>₹${p.price} x <input type="number" min="1" value="${item.qty}" style="width:70px" onchange="onQtyChange('${item.id}', this.value)"></div>
      </div>
      <div>
        <div class="price">₹${p.price * item.qty}</div>
        <button class="btn" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
    container.appendChild(row);
  });
  document.getElementById('cartSubtotal').innerText = subtotal;
}

function onQtyChange(id, val){
  changeQty(id, parseInt(val,10)||1);
}

/* wishlist */
function getWishlist(){
  try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
  catch(e){ return []; }
}
function saveWishlist(list){ localStorage.setItem(WISH_KEY, JSON.stringify(list)); updateWishCount(); renderWishlistIfNeeded(); }
function toggleWishlist(id){
  let list = getWishlist();
  if(list.includes(id)) list = list.filter(x=>x!==id);
  else list.push(id);
  saveWishlist(list);
  alert('Wishlist updated');
}

/* counts */
function updateCartCount(){
  const c = getCart().reduce((s,it)=>s+it.qty,0);
  document.querySelectorAll('#cartCount, #cartCount2, #cartCountDetails').forEach(el=>{ if(el) el.innerText = c; });
}
function updateWishCount(){
  const w = getWishlist().length;
  document.querySelectorAll('#wishCount, #wishCount2').forEach(el=>{ if(el) el.innerText = w; });
}
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartCount(); updateWishCount(); renderCartIfNeeded(); renderWishlistIfNeeded();
});

function renderWishlistIfNeeded(){
  const container = document.getElementById('wishlistGrid');
  if(!container) return;
  const list = getWishlist();
  const items = list.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  renderProducts('wishlistGrid', items);
}

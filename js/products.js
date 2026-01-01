/* products.js
   Contains sample product data and renders product lists and product details
*/
const PRODUCTS = [
  { id: "p001", title:"Men Cotton Shirt", price:799, rating:4.3, category:"men", img:"https://via.placeholder.com/400x400/ffd166/222?text=Shirt" },
  { id: "p002", title:"Women Kurti", price:899, rating:4.6, category:"women", img:"https://via.placeholder.com/400x400/f94144/fff?text=Kurti" },
  { id: "p003", title:"Classic Watch", price:1999, rating:4.2, category:"watches", img:"https://via.placeholder.com/400x400/90be6d/fff?text=Watch" },
  { id: "p004", title:"Sneakers", price:2599, rating:4.5, category:"shoes", img:"https://via.placeholder.com/400x400/577590/fff?text=Sneakers" },
  { id: "p005", title:"Saree - Floral", price:1499, rating:4.7, category:"women", img:"https://via.placeholder.com/400x400/ffb703/000?text=Saree" },
  { id: "p006", title:"Men Formal Shoes", price:1799, rating:4.1, category:"shoes", img:"https://via.placeholder.com/400x400/06d6a0/000?text=Formal+Shoes" },
  { id: "p007", title:"Leather Belt", price:499, rating:4.0, category:"accessories", img:"https://via.placeholder.com/400x400/ef476f/fff?text=Belt" },
  { id: "p008", title:"Handbag", price:1299, rating:4.4, category:"accessories", img:"https://via.placeholder.com/400x400/118ab2/fff?text=Handbag" },
  { id: "p009", title:"Ethnic Kurta", price:1199, rating:4.5, category:"men", img:"https://via.placeholder.com/400x400/073b4c/fff?text=Kurta" },
  { id: "p010", title:"Sport Sandals", price:699, rating:4.0, category:"shoes", img:"https://via.placeholder.com/400x400/ffd166/222?text=Sandals" },
  { id: "p011", title:"Bracelet", price:399, rating:3.9, category:"accessories", img:"https://via.placeholder.com/400x400/f94144/fff?text=Bracelet" },
  { id: "p012", title:"Denim Jeans", price:1299, rating:4.2, category:"men", img:"https://via.placeholder.com/400x400/90be6d/fff?text=Jeans" },
  { id: "p013", title:"Kids Tee", price:399, rating:4.1, category:"kids", img:"https://via.placeholder.com/400x400/577590/fff?text=Kids+Tee" },
  { id: "p014", title:"Sunglasses", price:599, rating:4.3, category:"accessories", img:"https://via.placeholder.com/400x400/ff6f00/fff?text=Sunglasses" },
  { id: "p015", title:"Formal Shirt Women", price:999, rating:4.4, category:"women", img:"https://via.placeholder.com/400x400/06d6a0/000?text=Shirt+Women" }
];

// Helper: get product by id
function findProduct(id){
  return PRODUCTS.find(p=>p.id===id);
}

// Render product cards into a container
function renderProducts(containerId, products){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <div>⭐ ${p.rating} • ${p.category}</div>
      <div class="price">₹${p.price}</div>
      <div class="actions">
        <button class="btn" onclick="addToCart('${p.id}')">Add to Cart</button>
        <button class="btn" onclick="toggleWishlist('${p.id}')">♡</button>
        <button class="btn" onclick="viewDetails('${p.id}')">View</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// For index: show a few trending items
document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts('trendingGrid', PRODUCTS.slice(0,8));
  // If on products page
  if(document.getElementById('productsGrid')){
    let urlParams = new URLSearchParams(location.search);
    let cat = urlParams.get('cat') || '';
    const grid = document.getElementById('productsGrid');
    renderProducts('productsGrid', cat ? PRODUCTS.filter(p=>p.category===cat) : PRODUCTS);
    // search filtering on products page
    const catFilter = document.getElementById('categoryFilter');
    const sortBy = document.getElementById('sortBy');
    catFilter?.addEventListener('change', ()=>{
      let val = catFilter.value;
      let filtered = val ? PRODUCTS.filter(p=>p.category===val) : PRODUCTS;
      renderProducts('productsGrid', filtered);
    });
    sortBy?.addEventListener('change', ()=>{
      let v = sortBy.value;
      let current = Array.from(grid.children).map(c=>c); // not used directly
      let arr = PRODUCTS.slice();
      if(v==='price-asc') arr.sort((a,b)=>a.price-b.price);
      if(v==='price-desc') arr.sort((a,b)=>b.price-a.price);
      renderProducts('productsGrid', arr);
    });
    // search on products page
    const s = document.getElementById('searchInputProducts');
    s && s.addEventListener('input', ()=> {
      const q = s.value.toLowerCase();
      renderProducts('productsGrid', PRODUCTS.filter(p=>p.title.toLowerCase().includes(q) || p.category.includes(q)));
    });
  }

  // product details page
  if(document.getElementById('productDetailsContainer')){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const prod = findProduct(id);
    const container = document.getElementById('productDetailsContainer');
    if(!prod){
      container.innerHTML = '<p>Product not found.</p>';
    } else {
      container.innerHTML = `
        <div class="product-detail">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div><img src="${prod.img}" style="width:100%;border-radius:12px" /></div>
            <div>
              <h1>${prod.title}</h1>
              <p>Category: ${prod.category}</p>
              <p class="price">₹${prod.price}</p>
              <p>Rating: ⭐ ${prod.rating}</p>
              <label>Size:
                <select id="sizeSelect"><option>S</option><option>M</option><option>L</option><option>XL</option></select>
              </label>
              <div style="margin-top:12px">
                <button class="btn" onclick="addToCart('${prod.id}')">Add to Cart</button>
                <button class="btn" onclick="toggleWishlist('${prod.id}')">♡ Wishlist</button>
              </div>
              <div style="margin-top:18px">
                <h4>Product Description</h4>
                <p>This is a high quality ${prod.title}. Perfect for daily wear and special occasions.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Wishlist page
  if(document.getElementById('wishlistGrid')){
    const wishlist = getWishlist();
    const items = wishlist.map(id=>findProduct(id)).filter(Boolean);
    renderProducts('wishlistGrid', items);
  }
});

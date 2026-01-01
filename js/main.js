/* main.js
   Handles general UI behaviours: carousel, search on index, mobile menu, year footer
*/
(function(){
  // Year footer
  document.querySelectorAll('#year,#year2,#year3,#year4,#year5').forEach(el=>{ if(el) el.innerText = new Date().getFullYear(); });

  // Carousel auto-slide
  const carousel = document.getElementById('carousel');
  if(carousel){
    let idx=0;
    const slides = carousel.querySelectorAll('.slide');
    function show(i){
      slides.forEach((s,si)=> s.style.display = si===i ? 'block' : 'none');
    }
    show(0);
    setInterval(()=>{ idx = (idx+1) % slides.length; show(idx); }, 3500);
  }

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

setInterval(() => {
    const total = document.querySelectorAll(".slide").length;
    currentSlide = (currentSlide + 1) % total;
    showSlide(currentSlide);
}, 3500);


  // Global search on top nav
  const s = document.getElementById('searchInput');
  s && s.addEventListener('input', ()=> {
    const q = s.value.toLowerCase();
    // if on products page redirect with query
    if(location.pathname.includes('products.html')){
      // filter is handled in products.js when search input there used
    } else {
      // quick redirect to products page with simple query param
      window.location = 'pages/products.html';
    }
  });

  // mobile menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  mobileBtn && mobileBtn.addEventListener('click', ()=> {
    const nav = document.querySelector('.nav-list');
    if(nav.style.display==='flex') nav.style.display='none';
    else nav.style.display='flex';
  });

  // search on index to redirect to products page with query
  const searchInput = document.getElementById('searchInput');
  searchInput && searchInput.addEventListener('keydown', function(e){
    if(e.key==='Enter'){
      const q = e.target.value.trim();
      window.location = 'pages/products.html?q='+encodeURIComponent(q);
    }
  });

  // Header // Header scroll animation
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


}
)();

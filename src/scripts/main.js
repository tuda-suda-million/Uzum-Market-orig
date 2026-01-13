import { showLogin } from "./register.js";
import { showHome } from "./home.js";
import { initCatalog } from "./catalog.js"
import { toggleFavorite } from "./favorite.js";
import { renderFavoritePage } from "./favorite.js";

document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-btn');
    
    if (favBtn) {
        e.preventDefault();
        e.stopPropagation();

        const productId = favBtn.getAttribute('data-id');

        if (!productId) {
            console.error("Ошибка: у кнопки нет data-id!");
            return;
        }

        const isAdded = toggleFavorite(Number(productId));
        favBtn.classList.toggle('is-active', isAdded);

        const isFavoritePage = document.querySelector('.page-title-main'); 
    if (isFavoritePage && !isAdded) {
        const card = favBtn.closest('.product-card');
        card.style.opacity = '0';
        setTimeout(() => {
            card.remove();
            
            
            if (document.querySelectorAll('.product-card').length === 0) {
                renderFavoritePage(document.getElementById('app'));
            }
        }, 300);
    }
        
        return;
    }
});

document.addEventListener('click', (e) => {
    const favLink = e.target.closest('.header-favorites') || e.target.closest('#favorite-link');
    
    if (favLink) {
        e.preventDefault();
        const app = document.getElementById('app');
        history.pushState({ page: 'favorites' }, 'Избранное', '#favorites');
        renderFavoritePage(app);
    }
    window.onpopstate = function(event) {
    const app = document.getElementById('app');
    if (event.state && event.state.page === 'favorites') {
        renderFavoritePage(app);
    } else {
        showHome(app);
    }
};
})

const app = document.getElementById("app");
const token = localStorage.getItem("access-token");

async function startApp() {

  initCatalog();
    
  const token = localStorage.getItem("access-token");

if (token) {
      await showHome(app); 
    } else {
        showLogin(app); 
    }
    
}


startApp()
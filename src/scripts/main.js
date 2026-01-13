import { showLogin } from "./register.js";
import { showHome } from "./home.js";
import { initCatalog } from "./catalog.js"
import { toggleFavorite } from "./favorite.js";
import { renderFavoritePage } from "./favorite.js";
import { addToCart } from "./api.js";
import { updateCartCounter } from "./cart.js";
import { getAllProducts } from "./api.js";
import { renderProducts } from "./home.js";


export function initSearch() {
    const searchInput = document.querySelector('#search-input');

    if (searchInput) {
        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase().trim();
            const data = await getAllProducts();
            const allProducts = data.goods || [];
            const filtered = allProducts.filter(product => 
                product.title.toLowerCase().includes(query)
            );
            const container = document.querySelector('.products-grid'); 
            
            if (filtered.length > 0) {
                renderProducts(filtered, container); 
            } else if (query.length > 0) {
                container.innerHTML = `<h2 class="no-results">По запросу "${query}" ничего не найдено</h2>`;
            } else {
                renderProducts(allProducts, container);
            }
        });
    }
}

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

document.addEventListener('click', async (e) => {
    const cartBtn = e.target.closest('.add-to-cart-small');

    if (cartBtn) {
        e.stopImmediatePropagation();
        const id = cartBtn.getAttribute('data-id');
        if (!id) return;

        addToCart(id);

        if (typeof updateCartCounter === 'function') {
            updateCartCounter();
        }

        const originalBg = window.getComputedStyle(cartBtn).backgroundColor;

        const originalContent = cartBtn.innerHTML;
        cartBtn.innerHTML = "✓";
        cartBtn.style.background = "#7000ff"
        cartBtn.style.pointerEvents = "none"; 
        cartBtn.style.color = "white"

        setTimeout(() => {
            cartBtn.innerHTML = originalContent;    
            cartBtn.style.backgroundColor = originalBg; 
            cartBtn.style.color = "";              
            cartBtn.style.pointerEvents = "auto";
        }, 700);
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

import { renderCartPage } from "./cart.js";

document.addEventListener('click', (e) => {
    const cartLink = e.target.closest('.header-cart') || e.target.closest('#cart-link');
    if (cartLink) {
        e.preventDefault();
        renderCartPage(document.getElementById('app'));
    }
});

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
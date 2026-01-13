import { showLogin } from "./register.js";
import { showHome } from "./home.js";
import { initCatalog } from "./catalog.js"
import { toggleFavorite } from "./favorite.js";
import { renderFavoritePage } from "./favorite.js";
import { addToCart } from "./api.js";
import { updateCartCounter } from "./cart.js";

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
        const id = cartBtn.getAttribute('data-id');
        const originalBg = cartBtn.style.backgroundColor;
        e.preventDefault();
        const productId = cartBtn.getAttribute('data-id');

        try {
            await addToCart(productId);
            
            let localCart = JSON.parse(localStorage.getItem("cart") || "[]");
            const item = localCart.find(i => i.id === Number(productId));
            if (item) item.quantity++; else localCart.push({id: Number(productId), quantity: 1});
            localStorage.setItem("cart", JSON.stringify(localCart));

            const originalContent = cartBtn.innerHTML;

            addToCart(id);
            updateCartCounter();

            cartBtn.innerHTML = "✓";
            cartBtn.style.background = "#20b41c";
            setTimeout(() => {
            cartBtn.innerHTML = originalContent;    
            cartBtn.style.backgroundColor = originalBg; 
            cartBtn.style.color = "";              
            cartBtn.style.pointerEvents = "auto";
            }, 1000);

        } catch (err) {
            console.error("Ошибка при добавлении:", err);
        }
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
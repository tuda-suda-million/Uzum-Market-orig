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
        
        return;
    }
});

document.addEventListener('click', (e) => {
    const favLink = e.target.closest('.header-favorites') || e.target.closest('#favorite-link');
    
    if (favLink) {
        e.preventDefault();
        const app = document.getElementById('app');
        renderFavoritePage(app);
    }
})

const app = document.getElementById("app");
const token = localStorage.getItem("access-token");

async function startApp() {
    initCatalog(); 
    await showHome(app); 
}


startApp()
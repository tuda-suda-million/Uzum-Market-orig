import { showLogin } from "./register.js";
import { showHome } from "./home.js";
import { initCatalog } from "./catalog.js"
import { toggleFavorite } from "./favorite.js";

document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-btn');
    const productCard = e.target.closest('.product-card');

    
    if (favBtn) {
        e.preventDefault();
        e.stopPropagation();

        const productId = Number(favBtn.getAttribute('data-id'));
        const isAdded = toggleFavorite(productId);
        
        
        favBtn.classList.toggle('is-active', isAdded);
        return; 
    }

    
    if (productCard) {
        const id = productCard.getAttribute('data-id');
    }
});

const app = document.getElementById("app");
const token = localStorage.getItem("access-token");

async function startApp() {
    initCatalog(); 
    await showHome(app); 
}


startApp()
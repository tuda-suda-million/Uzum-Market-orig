import { showLogin } from "./register.js";
import { showHome } from "./home.js";
import { initCatalog } from "./catalog.js"
import { toggleFavorite } from "./favorite.js";

document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.favorite-btn');
    const productCard = e.target.closest('.product-card');

    // 1. Если нажали на СЕРДЕЧКО
    if (favBtn) {
        e.preventDefault();
        e.stopPropagation(); // Остановка всплытия события к карточке

        const productId = Number(favBtn.getAttribute('data-id'));
        const isAdded = toggleFavorite(productId);
        
        // Сразу меняем класс в DOM
        favBtn.classList.toggle('is-active', isAdded);
        return; // Прерываем функцию, чтобы не сработал код ниже
    }

    // 2. Если нажали на КАРТОЧКУ (но не на сердечко)
    if (productCard) {
        const id = productCard.getAttribute('data-id');
        // Здесь ваш код перехода, например:
        // window.location.hash = `/product/${id}`;
    }
});

const app = document.getElementById("app");
const token = localStorage.getItem("access-token");

async function startApp() {
    initCatalog(); 
    await showHome(app); 
}


startApp()
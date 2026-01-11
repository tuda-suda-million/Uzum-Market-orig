import "../styles/favorite.css"
import { showProduct } from "./product.js";
import { getAllProducts } from "./api.js";


export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.includes(Number(id));
}

export function toggleFavorite(id) {
    let favorites = getFavorites();
    const index = favorites.indexOf(Number(id));
    let isAdded = false;

    if (index === -1) {
        favorites.push(Number(id));
        isAdded = true;
    } else {
        favorites.splice(index, 1);
        isAdded = false;
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    return isAdded;
}

// --- ОТРИСОВКА СТРАНИЦЫ (ПО МАКЕТУ) ---

export async function renderFavoritePage(app) {
    window.scrollTo(0, 0);

    app.innerHTML = `
        <div class="container favorites-page">
            <div id="favorites-content">
                <p class="loading">Загрузка...</p>
            </div>
        </div>
    `;

    const content = document.getElementById('favorites-content');

    try {
        const favoriteIds = getFavorites(); // Используем функцию, которая объявлена выше
        const response = await getAllProducts();
        const products = response.goods || [];

        const favoriteProducts = products.filter(item => 
            favoriteIds.includes(Number(item.id))
        );

        if (favoriteProducts.length === 0) {
            content.innerHTML = `
                <div class="empty-favorites-container">
                    <img src="https://uzum.uz/static/img/hearts.cf41445.png" alt="Hearts" class="empty-img">
                    <h2 class="empty-title">Добавьте то, что понравилось</h2>
                    <p class="empty-text">Перейдите на главную страницу и нажмите на ♡ в товаре</p>
                    <button class="go-home-btn" id="to-home">На главную</button>
                </div>
            `;
            document.getElementById('to-home').onclick = () => location.reload();
            return;
        }

        content.innerHTML = `
            <h1 class="page-title-main">Избранное</h1>
            <div class="products-grid">
                ${favoriteProducts.map(item => `
                    <div class="product-card" data-id="${item.id}">
                        <div class="card-top">
                            <img src="${item.media[0]}" alt="${item.title}">
                            <button class="favorite-btn is-active" data-id="${item.id}">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                                    fill="#7000ff" stroke="#7000ff" stroke-width="1.5"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="card-body">
                            <p class="product-title">${item.title}</p>
                            <div class="price-section">
                                <div class="price-info">
                                    <span class="old-price">${Math.round(item.price * 1.3).toLocaleString()} сум</span>
                                    <span class="new-price">${item.price.toLocaleString()} сум</span>
                                </div>
                                <button class="cart-btn-small">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    `).join('')}
            </div>
        `;
    } catch (err) {
        console.error(err);
        content.innerHTML = `<p>Ошибка загрузки избранного</p>`;
    }
}
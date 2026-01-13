import "../styles/home.css";
import { showProduct } from "./product.js";
import "../styles/header.css";
import { isFavorite } from "./favorite.js";
import { renderHeader } from "../components/Header.js";
import "../styles/favorite.css"
import { getAllProducts, addToCart } from "./api.js";
import { renderPromoSwiper } from "../components/swiper.js";
import "../styles/swiper.css"
import { renderFooter } from "../components/Footer.js";

function createProductCard(item) {
    const mainImage = item.media && item.media[0] ? item.media[0] : "";
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
        <div class="card-top">
            <img src="${mainImage}" alt="${item.title}" loading="lazy">
            <button class="favorite-btn" data-id="${item.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </div>
        <div class="card-body">
            <p class="product-title">${item.title}</p>
            <p class="product-rating">⭐ ${item.rating || 0}</p>
            <div class="card-bottom">
                <div class="price-box">
                    <span class="new-price">${item.price.toLocaleString()} сум</span>
                </div>
                <button class="add-to-cart-small" data-id="${item.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="8" cy="21" r="1.5"></circle>
                        <circle cx="19" cy="21" r="1.5"></circle>
                        <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h9.5a2 2 0 0 0 2-1.6l1.8-9.4h-16"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;

    card.addEventListener('click', (e) => {
        if (!e.target.closest('.favorite-btn') && !e.target.closest('.add-to-cart-small')) {
            showProduct(document.getElementById('app'), item);
        }
    });

    return card;
}


export function renderProducts(productsList) {
    const container = document.getElementById("sections-container");
    if (!container) return;

    container.innerHTML = `
        <div class="search-results-section">
            <h2 class="category-title">Результаты поиска</h2>
            <div class="products-grid"></div>
        </div>
    `;
    
    const grid = container.querySelector(".products-grid");
    productsList.forEach(item => {
        grid.appendChild(createProductCard(item));
    });
}


export async function showHome(app, scrollToCategory = null) {
app.innerHTML = `
        <br>
        ${renderHeader()}
        <div class="home-wrapper">
            <div id="swiper-container-main"></div> 
            <div id="sections-container">
                <p class="loading">Загрузка товаров...</p>
            </div>
        </div>
        ${renderFooter()}
    `;
    
    const container = document.getElementById("sections-container");

    try {
        const response = await getAllProducts();
        const products = response.goods || [];

        const discountItems = products.filter(item => item.salePercentage > 0);
        renderPromoSwiper(discountItems);

        if (products.length === 0) {
            container.innerHTML = "<p>Товары не найдены</p>";
            return;
        }
        container.innerHTML = ""; 

        const types = {
            "furniture": "Мебель для геймеров",
            "PC": "Компьютеры и комплектующие",
            "audio": "Аудио и аксессуары",
            "TV": "Телевизоры",
            "kitchen": "Кухонные аксессуары"
        };

        Object.keys(types).forEach(typeKey => {
            const filteredProducts = products.filter(p => p.type === typeKey);
            
            if (filteredProducts.length > 0) {
                const section = document.createElement("section");
                section.className = "home-section";
                section.id = `section-${typeKey}`;
                section.innerHTML = `
                    <h2 class="category-title">${types[typeKey]}</h2>
                    <div class="products-grid"></div>
                `;
                
                container.appendChild(section);
                const grid = section.querySelector(".products-grid");

                filteredProducts.forEach(item => {
                    grid.appendChild(createProductCard(item));
                });
            }
        });

    } catch (err) {
        console.error("Ошибка:", err);
        const errorContainer = document.getElementById("sections-container");
        if (errorContainer) {
            errorContainer.innerHTML = `<p class="error">Ошибка загрузки: ${err.message}</p>`;
        }
    }
}
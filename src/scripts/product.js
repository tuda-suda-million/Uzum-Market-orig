import { renderHeader } from "../components/Header.js";
import "../styles/product.css";
import { addToCart, addToFavorites } from "./api.js";
import { updateCartCounter } from "./cart.js";

export function showProduct(app, product) {
    const productUrl = `?id=${product.id}`;
    if (window.location.search !== productUrl) {
        window.history.pushState({ productId: product.id }, '', productUrl);
    }

    window.scrollTo(0, 0);

    app.innerHTML = `
        ${renderHeader()}
        <div class="product-container">
            <div class="product-card-view">
                <div class="product-media-section">
                    <div class="thumbnails-vertical">
                        ${product.media.map((url, index) => `
                            <div class="thumb-frame ${index === 0 ? 'active' : ''}" data-url="${url}">
                                <img src="${url}" alt="preview">
                            </div>
                        `).join('')}
                    </div>
                    <div class="main-image-frame">
                        <img src="${product.media[0]}" id="zoom-image" alt="${product.title}">
                    </div>
                </div>

                <div class="product-details-section">
                    <h1 class="p-title">${product.title}</h1>
                    
                    <div class="p-price-container">
                        <div class="p-price-row">
                            <span class="p-current-price">${product.price.toLocaleString()} сум</span>
                            <span class="p-old-price">${Math.round(product.price * 1.3).toLocaleString()} сум</span>
                        </div>

                        <div class="p-quantity-wrapper">
                            <div class="q-selector">
                                <button class="q-minus" id="decrement">−</button>
                                <span class="q-count" id="counter">1</span>
                                <button class="q-plus" id="increment">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="p-divider">

                    <div class="p-description-short">
                        <p>${product.description || 'Высококачественный товар для вашего дома.'}</p>
                    </div>

                    <div class="p-actions">
                        <button class="add-to-cart-full" id="add-main">Добавить в корзину</button>
                        <button class="add-to-fav-full">Добавить в избранное</button>
                    </div>
                </div>
            </div>

            <div class="product-full-description">
                <h2 class="section-h2">Описание товара</h2>
                <br>
                <p>${product.description}</p>
            </div>
        </div>
    `;

    const counterText = document.getElementById('counter');
    const btnPlus = document.getElementById('increment');
    const btnMinus = document.getElementById('decrement');
    const mainImg = document.getElementById('zoom-image');
    const addBtn = document.getElementById('add-main');

    if (btnPlus && counterText) {
        btnPlus.addEventListener('click', () => {
            let current = parseInt(counterText.innerText);
            if (current < 7) {
                counterText.innerText = current + 1;
            } else {
                alert("Максимальное количество для заказа: 7 шт.");
            }
        });
    }

    if (btnMinus && counterText) {
        btnMinus.addEventListener('click', () => {
            let current = parseInt(counterText.innerText);
            if (current > 1) {
                counterText.innerText = current - 1;
            }
        });
    }

    if (addBtn && counterText) {
        addBtn.addEventListener('click', () => {
            const countToAdd = parseInt(counterText.innerText);
            
            addToCart(product.id, countToAdd);
            
            updateCartCounter();

            const originalText = addBtn.textContent;
            addBtn.textContent = "Товар добавлен!";
            addBtn.style.background = "#20b41c";
            addBtn.style.pointerEvents = "none";
            
            setTimeout(() => {
                addBtn.textContent = originalText;
                addBtn.style.background = ""; 
                addBtn.style.pointerEvents = "auto";
            }, 1500);
        });
    }

    const favBtn = app.querySelector('.add-to-fav-full');

if (favBtn) {
    favBtn.addEventListener('click', () => {

        addToFavorites(product.id);

        favBtn.style.color = "#ff4500"; 
        favBtn.textContent = "В избранном";
        

    });
}

    document.querySelectorAll('.thumb-frame').forEach(frame => {
        frame.addEventListener('click', () => {
            document.querySelectorAll('.thumb-frame').forEach(f => f.classList.remove('active'));
            frame.classList.add('active');
            mainImg.src = frame.dataset.url;
        });
    });

    const goHome = document.getElementById('go-home');
    if (goHome) {
        goHome.addEventListener('click', () => {
            window.history.pushState({}, '', '/');
            location.reload(); 
        });
    }
}
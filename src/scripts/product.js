import { renderHeader } from "../components/Header.js";
import "../styles/product.css"


export function showProduct(app, product) {
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
                    
                    <div class="p-price-block">
                        <span class="p-current-price">${product.price.toLocaleString()} сум</span>
                        <span class="p-old-price">${(product.price * 1.2).toLocaleString()} сум</span>
                    </div>

                    <div class="p-quantity">
                        <span class="q-label">Количество:</span>
                        <div class="q-controls">
                            <button class="q-btn">-</button>
                            <span class="q-num">1</span>
                            <button class="q-btn">+</button>
                        </div>
                    </div>

                    <div class="p-description-short">
                        <p>${product.description || 'Высококачественный товар для вашего дома.'}</p>
                    </div>

                    <div class="p-actions">
                        <button class="add-to-cart-full">Добавить в корзину</button>
                        <button class="add-to-fav-full">Добавить в избранное</button>
                    </div>
                </div>
            </div>

            <div class="product-full-description">
                <h2 class="section-h2">Описание товара</h2>
                <p>${product.description}</p>
            </div>
        </div>
    `;

    
    const mainImg = document.getElementById('zoom-image');
    document.querySelectorAll('.thumb-frame').forEach(frame => {
        frame.addEventListener('click', () => {
            document.querySelectorAll('.thumb-frame').forEach(f => f.classList.remove('active'));
            frame.classList.add('active');
            mainImg.src = frame.dataset.url;
        });
    });
}

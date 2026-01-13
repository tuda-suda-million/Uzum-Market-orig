import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import "../styles/swiper.css";
import { showProduct } from "../scripts/product.js";

export function renderPromoSwiper(saleProducts) {
    const container = document.getElementById("swiper-container-main");

    if (!container || !saleProducts.length) {
        if (container) container.style.display = 'none'; 
        return;
    }

    container.style.display = 'block';
    container.innerHTML = `
        <div class="swiper main-slider">
            <div class="swiper-wrapper">
                ${saleProducts.map(product => `
                    <div class="swiper-slide promo-slide">
                        <div class="promo-content">
                            <div class="promo-info">
                                <span class="promo-badge">Акция</span>
                                <h2 class="promo-title">${product.title}</h2>
                                <div class="promo-price-block">
                                    <span class="promo-new-price">${product.price.toLocaleString()} сум</span>
                                    <span class="promo-old-price">${Math.round(product.price * 1.3).toLocaleString()} сум</span>
                                </div>
                                <button class="promo-btn" data-id="${product.id}">Успеть купить</button>
                            </div>
                            <div class="promo-image">
                                <img src="${product.media[0]}" alt="${product.title}">
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    `;

    container.onclick = (e) => {
        const btn = e.target.closest('.promo-btn');
        if (btn) {
            const productId = btn.getAttribute('data-id');
            const targetProduct = saleProducts.find(p => p.id == productId);
            
            if (targetProduct) {
                console.log("Переход к товару:", targetProduct.title);
                showProduct(document.getElementById('app'), targetProduct);
                window.location.hash = `#product?id=${productId}`;
            }
        }
    };

    new Swiper('.main-slider', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
}
import { renderHeader } from "../components/Header.js";


export function showProduct(app, product) {
    window.scrollTo(0, 0);

    app.innerHTML = `
        ${renderHeader()}
        <main class="product-page">
            <div class="container">
                <div class="product-main">
                    <div class="product-gallery">
                        <div class="main-img-container">
                            <img src="${product.media[0]}" alt="${product.title}" id="main-image">
                        </div>
                        <div class="thumbnails">
                            ${product.media.map(url => `<img src="${url}" class="thumb-img">`).join('')}
                        </div>
                    </div>
                    
                    <div class="product-info">
                        <div class="product-rating">⭐ ${product.rating} (более 500 заказов)</div>
                        <h1 class="product-title-large">${product.title}</h1>
                        
                        <div class="price-section">
                            <span class="price-current">${product.price.toLocaleString()} сум</span>
                            ${product.salePercentage > 0 ? `<span class="price-old">${Math.round(product.price * 1.3).toLocaleString()} сум</span>` : ''}
                        </div>
 
            <div class="product-description">
                            <h3>Описание товара</h3>
                            <p>${product.description || "Описание скоро появится..."}</p>
                        </div>

                        <div class="actions">
                            <button class="btn-primary add-to-cart-big">Добавить в корзину</button>
                            <button class="btn-secondary add-to-fav">В избранное</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>                        
    `;

    const mainImg = document.getElementById('main-product-image');
    const thumbs = document.querySelectorAll('.thumb-item');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          mainImg.src = thumb.dataset.url;
        });
    });
}

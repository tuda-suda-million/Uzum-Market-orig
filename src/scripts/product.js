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
          <div class="product-meta">
            <span class="rating-stars">⭐ ${product.rating}</span>
            <span class="orders-count">Более 500 заказов</span>
        </div>
    
        <h1 class="product-title-large">${product.title}</h1>
    
         <div class="price-section">
            <p class="price-label">Цена:</p>
            <div class="price-row">
            <span class="price-current">${product.price.toLocaleString()} сум</span>
            ${product.salePercentage > 0 ? `<span class="price-old">${Math.round(product.price * 1.3).toLocaleString()} сум</span>` : ''}
         </div>
    </div>

    <div class="actions-group">
        <button class="btn-primary">Добавить в корзину</button>
        <button class="btn-favorite-big">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
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

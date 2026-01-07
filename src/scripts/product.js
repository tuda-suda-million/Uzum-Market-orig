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
    `
}
import { renderHeader } from "../components/Header.js";
import { getAllProducts } from "./api.js";
import "../styles/cart.css";

export function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.header-cart-count'); 
    if (badge) {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
}

export async function renderCartPage(app) {
    app.innerHTML = "";

    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const data = await getAllProducts();
    const products = data.goods || [];

    const cartProducts = localCart.map(item => {
        const product = products.find(p => p.id === item.id);
        return { ...product, quantity: item.quantity };
    }).filter(p => p.title);

    const totalPrice = cartProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

    app.innerHTML = `
        ${renderHeader()}
        <div class="cart-container">
            <h1 class="cart-title">Корзина товаров</h1>
            <div class="cart-layout">
                <div class="cart-white-box">
                    ${cartProducts.map(item => `
                        <div class="cart-item-row" data-id="${item.id}">
                            <div class="cart-item-left">
                                <img src="${item.media[0]}" class="cart-img">
                            </div>
                            <div class="cart-item-info">
                                <h3 class="cart-item-title">${item.title}</h3>
                                <p class="cart-item-price">${item.price.toLocaleString()} сум</p>
                                
                                <div class="cart-controls-group">
                                    <div class="quantity-picker">
                                        <button class="qty-btn minus">-</button>
                                        <span class="qty-num">${item.quantity}</span>
                                        <button class="qty-btn plus" ${item.quantity >= 7 ? 'disabled' : ''}>+</button>
                                    </div>
                                    <button class="cart-remove-button">Удалить</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-total-panel">
                    <div class="total-amount">${totalPrice.toLocaleString()} сум</div>
                    <button class="checkout-btn">Оформить</button>
                </div>
            </div>
        </div>
    `;

    setupEventListeners(app);
}

function setupEventListeners(app) {
    app.onclick = (e) => {
        const btn = e.target;
        const row = btn.closest('.cart-item-row');
        if (!row) return;

        const id = Number(row.dataset.id);
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const item = cart.find(i => i.id === id);

        if (btn.classList.contains('plus')) {
            if (item.quantity < 7) item.quantity++;
        } else if (btn.classList.contains('minus')) {
            if (item.quantity > 1) item.quantity--;
        } else if (btn.classList.contains('cart-remove-button')) {
            cart = cart.filter(i => i.id !== id);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartPage(app);
        updateCartCounter();
    };
}
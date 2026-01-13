import { renderHeader } from "../components/Header.js";
import { getAllProducts } from "./api.js";
import "../styles/cart.css";

export function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function updateCart(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === Number(id));
    
    if (item) {
        item.count += delta;
        if (item.count <= 0) {
            cart = cart.filter(i => i.id !== Number(id));
        }
    } else if (delta > 0) {
        cart.push({ id: Number(id), count: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

export function removeFromCart(id) {
    let cart = getCart().filter(i => i.id !== Number(id));
    localStorage.setItem("cart", JSON.stringify(cart));
}

export async function renderCartPage(app) {
    window.scrollTo(0, 0);
    const cartData = getCart();
    
    
    if (cartData.length === 0) {
        app.innerHTML = `
            ${renderHeader()}
            <div class="container empty-cart">
                <img src="https://uzum.uz/static/img/shop-icons/shopping-cart-empty.png" alt="Empty Cart" class="empty-img">
                <h2>В корзине пока нет товаров</h2>
                <p>Начните с подборок на главной странице или найдите нужный товар через поиск</p>
                <button class="go-home-btn" onclick="location.reload()">На главную</button>
            </div>
        `;
        return;
    }

    try {
        const response = await getAllProducts();
        const allProducts = response.goods || [];
        
        const cartProducts = cartData.map(cartItem => {
            const product = allProducts.find(p => p.id === cartItem.id);
            return { ...product, count: cartItem.count };
        }).filter(p => p.title);

        const totalItems = cartProducts.reduce((sum, p) => sum + p.count, 0);
        const totalPrice = cartProducts.reduce((sum, p) => sum + (p.price * p.count), 0);
        const oldTotalPrice = Math.round(totalPrice * 1.3);

        app.innerHTML = `
            ${renderHeader()}
            <div class="container cart-page">
                <h1 class="page-title">Корзина товаров</h1>
                <div class="cart-layout">
                    <div class="cart-items-list">
                        ${cartProducts.map(item => `
                            <div class="cart-item" data-id="${item.id}">
                                <img src="${item.media[0]}" alt="${item.title}" class="cart-item-img">
                                <div class="cart-item-info">
                                    <p class="cart-item-title">${item.title}</p>
                                    <p class="cart-item-price-single">${item.price.toLocaleString()} сум / шт.</p>
                                    <div class="cart-controls">
                                        <div class="counter">
                                            <button class="count-btn minus" data-id="${item.id}">-</button>
                                            <span class="count-value">${item.count}</span>
                                            <button class="count-btn plus" data-id="${item.id}">+</button>
                                        </div>
                                        <button class="delete-btn" data-id="${item.id}">Удалить</button>
                                    </div>
                                </div>
                                <div class="cart-item-total-price">
                                    ${(item.price * item.count).toLocaleString()} сум
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="cart-summary">
                        <p class="summary-total-price">${totalPrice.toLocaleString()} сум</p>
                        <div class="summary-details">
                            <span>Итого товаров: ${totalItems}</span>
                            <span>Итого скидки: ${(oldTotalPrice - totalPrice).toLocaleString()} сум</span>
                        </div>
                        <button class="order-btn">Оформить</button>
                    </div>
                </div>
            </div>
        `;

        setupCartListeners(app);
    } catch (err) {
        console.error(err);
    }
}

function setupCartListeners(app) {
    app.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains('plus')) {
            updateCart(id, 1);
            renderCartPage(app);
        } else if (e.target.classList.contains('minus')) {
            updateCart(id, -1);
            renderCartPage(app);
        } else if (e.target.classList.contains('delete-btn')) {
            removeFromCart(id);
            renderCartPage(app);
        }
    });
}
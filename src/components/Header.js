import "../scripts/catalog.js"
import "../styles/favorite.css"
export function renderHeader() {
  const userName = localStorage.getItem("username");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return `
      <header class="uzum-header">
      <div class="header-main-row">


      <div class="header-logo" id="go-home">
      <img src="./icons/uzum-logo.png" alt="Uzum Market" class="logo-full-img">
       </div>

<button class="catalog-btn" id="catalog-trigger">
    <span>Каталог</span>
</button>
        <div class="search-bar">
          <input type="text" placeholder="Искать товары" id="search-input">
          <button class="search-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4d4e59" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>

        <div class="header-nav">
          <div class="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>${userName}</span>
          </div>
          <div class="header-favorites" id="favorite-link">
             <span>Избранное</span>
           </div>
          <div class="nav-item">
           <div class="cart-wrapper"></div>
            <span class="header-cart">Корзина</span>
            <span class="header-cart-count" style="display: ${totalCount > 0 ? 'flex' : 'none'}">
            ${totalCount}
            </span>
          </div>
        </div>
      </div>
    </header>
        `;


}

        document.addEventListener('click', (e) => {
    
    if (e.target.closest('.header-logo')) {
        location.reload(); 
    }
});
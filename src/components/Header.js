export function renderHeader() {
  const userName = localStorage.getItem("username");

  return `
    <header class="uzum-header">
     <div class="header-main-row">
      <div class="header-logo" id="go-home">
      <img src="./icons/uzum-logo.png" alt="Uzum Market" class="logo-full-img">
</div>

   <button class="catalog-btn">
     <div class="catalog-icon">
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
      <span></span><span></span><span></span>
        </div>
         <span>Каталог</span>
    </button>


    <div class="search-bar">
         <input type="text" placeholder="Искать товары" id="search-input">
        <button class="search-icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
    </div>


    <div class="nav-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <span>Избранное</span>
    </div>


    <div class="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span>Корзина</span>
            <span class="cart-count">3</span>
          </div>
        </div>
      </div>
    </header>
        `;

}
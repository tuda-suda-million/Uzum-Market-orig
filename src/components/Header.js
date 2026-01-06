export function renderHeader() {
  const userName = localStorage.getItem("username");

  return `
    <header class="uzum-header">
     <div class="header-main-row">
      <div class="header-logo" id="go-home">
      <img src="./public/icons/uzum-logo.png" alt="Uzum" class="logo-icon">
</div>

   <button class="catalog-btn">
     <div class="catalog-icon">
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
        `

}
import "../styles/home.css";
import "../styles/header.css";
import { renderHeader } from "../components/Header.js";
import { getAllProducts, addToCart } from "./api.js";

export async function showHome(app) {

app.innerHTML = `
   ${renderHeader()}
     <div class="home-wrapper">
        <div id="sections-container">
         </div>
     </div>
`

const container = document.getElementById("sections-container");

try {
  const response = await getAllProducts();
  const products = response.goods ||  [];


  const categories = ["Популярное", "Спортивная одежда", "Активный отдых"];

  categories.forEach(catTitle => {
    const section = document.createElement("section");
    section.className = "home-section";


    section.innerHTML = `
     <h2 class="category-title">${catTitle}</h2>
     <div class="products-grid"></div>    
    `;

    container.appendChild(section);

    const grid = section.querySelector(".product-grid");


    products.slice(0, 5).forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card"
      card.innerHTML = `
         <div class="card-top">
          <img src="${item.image}" alt="${item.name}">
          <button class="favorite-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b2b5bb" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          </div>
          <div class="card-body">
          <p class="product-title">${item.name}</p>
          <p class="product-rating">⭐ 5.0 (200 отзывов)</p>
          <div class="card-bottom">
           <div class="price-box">
            <span class="old-price">${Math.round(item.price * 1.2)} сум</span>
            <span class="new-price">${item.price} сум</span>
          </div>
          <button class="add-to-cart-small">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </button>
        </div>
      </div>     
      `;
      grid.appendChild(card);
    });

    container.appendChild(section)
  });
 } catch(err) {
     console.log(err);
     
 }
}

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

    const grid = section.querySelector(".product-grid");
  })
}
  
}    
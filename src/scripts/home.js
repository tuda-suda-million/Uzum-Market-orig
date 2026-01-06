import "../styles/home.css";
import { renderHeader } from "../components/Header.js";
import { getAllProducts, addToCart } from "./api.js";

export async function showHome(app) {

const userName = localStorage.getItem("username") || "Пользователь";


app.innerHTML = `
   ${renderHeader()}
   <div class="container">
      <header class="home-header">
        <div class="header-content">
          <h1 class="logo">Uzum Market</h1>
          <div class="user-controls">
            <span>Привет, <b>${userName}</b></span>
            <button id="logoutBtn" class="logout-btn">Выйти</button>
          </div>
        </div>
      </header>
`
  
}    
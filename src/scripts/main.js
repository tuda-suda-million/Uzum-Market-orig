import { showLogin } from "./register.js";
import { showHome } from "./home.js";
import { initCatalog } from "./catalog.js"

const app = document.getElementById("app");
const token = localStorage.getItem("access-token");

async function startApp() {
    initCatalog(); 
    await showHome(app); 
}


startApp()
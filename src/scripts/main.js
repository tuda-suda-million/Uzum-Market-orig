import { showLogin } from "./register.js";
import { showHome } from "./home.js";

const app = document.getElementById("app");
const token = localStorage.getItem("access-token");

if (token) {
  showHome(app);
} else {
   showLogin(app);
}
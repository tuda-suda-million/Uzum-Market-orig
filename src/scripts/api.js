
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


export async function getAllProducts() {
  try {
    const res = await fetch("/backend/db.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
}


export async function loginUser(phone, password) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
}


export async function addToCart(productId) {
  try {
    const token = localStorage.getItem("access-token");
    
    const res = await fetch(`${BASE_URL}/api/v1/user/cart/${productId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
    });
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка при добавлении в корзину:", error);
    throw error;
  }
}



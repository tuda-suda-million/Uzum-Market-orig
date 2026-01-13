const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

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


export async function getAllProducts() {
  try {
    const res = await fetch("/backend/db.json");
    return await res.json();
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
}

export function addToCart(productId, count = 1) {
    const id = Number(productId);
    const quantityToAdd = Number(count);
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        const newTotal = cart[index].quantity + quantityToAdd;
        
        if (newTotal <= 7) {
            cart[index].quantity = newTotal;
        } else {
            cart[index].quantity = 7;
            alert("Максимальное количество в корзине — 7 шт.");
        }
    } else {
        cart.push({ 
            id: id, 
            quantity: quantityToAdd > 7 ? 7 : quantityToAdd 
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToFavorites(productId) {
    const id = Number(productId);
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isExist = favorites.includes(id);

    if (!isExist) {
        favorites.push(id);
        alert("Товар добавлен в избранное!");
    } else {
        favorites = favorites.filter(favId => favId !== id);
        alert("Товар удален из избранного");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}
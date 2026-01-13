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

export function addToCart(productId) {
  const id = Number(productId);
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    if (existingItem.quantity >= 7) {
            alert("Нельзя заказать более 7 единиц одного товара");
            return { success: false, message: "limit_reached" };
        }
        existingItem.quantity += 1;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return { success: true };
}




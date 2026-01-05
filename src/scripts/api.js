const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


export async function loginUser(phone, password) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password })
  });
  const data = await response.json();
  return data;
}



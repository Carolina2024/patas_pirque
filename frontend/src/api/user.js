
const API_URL = "https://patas-pirque.onrender.com/auth";


export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al registrar usuario");
  }

  return res.json(); 
};


export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return res.json(); 
};


export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al obtener usuarios");
  }

  return res.json();
};

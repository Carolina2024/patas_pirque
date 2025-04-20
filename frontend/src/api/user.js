// Endpoints del backend
const BASE_URL = "https://patas-pirque.onrender.com"; 
const AUTH_URL = `${BASE_URL}/auth`; 


export const registerUser = async (data) => {
  const res = await fetch(`${AUTH_URL}/register`, {
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
  const res = await fetch(`${AUTH_URL}/login`, {
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
  const token = localStorage.getItem("token"); 

  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al obtener usuarios");
  }

  return res.json(); 
};

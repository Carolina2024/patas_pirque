// Endpoints del backend
const BASE_URL = "https://patas-pirque.onrender.com"; // Enlace al backend
const AUTH_URL = `${BASE_URL}/auth`; // Módulo de autenticación

// Realiza la petición al backend para registrar un nuevo usuario
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

  return res.json(); // Retorna el usuario creado o el mensaje presente en backend
};

// Realiza la petición al backend para iniciar sesión
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

  return res.json(); // Retorna token y datos del usuario
};

// Obtiene la lista de usuarios
export const fetchUsers = async () => {
  const token = localStorage.getItem("token"); // Recupera el token del login

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

  return res.json(); // Retorna lista de usuarios
};

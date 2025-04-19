const BASE_URL = "https://patas-pirque.onrender.com"; // Enlace al backend

// Obtiene la lista de mascotas
export const fetchPets = async () => {
  const token = localStorage.getItem("token"); // Recupera el token del login

  const res = await fetch(`${BASE_URL}/pets`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al obtener mascotas");
  }

  return res.json(); // Retorna lista de usuarios
};

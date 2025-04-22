const BASE_URL = "https://patas-pirque.onrender.com";

export const fetchPets = async ({ page = 1, limit = 4, filters = {} }) => {
  const token = localStorage.getItem("token");

  const queryParams = new URLSearchParams({
    page,
    limit,
    ...Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== undefined && value !== '')
    )
  }).toString();

  // Opcional para debug
  console.log("Query params:", queryParams);

  const res = await fetch(`${BASE_URL}/pets?${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al obtener mascotas");
  }

  return res.json();
};

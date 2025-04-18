const API_URL = 'https://jsonplaceholder.typicode.com/users'; // solo ejemplo

export const fetchUsers = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Error al obtener los usuarios');
  }

  return res.json();
};

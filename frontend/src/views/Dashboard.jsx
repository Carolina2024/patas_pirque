import { useEffect, useState } from "react";
import CreatePet from "../componentes/CreatePet";
import PetList from "../componentes/PetList";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showCreatePet, setShowCreatePet] = useState(false);
  const [pets, setPets] = useState([]);

  const deletePet = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://patas-pirque.onrender.com/pets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // que prevPets sea un array antes de aplicar .filter o da error
        setPets((prevPets) =>
          Array.isArray(prevPets) ? prevPets.filter((pet) => pet.id !== id) : []
        );
        alert("Mascota eliminada exitosamente");
      } else {
        throw new Error("Error al eliminar la mascota");
      }
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const userId = decodedPayload?.sub;

        const res = await fetch(
          `https://patas-pirque.onrender.com/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener el usuario");

        const user = await res.json();
        setUserName(user.name);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://patas-pirque.onrender.com/pets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setPets(data);
      }
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
    }
  };

  const handleCreatePet = async (newPet) => {
    setShowCreatePet(false);
    if (newPet && Array.isArray(pets)) {
      setPets((prevPets) => [...prevPets, newPet]);

      try {
        const res = await fetch("https://patas-pirque.onrender.com/pets");
        if (!res.ok) {
          throw new Error("Error al obtener las mascotas");
        }
        const updatedPets = await res.json();

        setPets(updatedPets);
      } catch (error) {
        console.error("Error al recargar las mascotas:", error);
      }
    } else {
      console.warn("No se pudo agregar la nueva mascota:", newPet);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-primary text-white p-4">
        <h2 className="text-2xl mb-4">Panel</h2>

        <button
          className="mb-2 block w-full bg-white text-primary py-2 px-4 rounded cursor-pointer"
          onClick={() => setShowCreatePet(true)}
        >
          Crear Mascota
        </button>
      </div>

      <div>
        <h1 className="text-xl font-bold text-2xl text-primary cursor-pointer text-center mt-8">
          Bienvenido, {userName}!
        </h1>
        {showCreatePet ? (
          <CreatePet
            onCreate={handleCreatePet}
            onCancel={() => setShowCreatePet(false)}
          />
        ) : (
          <PetList pets={pets} setPets={setPets} deletePet={deletePet} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

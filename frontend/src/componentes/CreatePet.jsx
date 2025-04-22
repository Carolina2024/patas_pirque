import { useState } from "react";

const CreatePet = ({ onCancel, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    age: "",
    species: "",
    size: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://patas-pirque.onrender.com/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear la mascota");
      }

      const newPet = await res.json();
      setFormData({ name: "", race: "", age: "", species: "", size: "" });
      alert("Mascota registrada exitosamente");
      onCreate(newPet);
    } catch (error) {
      console.error("Error al crear mascota:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col w-full max-w-md mx-auto"
      >
        <input
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="race"
          placeholder="Raza"
          value={formData.race}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecciona edad</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Adulto">Adulto</option>
          <option value="Anciano">Anciano</option>
        </select>
        <select
          name="species"
          value={formData.species}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecciona especie</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>

        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Selecciona tamaño</option>
          <option value="Pequeño">Pequeño</option>
          <option value="Mediano">Mediano</option>
          <option value="Grande">Grande</option>
        </select>

        <div>
          <div className="flex space-x-4 w-full">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded cursor-pointer w-1/2"
            >
              Guardar Mascota
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded cursor-pointer w-1/2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePet;

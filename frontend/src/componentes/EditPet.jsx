import { useState } from "react";

const EditPet = ({ pet, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: pet.name || "",
    race: pet.race || "",
    age: pet.age || "",
    species: pet.species || "",
    size: pet.size || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://patas-pirque.onrender.com/pets/${pet.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar la mascota");

      const updatedPet = await res.json();
      onSave(updatedPet);
    } catch (error) {
      console.error("Error al editar mascota:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-6 gap-2 p-2 border-b"
    >
      <div>{pet.id}</div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border p-1"
      />
      <input
        type="text"
        name="race"
        value={formData.race}
        onChange={handleChange}
        className="border p-1"
      />
      <select
        name="age"
        value={formData.age}
        onChange={handleChange}
        className="border p-1"
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
        className="border p-1"
      >
        <option value="">Seleccionar</option>
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
      </select>

      <select
        name="size"
        value={formData.size}
        onChange={handleChange}
        className="border p-1"
      >
        <option value="">Selecciona tamaño</option>
        <option value="Pequeño">Pequeño</option>
        <option value="Mediano">Mediano</option>
        <option value="Grande">Grande</option>
      </select>

      <div className="col-span-6 flex justify-end gap-2 mt-1">
        <button
          type="submit"
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-2 py-1 bg-gray-300 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditPet;

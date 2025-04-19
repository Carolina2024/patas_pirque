import { usePets } from "../hook/usePets";

const PetList = () => {
  const { data, isLoading, error } = usePets();

  if (isLoading) return <p>Cargando mascotas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-10">
    <div className="grid grid-cols-4 gap-4 bg-secondary text-primary font-bold p-2 rounded-t">
      <div>Nombre</div>
      <div>Raza</div>
      <div>Edad</div>
      <div>Especie</div>
    </div>
    {data.map((pet) => (
      <div
        key={pet.id}
        className="grid grid-cols-4 gap-4 border-b border-gray-300 p-2 text-lg text-tertiary"
      >
        <div>{pet.name}</div>
        <div>{pet.race}</div>
        <div>{pet.age}</div>
        <div>{pet.species}</div>
      </div>
    ))}
  </div>
  );
};

export default PetList;

import { usePets } from "../hook/usePets";
import { useState } from "react";

const PetList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePets(page);

  if (isLoading) return <p>Cargando mascotas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const hanlePageClick = (newPage) => {
    setPage(newPage);
  };

  const fakeData = {
    ...data,
    totalPages: 2,
  };

  return (
    <div className="mx-10 mt-10">
      {data.items.length === 0 ? (
        <p className="text-center text-xl font-semibold text-tertiary">
          No hay más mascotas para mostrar.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 bg-primary text-secundary font-bold p-2 rounded-t">
            <div>Nombre</div>
            <div>Raza</div>
            <div>Edad</div>
            <div>Especie</div>
          </div>

          {data.items.map((pet) => (
            <div
              key={pet.id}
              className="grid grid-cols-4 gap-4 border-b border-tertiary p-2 text-lg text-black"
            >
              <div>{pet.name}</div>
              <div>{pet.race}</div>
              <div>{pet.age}</div>
              <div>{pet.species}</div>
            </div>
          ))}
        </>
      )}

      <div className="mt-4 text-center text-tertiary font-semibold">
        Página {data.page} de {data.totalPages}
      </div>

      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: fakeData.totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => hanlePageClick(index + 1)}
            className={`px-3 py-1 rounded border border-primary cursor-pointer ${
              page === index + 1
                ? "bg-primary text-white"
                : "text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PetList;

import { useState, useEffect } from "react";
import { usePets } from "../hook/usePets";

const PetList = () => {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    name: '',
    species: '',
    race: '',
    age: ''
  });

  const [inputFilters, setInputFilters] = useState(filters);

  // Debounce de filtros
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(inputFilters);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputFilters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { data, isLoading, isFetching, error } = usePets({ page, filters });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const preventEnterSubmit = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const clearFilters = () => {
    setInputFilters({
      name: '',
      species: '',
      race: '',
      age: ''
    });
  };

  if (!data && isLoading) return <p>Cargando mascotas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-10 mt-10">
      {/* Filtros */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={inputFilters.name}
              onChange={handleInputChange}
              onKeyDown={preventEnterSubmit}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Especie</label>
            <select
              name="species"
              value={inputFilters.species}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Todas</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Raza</label>
            <input
              type="text"
              name="race"
              value={inputFilters.race}
              onChange={handleInputChange}
              onKeyDown={preventEnterSubmit}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      {data.items.length === 0 ? (
        <p className="text-center text-xl font-semibold text-tertiary">
          No hay mascotas con estos filtros
        </p>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-4 bg-primary text-secundary font-bold p-2 rounded-t">
            <div>ID</div>
            <div>Nombre</div>
            <div>Raza</div>
            <div>Edad</div>
            <div>Especie</div>
          </div>

          {data.items.map((pet) => (
            <div
              key={pet.id}
              className="grid grid-cols-5 gap-4 border-b border-tertiary p-2 text-lg text-black"
            >
              <div>{pet.id}</div>
              <div>{pet.name}</div>
              <div>{pet.race}</div>
              <div>{pet.age}</div>
              <div>{pet.species}</div>
            </div>
          ))}
        </>
      )}

      {/* Actualizacion */}
      {isFetching && !isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 italic mt-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span>Actualizando resultados...</span>
        </div>
      )}

      {/* Paginación */}
      <div className="mt-4 text-center text-tertiary font-semibold">
        Página {data.page} de {data.totalPages}
      </div>

      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: data.totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-1 rounded border border-primary cursor-pointer ${
                page === pageNumber
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PetList;

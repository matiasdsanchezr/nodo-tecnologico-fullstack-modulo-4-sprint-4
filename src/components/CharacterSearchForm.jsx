import React, { useState } from "react";
import { useCharactersContext } from "../context/characters";

export const CharacterSearchForm = () => {
  const { loading, filterCharacters, filters } = useCharactersContext();
  const [name, setName] = useState(filters.name ?? "");
  const [status, setStatus] = useState(filters.status ?? "");
  const [species, setSpecies] = useState(filters.species ?? "");
  const [type, setType] = useState(filters.type ?? "");
  const [gender, setGender] = useState(filters.gender ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      name: name || undefined,
      status: status || undefined,
      species: species || undefined,
      type: type || undefined,
      gender: gender || undefined,
    };
    filterCharacters(filters);
  };

  const handleClearFilters = () => {
    setName("");
    setStatus("");
    setSpecies("");
    setType("");
    setGender("");
    filterCharacters({});
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-bold text-center mb-4 text-white">
        Filtrar personajes
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm text-gray-300 block">
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ej: Rick, Morty..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="species" className="text-sm text-gray-300 block">
              Especie:
            </label>
            <input
              id="species"
              type="text"
              placeholder="Ej: Human, Alien..."
              value={species}
              onChange={(e) => {
                setSpecies(e.target.value);
              }}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="status" className="text-sm text-gray-300 block">
              Estado:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="gender" className="text-sm text-gray-300 block">
              Género:
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Todos</option>
              <option value="female">Femenino</option>
              <option value="male">Masculino</option>
              <option value="genderless">Sin género</option>
              <option value="unknown">Desconocido</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label htmlFor="type" className="text-sm text-gray-300 block">
              Tipo:
            </label>
            <input
              id="type"
              type="text"
              placeholder="Ej: Parasite, Robot..."
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>

          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={loading}
          >
            Limpiar filtros
          </button>
        </div>
      </form>
    </div>
  );
};

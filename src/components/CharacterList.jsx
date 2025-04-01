import { useCharactersContext } from "../context/characters";
import { CharacterCard } from "./CharacterCard";

export const CharacterList = ({ characters }) => {
  const { currentPage, paginationInfo, goToPrevPage, goToNextPage } =
    useCharactersContext();

  return (
    <section className="grid">
      <div className="grid gap-3 text-center bg-gray-800 shadow-md border border-gray-700 m-auto p-3 rounded">
        <h2 className="text-xl font-bold">Personajes encontrados</h2>
        <div>
          <p className="text-sm text-gray-300">
            Cantidad de personajes encontrados: {paginationInfo.count}
          </p>
          <p className="text-sm text-gray-300">
            Cantidad de paginas: {paginationInfo.pages}
          </p>
          <p className="text-sm text-gray-300">Página actual: {currentPage}</p>
        </div>
      </div>
      <h2 className="text-xl text-center font-bold p-3">Lista de personajes</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <div className="flex gap-3 p-3 mx-auto" id="pagination">
        <button
          type="button"
          onClick={goToPrevPage}
          className="button"
          disabled={!paginationInfo.prev}
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={goToNextPage}
          className="button"
          disabled={!paginationInfo.next}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

import { useCharactersContext } from "../context/characters";

const FavoriteModalItem = ({ character }) => {
  const { removeFavorite } = useCharactersContext();

  return (
    // Card Component
    <div className="flex flex-col items-center bg-primary dark:bg-dark-primary rounded-lg shadow-md overflow-hidden p-4 space-x-4 sm:flex-row">
      {/* Image */}
      <img
        src={character.image}
        alt={`portada de ${character.name}`}
        className="w-20 h-28 object-cover rounded-md bg-white"
      />
      {/* Product Info */}
      <div className="flex-1 flex flex-col gap-1 items-center sm:items-start">
        <h3 className="dark:text-text-primary text-lg font-bold">{character.name}</h3>
      </div>
      {/* Remove Button */}
      <button
        type="button"
        className="bg-state-error hover:bg-red-600 active:bg-red-700 text-text-primary py-2 px-4 rounded-md font-semibold transition-colors duration-300"
        onClick={() => {
          removeFavorite(character.id);
        }}
      >
        <i className="ph ph-trash"></i> Eliminar
      </button>
    </div>
  );
};

export const FavoritesModal = ({ isModalOpen, onCloseModal }) => {
  const { favorites } = useCharactersContext();

  const handleClickOutsideModal = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-shadow-medium bg-opacity-75 ${
        isModalOpen ? "flex" : "hidden"
      } justify-center items-center z-50`}
      onClick={handleClickOutsideModal}
    >
      <div className="bg-secondary dark:bg-dark-secondary rounded-lg p-6 relative w-full max-w-3xl  overflow-hidden">
        {/* <!-- Button close --> */}
        <button
          type="button"
          id="closeModal"
          className="absolute top-2 right-2 dark:text-text-secondary hover:text-text-primary text-2xl"
          onClick={onCloseModal}
        >
          &times;
        </button>

        {/* <!-- Content modal --> */}
        <h2 className="dark:text-text-primary text-lg font-bold text-center p-3">
          Personajes favoritos
        </h2>

        {favorites.length < 1 ? (
          <p className="dark:text-text-secondary text-center">
            No tienes ningún personaje favorito. Añade alguno.
          </p>
        ) : (
          <div className="dark:bg-dark-secondary/900 py-6 px-4 overflow-y-auto max-h-[65vh] space-y-4">
            {favorites.map((character) => (
              <FavoriteModalItem key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

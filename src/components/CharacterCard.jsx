import { useCharactersContext } from "../context/characters";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const CharacterCard = ({ character, onClick }) => {
  const { addFavorite, isFavorite } = useCharactersContext();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800 text-white max-w-80"
      onClick={() => {
        onClick?.(character);
      }}
    >
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-xl font-bold truncate">{character.name}</h3>
        </div>
      </div>

      <div className="p-4 grid gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${getStatusColor(character.status)}`}
          ></span>
          <span>
            {character.status} - {character.species}
          </span>
        </div>

        <div className="grid gap-1 mt-2">
          <div className="grid grid-cols-2 text-sm border-b border-gray-700 py-1">
            <span className="text-gray-400">Origen:</span>
            <span className="truncate">{character.origin.name}</span>
          </div>

          <div className="grid grid-cols-2 text-sm border-b border-gray-700 py-1">
            <span className="text-gray-400">Ubicación:</span>
            <span className="truncate">{character.location.name}</span>
          </div>

          <div className="grid grid-cols-2 text-sm border-b border-gray-700 py-1">
            <span className="text-gray-400">Género:</span>
            <span>{character.gender}</span>
          </div>

          <div className="grid grid-cols-2 text-sm border-b border-gray-700 py-1">
            <span className="text-gray-400">Episodios:</span>
            <span>{character.episode.length}</span>
          </div>

          {character.type && (
            <div className="grid grid-cols-2 text-sm border-b border-gray-700 py-1">
              <span className="text-gray-400">Tipo:</span>
              <span className="truncate">{character.type}</span>
            </div>
          )}

          <div className="grid grid-cols-2 text-sm py-1">
            <span className="text-gray-400">Creado:</span>
            <span className="text-xs">{formatDate(character.created)}</span>
          </div>
        </div>

        <div>
          {isFavorite(character.id) ? (
            <button type="button" className="button" disabled>
              Registrado en favoritos
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => {
                addFavorite(character);
              }}
            >
              Agregar a favoritos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

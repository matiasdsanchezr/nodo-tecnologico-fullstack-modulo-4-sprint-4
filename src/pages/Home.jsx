import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CharacterList } from "../components/CharacterList";
import { CharacterSearchForm } from "../components/CharacterSearchForm";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useCharactersContext } from "../context/characters";
import { FavoritesModal } from "../components/FavoritesModal";

export const Home = () => {
  const { loading, error, characters } = useCharactersContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowFavorites = () => {
    setIsModalOpen(() => true);
  };
  const handleCloseFavorites = () => {
    setIsModalOpen(() => false);
  };

  useEffect(() => {
    if (error) {
      let message;
      if (error.status === 404) {
        message = "No encontraron personajes";
      }
      toast.error(message ?? "Ha ocurrido un error al cargar los personajes", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleScrollUp = () => {
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div>
        <ToastContainer />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-pulse text-xl">Cargando personajes...</div>
        </div>
      </div>
    );
  }

  if (error && error.status !== 404) {
    return (
      <>
        <ToastContainer />
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 max-w-md mx-auto">
            <h3 className="font-bold">Error al cargar los datos</h3>
            <p>{error.message || "Ha ocurrido un error desconocido"}</p>
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Re-intentar
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Header onShowFavorites={handleShowFavorites} />
      <main className="flex-1 flex flex-col px-1 sm:px-3 text-black dark:text-white">
        <FavoritesModal isModalOpen={isModalOpen} onCloseModal={handleCloseFavorites} />

        <div className="mx-auto p-3" id="filters">
          <CharacterSearchForm />
        </div>

        {error && characters.length === 0 ? (
          <div className="w-full p-3 text-center">
            <h3 className="font-bold text-2xl">No se encontraron personajes</h3>
          </div>
        ) : (
          <>
            <div className="p-3" id="characters">
              <CharacterList characters={characters} />
            </div>
            <div className="m-auto p-3">
              <button type="button" onClick={handleScrollUp} className="button">
                Ir al inicio
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

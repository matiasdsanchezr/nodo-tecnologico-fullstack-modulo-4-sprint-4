import "./App.css";
import { CharactersProvider } from "./context/characters";

import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <CharactersProvider>
        <Home />
      </CharactersProvider>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnimeForm from "./components/AnimeForm";
import AnimeList from "./components/AnimeList";
import PersonajeForm from "./components/PersonajeForm";
import PersonajeList from "./components/PersonajeList";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  return (
    <Router>
      <div className="p-4">
        {/* Navbar integrado */}
        <nav className="flex items-center justify-between px-6 py-4 bg-primary dark:bg-gray-800 shadow-md">
          <h1 className="text-xl font-bold text-white">Anime Portal</h1>

          <div className="flex gap-4">
            <Link to="/" className="text-white hover:underline">Animes</Link>
            <Link to="/add-anime" className="text-white hover:underline">Agregar Anime</Link>
            <Link to="/personajes" className="text-white hover:underline">Personajes</Link>
            <Link to="/add-personaje" className="text-white hover:underline">Agregar Personaje</Link>
          </div>

          {/* Botón de cambio de tema */}
          <ThemeSwitch />
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<AnimeList />} />
          <Route path="/add-anime" element={<AnimeForm />} />
          <Route path="/personajes" element={<PersonajeList />} />
          <Route path="/add-personaje" element={<PersonajeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

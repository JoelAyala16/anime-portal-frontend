import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnimeForm from "./components/AnimeForm";
import AnimeList from "./components/AnimeList";
import EditAnimeForm from "./components/EditAnimeForm";
import PersonajeForm from "./components/PersonajeForm";
import PersonajeList from "./components/PersonajeList";
import EditPersonajeForm from "./components/EditPersonajeForm";
import ThemeSwitch from "./components/ThemeSwitch";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot"; // 👈 Importamos el chatbot

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 dark:bg-gray-800 shadow-md">
          <h1 className="text-lg sm:text-xl font-bold text-white">
            Anime Portal
          </h1>

          {/* Links */}
          <div className="flex gap-3 overflow-x-auto text-sm sm:text-base">
            <Link to="/" className="text-white hover:underline">
              Dashboard
            </Link>
            <Link to="/animes" className="text-white hover:underline">
              Animes
            </Link>
            <Link to="/add-anime" className="text-white hover:underline">
              Agregar Anime
            </Link>
            <Link to="/personajes" className="text-white hover:underline">
              Personajes
            </Link>
            <Link to="/add-personaje" className="text-white hover:underline">
              Agregar Personaje
            </Link>
            <Link to="/chatbot" className="text-white hover:underline">
              Chatbot
            </Link>
          </div>

          {/* Botón de cambio de tema */}
          <ThemeSwitch />
        </nav>

        {/* Contenido principal */}
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/animes" element={<AnimeList />} />
            <Route path="/add-anime" element={<AnimeForm />} />
            <Route path="/edit-anime/:id" element={<EditAnimeForm />} />
            <Route path="/personajes" element={<PersonajeList />} />
            <Route path="/add-personaje" element={<PersonajeForm />} />
            <Route path="/edit-personaje/:id" element={<EditPersonajeForm />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

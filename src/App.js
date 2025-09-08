import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeList from "./components/AnimeList";
import AnimeForm from "./components/AnimeForm";
import PersonajeList from "./components/PersonajeList";
import PersonajeForm from "./components/PersonajeForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<AnimeList />} />
            <Route path="/add-anime" element={<AnimeForm />} />
            <Route path="/personajes" element={<PersonajeList />} />
            <Route path="/add-personaje" element={<PersonajeForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

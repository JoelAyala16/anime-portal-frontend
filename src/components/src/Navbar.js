import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-primary dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-white">Anime Portal</h1>

      <div className="flex gap-4">
        <Link to="/" className="text-white hover:underline">
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
      </div>

      {/* Botón de cambio de tema */}
      <ThemeSwitch />
    </nav>
  );
}

export default Navbar;

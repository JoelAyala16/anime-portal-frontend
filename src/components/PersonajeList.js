import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function PersonajeList() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    api
      .get("/personajes")
      .then((res) => setPersonajes(res.data))
      .catch((err) => console.error("Error cargando personajes:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este personaje?")) {
      try {
        await api.delete(`/personajes/${id}`);
        setPersonajes(personajes.filter((p) => p._id !== id));
        alert("✅ Personaje eliminado con éxito");
      } catch (err) {
        console.error("Error eliminando personaje:", err);
        alert("❌ No se pudo eliminar el personaje");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Lista de Personajes
      </h2>

      {personajes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No hay personajes aún.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {personajes.map((personaje) => (
            <li
              key={personaje._id}
              className="border rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {personaje.imagen && (
                <img
                  src={
                    personaje.imagen.startsWith("http")
                      ? personaje.imagen
                      : `https://anime-portal-backend.onrender.com${personaje.imagen}`
                  }
                  alt={personaje.nombre}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-4">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {personaje.nombre}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {personaje.descripcion}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Anime: {personaje.anime}
                </p>
                <div className="flex justify-end space-x-3">
                  <Link
                    to={`/edit-personaje/${personaje._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(personaje._id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PersonajeList;

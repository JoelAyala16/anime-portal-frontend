import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function PersonajesList() {
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
        alert("Personaje eliminado con éxito ✅");
      } catch (err) {
        console.error("Error eliminando personaje:", err);
        alert("No se pudo eliminar el personaje ❌");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Lista de Personajes
      </h2>

      {personajes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay personajes aún.</p>
      ) : (
        <ul className="space-y-3">
          {personajes.map((personaje) => (
            <li
              key={personaje._id}
              className="border p-3 rounded bg-white dark:bg-gray-800 shadow-md flex items-start justify-between"
            >
              <div className="max-w-xs">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {personaje.nombre}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {personaje.descripcion}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Anime: {personaje.anime}
                </p>
                {personaje.imagen && (
                  <img
                    src={
                      personaje.imagen.startsWith("http")
                        ? personaje.imagen
                        : `https://anime-portal-backend.onrender.com${personaje.imagen}`
                    }
                    alt={personaje.nombre}
                    className="w-32 mt-2 rounded"
                  />
                )}
              </div>

              <div className="space-x-2 flex-shrink-0">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PersonajesList;

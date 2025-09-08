import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    api
      .get("/animes")
      .then((res) => setAnimes(res.data))
      .catch((err) => console.error("Error cargando animes:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este anime?")) {
      try {
        await api.delete(`/animes/${id}`);
        setAnimes(animes.filter((a) => a._id !== id));
        alert("Anime eliminado con éxito ✅");
      } catch (err) {
        console.error("Error eliminando anime:", err);
        alert("No se pudo eliminar el anime ❌");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Lista de Animes
      </h2>

      {animes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay animes aún.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {animes.map((anime) => (
            <li
              key={anime._id}
              className="border rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {anime.imagen && (
                <img
                  src={
                    anime.imagen.startsWith("http")
                      ? anime.imagen
                      : `https://anime-portal-backend.onrender.com${anime.imagen}`
                  }
                  alt={anime.titulo}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-4">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {anime.titulo}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {anime.descripcion}
                </p>
                <div className="flex justify-end space-x-3">
                  <Link
                    to={`/edit-anime/${anime._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(anime._id)}
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

export default AnimeList;


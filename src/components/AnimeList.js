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
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Lista de Animes
      </h2>

      {animes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay animes aún.</p>
      ) : (
        <ul className="space-y-3">
          {animes.map((anime) => (
            <li
              key={anime._id}
              className="border p-3 rounded bg-white dark:bg-gray-800 shadow-md flex items-start justify-between"
            >
              <div className="max-w-xs">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {anime.titulo}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {anime.descripcion}
                </p>
                {anime.imagen && (
                  <img
                    src={
                      anime.imagen.startsWith("http")
                        ? anime.imagen
                        : `https://anime-portal-backend.onrender.com${anime.imagen}`
                    }
                    alt={anime.titulo}
                    className="w-32 mt-2 rounded"
                  />
                )}
              </div>

              <div className="space-x-2 flex-shrink-0">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AnimeList;


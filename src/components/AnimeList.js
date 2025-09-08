import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    api.get("/api/anime").then((res) => setAnimes(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este anime?")) {
      await api.delete(`/api/anime/${id}`);
      setAnimes(animes.filter((a) => a._id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Animes</h2>
      <ul className="space-y-3">
        {animes.map((anime) => (
          <li key={anime._id} className="border p-3 rounded bg-white dark:bg-gray-800 flex items-center justify-between">
            <div>
              <p className="font-semibold">{anime.titulo}</p>
              <p className="text-sm">{anime.descripcion}</p>
              {anime.imagen && (
                <img src={anime.imagen} alt={anime.titulo} className="w-24 mt-2 rounded" />
              )}
            </div>
            <div className="space-x-2">
              <Link to={`/edit-anime/${anime._id}`} className="text-blue-500 hover:underline">
                Editar
              </Link>
              <button onClick={() => handleDelete(anime._id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimeList;


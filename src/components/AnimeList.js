import React, { useEffect, useState } from "react";
import api from "../api";

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    api.get("/api/animes")
      .then((res) => setAnimes(res.data))
      .catch((err) => console.error("Error al obtener animes:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Animes</h2>
      <ul className="space-y-2">
        {animes.map((anime) => (
          <li key={anime._id} className="border p-2 rounded">
            <strong>{anime.titulo}</strong> - {anime.genero}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimeList;

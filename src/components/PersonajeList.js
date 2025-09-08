import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PersonajeList() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    axios.get("/api/personajes")
      .then(res => setPersonajes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Personajes</h2>
        <Link to="/personajes/nuevo" className="px-4 py-2 bg-blue-600 text-white rounded">Nuevo Personaje</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {personajes.map(p => (
          <div key={p._id} className="bg-white shadow rounded p-4">
            {p.imagen && (
              <img src={p.imagen} alt={p.nombre} className="w-full h-48 object-cover rounded" />
            )}
            <h3 className="text-xl font-semibold mt-2">{p.nombre}</h3>
            <p className="text-gray-600">{p.descripcion}</p>
            <p className="text-sm text-gray-500">Anime: {p.animeId?.nombre || "N/A"}</p>
            <Link to={"/personajes/editar/" + p._id} className="block mt-2 px-3 py-1 bg-green-600 text-white rounded text-center">Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonajeList;

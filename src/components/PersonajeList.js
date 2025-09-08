import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function PersonajeList() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    api.get("/api/personajes").then((res) => setPersonajes(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este personaje?")) {
      await api.delete(`/api/personajes/${id}`);
      setPersonajes(personajes.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Personajes</h2>
      <ul className="space-y-3">
        {personajes.map((personaje) => (
          <li key={personaje._id} className="border p-3 rounded bg-white dark:bg-gray-800 flex items-center justify-between">
            <div>
              <p className="font-semibold">{personaje.nombre}</p>
              <p className="text-sm">{personaje.descripcion}</p>
              {personaje.imagen && (
                <img src={personaje.imagen} alt={personaje.nombre} className="w-24 mt-2 rounded" />
              )}
            </div>
            <div className="space-x-2">
              <Link to={`/edit-personaje/${personaje._id}`} className="text-blue-500 hover:underline">
                Editar
              </Link>
              <button onClick={() => handleDelete(personaje._id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonajeList;

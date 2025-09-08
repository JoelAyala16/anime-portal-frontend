import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function PersonajeList() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/personajes")
      .then((res) => setPersonajes(res.data))
      .catch((err) => console.error("Error cargando personajes:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este personaje?")) {
      try {
        await api.delete(`/personajes/${id}`);
        setPersonajes((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Error eliminando personaje:", err);
        alert("❌ No se pudo eliminar el personaje.");
      }
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-600 dark:text-gray-300">⏳ Cargando personajes...</p>;
  }

  if (personajes.length === 0) {
    return <p className="p-4 text-gray-600 dark:text-gray-300">⚠️ No hay personajes registrados.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Personajes</h2>
      <ul className="space-y-3">
        {personajes.map((personaje) => (
          <li
            key={personaje._id}
            className="border p-3 rounded bg-white dark:bg-gray-800 flex items-center justify-between shadow-sm"
          >
            <div className="max-w-[70%]">
              <p className="font-semibold text-gray-900 dark:text-white">{personaje.nombre}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {personaje.descripcion}
              </p>
              {personaje.imagen && (
                <img
                  src={personaje.imagen}
                  alt={personaje.nombre}
                  className="w-24 h-24 mt-2 rounded object-cover border"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to={`/edit-personaje/${personaje._id}`}
                className="px-2 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(personaje._id)}
                className="px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              >
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

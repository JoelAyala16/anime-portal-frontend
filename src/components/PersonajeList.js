import React, { useEffect, useState } from "react";
import api from "../api";

function PersonajeList() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    api.get("/api/personajes")
      .then((res) => setPersonajes(res.data))
      .catch((err) => console.error("Error al obtener personajes:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Personajes</h2>
      <ul className="space-y-2">
        {personajes.map((p) => (
          <li key={p._id} className="border p-2 rounded">
            <strong>{p.nombre}</strong> - {p.anime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonajeList;

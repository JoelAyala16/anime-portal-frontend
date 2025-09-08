import React, { useState, useEffect } from "react";
import api from "../api";

function EditPersonajeForm({ personajeId, onClose }) {
  const [nombre, setNombre] = useState("");
  const [anime, setAnime] = useState("");

  useEffect(() => {
    api.get(`/api/personajes/${personajeId}`)
      .then((res) => {
        setNombre(res.data.nombre);
        setAnime(res.data.anime);
      })
      .catch((err) => console.error("Error al cargar personaje:", err));
  }, [personajeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/personajes/${personajeId}`, { nombre, anime });
      alert("✅ Personaje actualizado");
      onClose();
    } catch (err) {
      console.error("Error al actualizar personaje:", err);
      alert("❌ Error al actualizar personaje");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-3">
      <h2 className="text-lg font-bold">Editar Personaje</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={anime}
        onChange={(e) => setAnime(e.target.value)}
        placeholder="Anime"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
      >
        Cancelar
      </button>
    </form>
  );
}

export default EditPersonajeForm;

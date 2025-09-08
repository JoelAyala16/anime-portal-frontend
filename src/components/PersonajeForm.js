import React, { useState } from "react";
import api from "../api";





function PersonajeForm() {
  const [nombre, setNombre] = useState("");
  const [anime, setAnime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/personajes", { nombre, anime });
      alert("✅ Personaje agregado");
      setNombre("");
      setAnime("");
    } catch (err) {
      console.error("Error al agregar personaje:", err);
      alert("❌ Error al agregar personaje");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-3">
      <h2 className="text-lg font-bold">Agregar Personaje</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Anime"
        value={anime}
        onChange={(e) => setAnime(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
}

export default PersonajeForm;


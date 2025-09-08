import React, { useState } from "react";
import api from "../api";

function AnimeForm() {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/animes", { titulo, genero });
      alert("✅ Anime agregado");
      setTitulo("");
      setGenero("");
    } catch (err) {
      console.error("Error al agregar anime:", err);
      alert("❌ Error al agregar anime");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-3">
      <h2 className="text-lg font-bold">Agregar Anime</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
}

export default AnimeForm;

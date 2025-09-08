import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function PersonajeForm() {
  const [form, setForm] = useState({ nombre: "", descripcion: "", anime: "" });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.descripcion || !form.anime) {
      alert("⚠️ Completa todos los campos antes de guardar");
      return;
    }

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("descripcion", form.descripcion);
    data.append("anime", form.anime);
    if (imagen) data.append("imagen", imagen);

    try {
      setLoading(true);
      await api.post("/personajes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/personajes");
    } catch (err) {
      console.error("Error guardando personaje:", err);
      alert("❌ No se pudo guardar el personaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded bg-white dark:bg-gray-800"
    >
      <h2 className="text-xl font-bold mb-4">Agregar Personaje</h2>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full mb-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 
                   text-black dark:text-white placeholder-gray-400"
      />

      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full mb-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 
                   text-black dark:text-white placeholder-gray-400"
      />

      <input
        name="anime"
        value={form.anime}
        onChange={handleChange}
        placeholder="Anime"
        className="w-full mb-2 p-2 border rounded bg-gray-50 dark:bg-gray-700 
                   text-black dark:text-white placeholder-gray-400"
      />

      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
        className="mb-2"
      />

      <button
        type="submit"
        disabled={loading}
        className={`px-3 py-2 rounded text-white w-full ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

export default PersonajeForm;

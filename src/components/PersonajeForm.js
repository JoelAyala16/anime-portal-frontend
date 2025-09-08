import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function PersonajeForm() {
  const [form, setForm] = useState({ nombre: "", descripcion: "", anime: "" });
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("descripcion", form.descripcion);
    data.append("anime", form.anime);
    if (imagen) data.append("imagen", imagen);

    await api.post("/api/personajes", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/personajes");
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
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="anime"
        value={form.anime}
        onChange={handleChange}
        placeholder="Anime"
        className="w-full mb-2 p-2 border rounded"
      />
      <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
      <button
        type="submit"
        className="px-3 py-2 bg-green-600 text-white rounded mt-2"
      >
        Guardar
      </button>
    </form>
  );
}

export default PersonajeForm;

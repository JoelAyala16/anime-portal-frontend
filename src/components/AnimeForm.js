import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AnimeForm() {
  const [form, setForm] = useState({ titulo: "", descripcion: "", genero: "" });
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("titulo", form.titulo);
    data.append("descripcion", form.descripcion);
    data.append("genero", form.genero);
    if (imagen) data.append("imagen", imagen);

    try {
      await api.post("/animes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/animes");
    } catch (error) {
      console.error("Error al agregar anime:", error);
      alert("No se pudo agregar el anime");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded bg-white dark:bg-gray-800 shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Agregar Anime
      </h2>

      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
        className="w-full mb-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full mb-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      <input
        name="genero"
        value={form.genero}
        onChange={handleChange}
        placeholder="Género"
        className="w-full mb-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
        className="mb-2 text-gray-900 dark:text-gray-200"
      />

      <button
        type="submit"
        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded mt-2 w-full"
      >
        Guardar
      </button>
    </form>
  );
}

export default AnimeForm;

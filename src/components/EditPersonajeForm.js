import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function EditPersonajeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", descripcion: "", anime: "", imagen: "" });
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    api
      .get(`/personajes/${id}`) // ✅ corregido
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error cargando personaje:", err));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("descripcion", form.descripcion);
    data.append("anime", form.anime);
    if (imagen) data.append("imagen", imagen);

    try {
      await api.put(`/personajes/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Personaje actualizado con éxito");
      navigate("/personajes");
    } catch (err) {
      console.error("Error actualizando personaje:", err);
      alert("❌ No se pudo actualizar el personaje");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded bg-white dark:bg-gray-800 shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Editar Personaje
      </h2>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
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
        name="anime"
        value={form.anime}
        onChange={handleChange}
        placeholder="Anime"
        className="w-full mb-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 
                   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      {/* Imagen actual */}
      {form.imagen && (
        <div className="mb-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            Imagen actual:
          </p>
          <img
            src={
              form.imagen.startsWith("http")
                ? form.imagen
                : `https://anime-portal-backend.onrender.com/${form.imagen}`
            }
            alt={form.nombre}
            className="w-32 rounded"
          />
        </div>
      )}

      {/* Subir nueva imagen */}
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
        className="mb-2 text-gray-900 dark:text-gray-200"
      />

      <button
        type="submit"
        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mt-2 w-full"
      >
        Guardar cambios
      </button>
    </form>
  );
}

export default EditPersonajeForm;

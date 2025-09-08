import React, { useState } from "react";
import api from "../api.js";


function AnimeForm() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [genero, setGenero] = useState("");
  const [rating, setRating] = useState("");
  const [personajes, setPersonajes] = useState([""]);
  const [imagenes, setImagenes] = useState([]);

  // manejar cambio de personajes dinámicamente
  const handlePersonajeChange = (index, value) => {
    const nuevos = [...personajes];
    nuevos[index] = value;
    setPersonajes(nuevos);
  };

  const addPersonaje = () => setPersonajes([...personajes, ""]);
  const removePersonaje = (index) => {
    setPersonajes(personajes.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    setImagenes([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("genero", genero);
    formData.append("rating", rating);

    personajes.forEach((p, i) => {
      formData.append(`personajes[${i}]`, p);
    });

    imagenes.forEach((img) => {
      formData.append("imagenes", img);
    });

    try {
      await api.post("/api/animes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Anime agregado con éxito");
      setTitulo("");
      setDescripcion("");
      setGenero("");
      setRating("");
      setPersonajes([""]);
      setImagenes([]);
    } catch (err) {
      console.error("❌ Error al agregar anime:", err);
      alert("Error al guardar el anime");
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

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border p-2 w-full"
      />

      <div>
        <h3 className="font-semibold">Personajes</h3>
        {personajes.map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={p}
              placeholder={`Personaje #${i + 1}`}
              onChange={(e) => handlePersonajeChange(i, e.target.value)}
              className="border p-2 flex-1"
            />
            <button
              type="button"
              onClick={() => removePersonaje(i)}
              className="bg-red-500 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPersonaje}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          + Añadir personaje
        </button>
      </div>

      <div>
        <h3 className="font-semibold">Imágenes</h3>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
}

export default AnimeForm;

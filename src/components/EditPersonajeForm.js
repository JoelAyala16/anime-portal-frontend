import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPersonajeForm() {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [animeId, setAnimeId] = useState("");
  const [animes, setAnimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/animes")
      .then(res => setAnimes(res.data))
      .catch(err => console.error(err));

    axios.get("/api/personajes/" + id)
      .then(res => {
        setNombre(res.data.nombre);
        setDescripcion(res.data.descripcion);
        setAnimeId(res.data.animeId?._id || "");
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("animeId", animeId);
    if (imagen) formData.append("imagen", imagen);

    await axios.put("/api/personajes/" + id, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    navigate("/personajes");
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Editar Personaje</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border p-2 rounded" />
        <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full border p-2 rounded" />
        <select value={animeId} onChange={(e) => setAnimeId(e.target.value)} className="w-full border p-2 rounded">
          <option value="">Selecciona un anime</option>
          {animes.map(anime => (
            <option key={anime._id} value={anime._id}>{anime.nombre}</option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Actualizar</button>
      </form>
    </div>
  );
}

export default EditPersonajeForm;

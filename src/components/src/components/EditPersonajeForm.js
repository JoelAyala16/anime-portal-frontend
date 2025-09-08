import React, { useEffect, useState } from "react";

export default function EditPersonajeForm({ API, personaje, onSaved, onCancel }) {
  const [nombre, setNombre] = useState(personaje?.nombre || "");
  const [descripcion, setDescripcion] = useState(personaje?.descripcion || "");
  const [animeId, setAnimeId] = useState(personaje?.animeId?._id || personaje?.animeId || "");
  const [imagen, setImagen] = useState(null);
  const [animes, setAnimes] = useState([]);

  useEffect(()=>{
    setNombre(personaje?.nombre || "");
    setDescripcion(personaje?.descripcion || "");
    setAnimeId(personaje?.animeId?._id || personaje?.animeId || "");
  }, [personaje]);

  useEffect(() => {
    fetch(`${API}/api/animes`).then(r=>r.json()).then(setAnimes);
  }, [API]);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("nombre", nombre);
    fd.append("descripcion", descripcion);
    fd.append("animeId", animeId);
    if (imagen) fd.append("imagen", imagen);

    const res = await fetch(`${API}/api/personajes/${personaje._id}`, { method: "PUT", body: fd });
    const data = await res.json();
    if (res.ok) {
      onSaved && onSaved(data);
    } else {
      alert(data.error || "Error al actualizar personaje");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-3">Editar Personaje</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <input className="px-3 py-2 rounded border dark:border-gray-700 bg-transparent" placeholder="Nombre"
               value={nombre} onChange={e=>setNombre(e.target.value)} required />
        <select className="px-3 py-2 rounded border dark:border-gray-700 bg-transparent" value={animeId} onChange={e=>setAnimeId(e.target.value)} required>
          <option value="">Selecciona un anime</option>
          {animes.map(a => <option key={a._id} value={a._id}>{a.title}</option>)}
        </select>
        <textarea className="md:col-span-2 px-3 py-2 rounded border dark:border-gray-700 bg-transparent"
                  placeholder="Descripción" value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
        <input type="file" accept="image/*" onChange={e=>setImagen(e.target.files[0])}
               className="md:col-span-2" />
      </div>
      <div className="mt-3 flex gap-2">
        <button className="px-4 py-2 rounded bg-indigo-600 text-white">Guardar</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">Cancelar</button>
      </div>
    </form>
  );
}

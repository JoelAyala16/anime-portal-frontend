import React, { useEffect, useState } from "react";

export default function PersonajeForm({ API, onSaved }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [animeId, setAnimeId] = useState("");
  const [animes, setAnimes] = useState([]);

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

    const res = await fetch(`${API}/api/personajes`, { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) {
      onSaved && onSaved(data);
      setNombre(""); setDescripcion(""); setAnimeId(""); setImagen(null);
    } else {
      alert(data.error || "Error al crear personaje");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow" id="nuevo-personaje">
      <h2 className="text-xl font-semibold mb-3">Nuevo Personaje</h2>
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
      <div className="mt-3">
        <button className="px-4 py-2 rounded bg-indigo-600 text-white">Guardar</button>
      </div>
    </form>
  );
}

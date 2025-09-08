import React, { useEffect, useState } from "react";

export default function PersonajeList({ API, onEdit }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/personajes`).then(r=>r.json()).then(setItems).finally(()=>setLoading(false));
  }, [API]);

  if (loading) return <p>Cargando personajes...</p>;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Personajes</h2>
        <a href="#nuevo-personaje" className="px-3 py-2 rounded bg-indigo-600 text-white">Nuevo Personaje</a>
      </div>
      {items.length === 0 && <p className="text-gray-500">Aún no hay personajes.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(p => (
          <div key={p._id} className="rounded-xl shadow bg-white dark:bg-gray-800 overflow-hidden">
            {p.imagen && <img src={p.imagen} alt={p.nombre} className="w-full h-48 object-cover" />}
            <div className="p-4">
              <h3 className="text-lg font-bold">{p.nombre}</h3>
              <p className="text-sm text-gray-500">Anime: {p.animeId?.title || "—"}</p>
              {p.descripcion && <p className="mt-2 text-sm opacity-80 line-clamp-3">{p.descripcion}</p>}
              <button onClick={()=>onEdit(p)} className="mt-3 px-3 py-2 rounded bg-amber-500 text-white">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

export default function AnimeList({ API, items, onEdit, onDelete, onOpenGallery }) {
  return (
    <section className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((a, idx) => (
        <article key={a._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm">
          {a.images?.[0] && (
            <img
              src={`${API}${a.images[0]}`}
              alt={`Portada de ${a.title}`}
              className="w-full h-64 object-cover rounded-lg cursor-pointer"
              onClick={() => onOpenGallery(idx)}
            />
          )}
          <h3 className="mt-2 font-semibold">{a.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{a.genre} • ⭐ {a.rating}</p>
          <div className="flex flex-wrap gap-1 mt-1 text-xs">
            {a.year && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">Año {a.year}</span>}
            {a.studio && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">{a.studio}</span>}
            {a.seasons && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">{a.seasons} temp.</span>}
          </div>
          {a.description && <p className="mt-2 text-sm line-clamp-3">{a.description}</p>}
          {a.characters?.length ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {a.characters.slice(0,3).map((c,i)=>(
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">{c}</span>
              ))}
              {a.characters.length > 3 && <span className="text-xs text-gray-500">+{a.characters.length-3} más</span>}
            </div>
          ) : null}
          <div className="mt-3 flex gap-2">
            <button onClick={()=>onEdit(a)} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">Editar</button>
            <button onClick={()=>onDelete(a._id)} className="px-3 py-2 rounded-lg border border-rose-300 text-rose-600 dark:border-rose-700">Eliminar</button>
          </div>
        </article>
      ))}
    </section>
  );
}

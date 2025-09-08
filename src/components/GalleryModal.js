import React, { useEffect, useState } from 'react';

export default function GalleryModal({ open, item, onClose, onPrev, onNext, API }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [item]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % (item?.images?.length || 1)), 3000);
    return () => clearInterval(id);
  }, [open, item]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + (item?.images?.length||1)) % (item?.images?.length||1));
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % (item?.images?.length||1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!open || !item) return null;
  const total = item.images?.length || 0;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-[95vw] max-h-[95vh] w-[1100px] bg-white dark:bg-gray-900 rounded-xl overflow-hidden" onClick={e=>e.stopPropagation()}>
        <button className="absolute top-3 right-3 bg-white/90 text-black px-3 py-1 rounded-full" onClick={onClose} aria-label="Cerrar">✕</button>
        <div className="grid md:grid-cols-2 gap-0 h-full">
          <div className="p-4 flex flex-col items-center justify-center bg-black/60">
            {total > 0 && (
              <>
                <div className="relative w-full flex items-center justify-center">
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/70" onClick={()=>setCurrent(c => (c - 1 + total) % total)} aria-label="Anterior">←</button>
                  <img src={`${API}${item.images[current]}`} alt={`Imagen ${current+1} de ${total} de ${item.title}`} className="max-h-[70vh] object-contain rounded-lg mx-auto" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/70" onClick={()=>setCurrent(c => (c + 1) % total)} aria-label="Siguiente">→</button>
                </div>
                <p className="mt-2 text-xs text-white/80">Imagen {current+1} de {total}</p>
                <div className="mt-3 flex gap-2 overflow-auto max-w-full px-2">
                  {item.images.map((img, i)=>(
                    <img key={i} src={`${API}${img}`} alt={`Miniatura ${i+1} de ${item.title}`} onClick={()=>setCurrent(i)}
                         className={`h-16 w-12 object-cover rounded-md cursor-pointer border ${i===current?'border-indigo-500':'border-transparent'}`} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="p-6 overflow-auto">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.genre} • ⭐ {item.rating}</p>
            <div className="flex flex-wrap gap-2 mt-1 text-xs">
              {item.year && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">Año {item.year}</span>}
              {item.studio && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">{item.studio}</span>}
              {item.seasons && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">{item.seasons} temp.</span>}
            </div>
            {item.description && <p className="mt-4 leading-relaxed">{item.description}</p>}
            {item.characters?.length ? (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Personajes</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {item.characters.map((c,i)=>(<li key={i}>{c}</li>))}
                </ul>
              </div>
            ) : null}
            <div className="mt-6 flex gap-3">
              <button className="px-3 py-2 rounded-lg border" onClick={onPrev} aria-label="Anterior anime">← Anterior</button>
              <button className="px-3 py-2 rounded-lg border" onClick={onNext} aria-label="Siguiente anime">Siguiente →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

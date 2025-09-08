import React, { useEffect, useRef, useState } from 'react';

export default function AnimeForm({ API, editing, onSaved, onCancel }) {
  const [form, setForm] = useState({
    title: '', genre: '', rating: '', year: '', studio: '', seasons: 1,
    description: '', characters: [''], images: []
  });
  const inputFilesRef = useRef(null);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        genre: editing.genre || '',
        rating: editing.rating ?? '',
        year: editing.year ?? '',
        studio: editing.studio || '',
        seasons: editing.seasons ?? 1,
        description: editing.description || '',
        characters: editing.characters?.length ? editing.characters : [''],
        images: []
      });
      if (inputFilesRef.current) inputFilesRef.current.value = '';
    } else {
      setForm({ title: '', genre: '', rating: '', year: '', studio: '', seasons: 1, description: '', characters: [''], images: [] });
      if (inputFilesRef.current) inputFilesRef.current.value = '';
    }
  }, [editing]);

  const setChar = (i, val) => {
    const next = [...form.characters];
    next[i] = val;
    setForm({ ...form, characters: next });
  };
  const addChar = () => setForm({ ...form, characters: [...form.characters, ''] });
  const removeChar = (i) => setForm({ ...form, characters: form.characters.filter((_,idx)=>idx!==i) });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || form.title.trim().length < 2) return alert('Título inválido (min 2 caracteres)');
    if (!form.genre) return alert('Género requerido');
    const r = Number(form.rating);
    if (Number.isNaN(r) || r < 0 || r > 10) return alert('Rating debe estar entre 0 y 10');
    const y = form.year ? Number(form.year) : null;
    if (y && y < 1900) return alert('Año debe ser >= 1900');
    const s = Number(form.seasons || 1);
    if (s < 1) return alert('Temporadas debe ser >= 1');

    const fd = new FormData();
    fd.append('title', form.title.trim());
    fd.append('genre', form.genre.trim());
    fd.append('rating', String(r));
    if (y) fd.append('year', String(y));
    fd.append('studio', form.studio.trim());
    fd.append('seasons', String(s));
    fd.append('description', form.description.trim());
    const cleanChars = form.characters.map(c => (c || '').trim()).filter(Boolean);
    fd.append('characters', JSON.stringify(cleanChars));
    for (const file of form.images) fd.append('images', file);
    if (editing && form.images.length) fd.append('replaceImages', 'true');

    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API}/api/animes/${editing._id}` : `${API}/api/animes`;
    const res = await fetch(url, { method, body: fd });
    const data = await res.json();
    if (res.ok) {
      onSaved(data, editing ? 'update' : 'create');
      setForm({ title: '', genre: '', rating: '', year: '', studio: '', seasons: 1, description: '', characters: [''], images: [] });
      if (inputFilesRef.current) inputFilesRef.current.value = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(data.error || 'Ocurrió un error');
    }
  };

  const previews = Array.from(form.images || []).map(f => URL.createObjectURL(f));

  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 grid gap-3">
      <div className="grid md:grid-cols-6 gap-3">
        <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
               placeholder="Título" required minLength={2}
               value={form.title} onChange={e=>setForm({...form, title: e.target.value})} aria-label="Título" />
        <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
               placeholder="Género" required value={form.genre} onChange={e=>setForm({...form, genre: e.target.value})} aria-label="Género" />
        <input type="number" min={0} max={10}
               className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
               placeholder="Rating (0-10)" required value={form.rating} onChange={e=>setForm({...form, rating: e.target.value})} aria-label="Rating" />
        <input type="number" min={1900} max={2100}
               className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
               placeholder="Año" value={form.year} onChange={e=>setForm({...form, year: e.target.value})} aria-label="Año" />
        <input className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
               placeholder="Estudio" value={form.studio} onChange={e=>setForm({...form, studio: e.target.value})} aria-label="Estudio" />
        <input type="number" min={1} max={100}
               className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
               placeholder="Temporadas" value={form.seasons} onChange={e=>setForm({...form, seasons: e.target.value})} aria-label="Temporadas" />
      </div>

      <textarea className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                rows={3} placeholder="Descripción / sinopsis"
                value={form.description} onChange={e=>setForm({...form, description: e.target.value})} aria-label="Descripción" />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium">Personajes</label>
          <button type="button" onClick={()=>setForm({...form, characters:[...form.characters, '']})}
                  className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700">➕ Añadir</button>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {form.characters.map((ch, i) => (
            <div key={i} className="flex gap-2">
              <input value={ch} onChange={e=>setChar(i, e.target.value)}
                     placeholder={`Personaje #${i+1}`}
                     className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                     aria-label={`Personaje ${i+1}`} />
              <button type="button" onClick={()=>removeChar(i)}
                      className="px-3 py-2 rounded-lg border border-rose-300 text-rose-600 dark:border-rose-700" aria-label={`Quitar personaje ${i+1}`}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="font-medium">Imágenes (puedes seleccionar varias)</label>
        <input type="file" multiple accept="image/*" ref={inputFilesRef}
               className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
               onChange={e=>setForm({...form, images: Array.from(e.target.files || [])})} aria-label="Imágenes" />
        {editing && <p className="text-xs text-gray-500 mt-1">Si seleccionas nuevas imágenes, reemplazarán a las actuales.</p>}
        {previews?.length ? (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {previews.map((src,i)=>(<img key={i} src={src} alt={`Preview ${i+1}`} className="h-24 w-full object-cover rounded-lg" />))}
          </div>
        ) : null}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          {editing ? 'Actualizar' : 'Agregar'}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

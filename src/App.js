import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ThemeSwitch from './components/ThemeSwitch';
import AnimeForm from './components/AnimeForm';
import AnimeList from './components/AnimeList';
import GalleryModal from './components/GalleryModal';
import Chatbot from './components/Chatbot';

import PersonajeForm from './components/PersonajeForm';
import EditPersonajeForm from './components/EditPersonajeForm';
import PersonajeList from './components/PersonajeList';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

export default function App() {
  const [animes, setAnimes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editingPersonaje, setEditingPersonaje] = useState(null);

  const [query, setQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [minRating, setMinRating] = useState('');
  const [galleryIndex, setGalleryIndex] = useState(-1);

  useEffect(() => {
    fetch(`${API}/api/animes`)
      .then(r => r.json())
      .then(setAnimes)
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    return animes.filter(a => {
      const q = query.toLowerCase();
      const matchesQ =
        (a.title || '').toLowerCase().includes(q) ||
        (a.description || '').toLowerCase().includes(q);
      const matchesG = genreFilter
        ? (a.genre || '').toLowerCase().includes(genreFilter.toLowerCase())
        : true;
      const matchesR = minRating ? Number(a.rating) >= Number(minRating) : true;
      return matchesQ && matchesG && matchesR;
    });
  }, [animes, query, genreFilter, minRating]);

  const handleSaved = (saved, mode) => {
    if (mode === 'create') setAnimes(p => [saved, ...p]);
    else setAnimes(p => p.map(x => (x._id === saved._id ? saved : x)));
    setEditing(null);
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar anime?')) return;
    const res = await fetch(`${API}/api/animes/${id}`, { method: 'DELETE' });
    if (res.ok) setAnimes(prev => prev.filter(x => x._id !== id));
  };

  const handlePersonajeSaved = () => {
    setEditingPersonaje(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 justify-between">
            <h1 className="text-xl font-bold">Anime Portal v3 • CRUD • Galería • Chatbot</h1>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2" role="search">
                <input
                  aria-label="Buscar"
                  placeholder="Buscar..."
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <input
                  aria-label="Género"
                  placeholder="Género..."
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  value={genreFilter}
                  onChange={e => setGenreFilter(e.target.value)}
                />
                <select
                  aria-label="Mínimo rating"
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  value={minRating}
                  onChange={e => setMinRating(e.target.value)}
                >
                  <option value="">Rating</option>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <option key={i} value={i}>
                      {i}+
                    </option>
                  ))}
                </select>
              </div>
              <ThemeSwitch />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            {/* Rutas de personajes */}
            <Route
              path="/personajes"
              element={<PersonajeList API={API} onEdit={setEditingPersonaje} />}
            />
            <Route
              path="/personajes/nuevo"
              element={<PersonajeForm API={API} onSaved={handlePersonajeSaved} />}
            />
            <Route
              path="/personajes/editar/:id"
              element={
                <EditPersonajeForm
                  API={API}
                  personaje={editingPersonaje}
                  onSaved={handlePersonajeSaved}
                  onCancel={() => setEditingPersonaje(null)}
                />
              }
            />

            {/* Ruta principal */}
            <Route
              path="/"
              element={
                <>
                  <AnimeForm
                    API={API}
                    editing={editing}
                    onSaved={handleSaved}
                    onCancel={() => setEditing(null)}
                  />
                  <AnimeList
                    API={API}
                    items={filtered}
                    onEdit={setEditing}
                    onDelete={handleDelete}
                    onOpenGallery={setGalleryIndex}
                  />
                </>
              }
            />
          </Routes>
        </main>

        <GalleryModal
          open={galleryIndex !== -1 && filtered[galleryIndex]}
          item={galleryIndex !== -1 ? filtered[galleryIndex] : null}
          onClose={() => setGalleryIndex(-1)}
          onPrev={() => setGalleryIndex(i => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setGalleryIndex(i => (i + 1) % filtered.length)}
          API={API}
        />

        <Chatbot
          items={animes}
          onOpen={animeId => {
            const idx = filtered.findIndex(a => a._id === animeId);
            if (idx !== -1) setGalleryIndex(idx);
            else {
              alert('El anime no coincide con los filtros actuales. Limpia los filtros para verlo en la galería.');
            }
          }}
          API={API}
        />
      </div>
    </Router>
  );
}

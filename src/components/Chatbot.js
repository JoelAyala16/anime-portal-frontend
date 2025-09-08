import React, { useState } from 'react';

export default function Chatbot({ items, onOpen, API }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: 'bot', type: 'text', text: '¡Hola! Pídeme recomendaciones: escribe un género (shonen, aventura...), un personaje (Goku, Luffy), un título o un rating mínimo (ej. 9).' }]);
  const [prompt, setPrompt] = useState('');

  const send = () => {
    if (!prompt.trim()) return;
    const q = prompt.trim().toLowerCase();
    setMsgs(m => [...m, { from: 'user', type: 'text', text: prompt }]);
    let out = items;

    const ratingMatch = q.match(/(\d+(?:\.\d+)?)/);
    if (ratingMatch) out = out.filter(a => Number(a.rating) >= Number(ratingMatch[1]));

    const words = q.split(/\s+/);
    out = out.filter(a => {
      const g = (a.genre || '').toLowerCase();
      const t = (a.title || '').toLowerCase();
      const d = (a.description || '').toLowerCase();
      const chars = (a.characters || []).map(x => String(x).toLowerCase());
      return words.some(word => g.includes(word) || t.includes(word) || d.includes(word) || chars.some(c => c.includes(word)));
    });

    if (!out.length) {
      setMsgs(m => [...m, { from: 'bot', type: 'text', text: 'No encontré coincidencias. Prueba con otro género, personaje o rating.' }]);
    } else {
      // enviamos tarjetas hasta 3 resultados
      const cards = out.slice(0,3).map(a => ({
        from: 'bot',
        type: 'card',
        animeId: a._id,
        title: a.title,
        text: a.description || a.genre,
        rating: a.rating,
        image: a.images?.[0] ? API + a.images[0] : null,
      }));
      setMsgs(m => [...m, { from: 'bot', type: 'text', text: 'Te sugiero:' }, ...cards]);
    }
    setPrompt('');
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 z-40 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-lg"
        onClick={() => setOpen(o=>!o)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {open ? 'Cerrar chat' : 'Abrir chat'}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-96 h-[520px] z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl flex flex-col" role="dialog" aria-modal="false" aria-label="Chatbot de recomendaciones">
          <header className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold flex justify-between items-center">
            <span>🤖 Chatbot</span>
            <button onClick={()=>setOpen(false)} aria-label="Cerrar">✕</button>
          </header>
          <div className="flex-1 overflow-auto p-3 text-sm space-y-2">
            {msgs.map((m,i)=>(
              <div key={i} className="mb-1">
                {m.type === 'text' ? (
                  <div><b>{m.from === 'bot' ? 'Bot' : 'Tú'}:</b> {m.text}</div>
                ) : (
                  <div className="border rounded-lg p-2 flex gap-2 items-start bg-gray-50 dark:bg-gray-900">
                    {m.image && <img src={m.image} alt={m.title} className="w-16 h-24 object-cover rounded" />}
                    <div className="flex-1">
                      <div className="font-semibold">{m.title} <span className="text-xs">• ⭐ {m.rating}</span></div>
                      {m.text && <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">{m.text}</div>}
                      <button onClick={()=>onOpen && onOpen(m.animeId)}
                        className="mt-2 px-2 py-1 rounded bg-indigo-600 text-white text-xs">Ver más</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-top border-gray-200 dark:border-gray-700 flex gap-2">
            <input
              value={prompt}
              onChange={e=>setPrompt(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="Ej: shonen Goku 9"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              aria-label="Mensaje del chatbot"
            />
            <button onClick={send} className="px-3 py-2 rounded-lg bg-indigo-600 text-white">Enviar</button>
          </div>
        </div>
      )}
    </>
  );
}

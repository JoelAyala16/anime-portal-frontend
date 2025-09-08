import React, { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <button
      onClick={()=>setDark(d=>!d)}
      className="px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
      aria-label={`Cambiar a tema ${dark ? 'claro' : 'oscuro'}`}
    >
      {dark ? '☀️ Claro' : '🌙 Oscuro'}
    </button>
  );
}

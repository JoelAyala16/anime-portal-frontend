import React, { useEffect, useState } from "react";

function ThemeSwitch() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Aplica el tema al cargar
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      className="flex items-center justify-center w-10 h-10 rounded-full 
                 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 transition-colors duration-300 shadow hover:scale-105"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeSwitch;

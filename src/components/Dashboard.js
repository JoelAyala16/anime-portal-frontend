import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const [stats, setStats] = useState({ animes: 0, personajes: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [animesRes, personajesRes] = await Promise.all([
          api.get("/api/anime"),
          api.get("/api/personajes"),
        ]);
        setStats({
          animes: animesRes.data.length,
          personajes: personajesRes.data.length,
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Dashboard Anime Portal
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Tarjeta Animes */}
        <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Animes</h2>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {stats.animes}
          </p>
          <div className="mt-4 space-x-2">
            <Link
              to="/animes"
              className="px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Ver Animes
            </Link>
            <Link
              to="/add-anime"
              className="px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              + Agregar
            </Link>
          </div>
        </div>

        {/* Tarjeta Personajes */}
        <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Personajes</h2>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {stats.personajes}
          </p>
          <div className="mt-4 space-x-2">
            <Link
              to="/personajes"
              className="px-3 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
            >
              Ver Personajes
            </Link>
            <Link
              to="/add-personaje"
              className="px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              + Agregar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

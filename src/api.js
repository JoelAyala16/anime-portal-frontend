// frontend/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://anime-portal-backend.onrender.com/api" // 👉 Render (deploy)
      : "http://localhost:5000/api", // 👉 Local (dev)
});

export default api;


// frontend/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://anime-portal-backend.onrender.com/api", // ✅ tu backend en Render
});

export default api;


import React, { useState } from "react";
import api from "../api";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await api.post("/api/assistant", { message: input });
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error con el chatbot:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error en el servidor." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-6 bg-white dark:bg-gray-800">
      <h2 className="font-bold mb-2">💬 Chatbot</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2 rounded bg-gray-50 dark:bg-gray-700">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-1 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded ${
                msg.sender === "user"
                  ? "bg-blue-200 text-blue-900"
                  : "bg-gray-300 text-gray-900"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chatbot;



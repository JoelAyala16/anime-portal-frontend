import React, { useState, useRef, useEffect } from "react";
import api from "../api";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await api.post("/assistant", { message: input }); // 👈 corregido
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

  // Auto-scroll al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar con Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 shadow-lg">
      <h2 className="font-bold mb-2 text-gray-900 dark:text-white">💬 Chatbot</h2>
      <div className="h-48 overflow-y-auto border p-2 mb-2 rounded bg-gray-50 dark:bg-gray-700">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-1 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded break-words max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 flex-1 rounded bg-gray-100 dark:bg-gray-700 
                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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



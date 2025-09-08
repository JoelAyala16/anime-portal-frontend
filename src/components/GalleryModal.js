import React, { useEffect } from "react";

function GalleryModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  // Cerrar con la tecla Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Cerrar haciendo clic en el fondo
  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt="Preview"
          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default GalleryModal;

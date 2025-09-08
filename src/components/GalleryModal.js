import React, { useEffect } from "react";

function GalleryModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  // Cerrar con tecla Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Bloquear scroll del body
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Cerrar al hacer clic en el fondo
  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 
                 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative animate-fadeIn">
        <img
          src={imageUrl}
          alt="Vista ampliada"
          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg border border-gray-300"
        />

        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white 
                     w-8 h-8 flex items-center justify-center rounded-full shadow-md"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default GalleryModal;

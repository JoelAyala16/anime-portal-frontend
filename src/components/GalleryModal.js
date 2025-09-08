import React from "react";

function GalleryModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative">
        <img src={imageUrl} alt="Preview" className="max-h-[80vh] rounded-lg shadow-lg" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default GalleryModal;

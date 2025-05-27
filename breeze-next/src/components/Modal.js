import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      modalRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      tabIndex="-1" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute p-1 text-gray-500 rounded-full top-2 right-2 hover:bg-gray-100"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
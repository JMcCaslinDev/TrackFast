'use client';

import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-stone-50 p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Confirm Action</h2>
        <p className="text-stone-700 mb-4">{message}</p>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-stone-400 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

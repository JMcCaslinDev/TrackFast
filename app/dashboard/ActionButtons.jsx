// components/ActionButtons.js

'use client';

import React from 'react';

const ActionButtons = ({ onQuickAdd }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onQuickAdd}
        className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors"
      >
        Quick Add
      </button>
      <a
        href="https://www.indeed.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#2164F3] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
      >
        Go To Indeed
      </a>
    </div>
  );
};

export default ActionButtons;

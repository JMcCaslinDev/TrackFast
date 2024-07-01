'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, job, onSave }) => {
  const [editedJob, setEditedJob] = useState(job);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-800 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-stone-50 p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-stone-800">Edit Job Application</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="mb-4">
            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="company">
              Company
            </label>
            <input
              className="shadow-sm appearance-none border border-stone-300 rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="company"
              type="text"
              value={editedJob.company_name}
              onChange={(e) => setEditedJob({...editedJob, company_name: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="position">
              Position
            </label>
            <input
              className="shadow-sm appearance-none border border-stone-300 rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="position"
              type="text"
              value={editedJob.job_title}
              onChange={(e) => setEditedJob({...editedJob, job_title: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              className="shadow-sm appearance-none border border-stone-300 rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="status"
              value={editedJob.application_status}
              onChange={(e) => setEditedJob({...editedJob, application_status: e.target.value})}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow-sm appearance-none border border-stone-300 rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="date"
              type="date"
              value={editedJob.date_applied}
              onChange={(e) => setEditedJob({...editedJob, date_applied: e.target.value})}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              Save Changes
            </button>
            <button
              className="bg-stone-400 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

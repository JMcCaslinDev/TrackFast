'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import dayjs from 'dayjs';
import ConfirmationModal from './ConfirmationModal';

const getCurrentFormData = () => ({
  company_name: '',
  job_title: '',
  application_status: 'Applied',
  date_applied: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
  job_description: '',
  notes: '',
  application_method: 'Indeed',
  pay_amount: 0,
  pay_amount_max: 0,
  job_posting_url: '',
  pay_type: '',
  employment_type: 'Full-time',
  work_location_mode: 'Remote',
  location: '',
  experience_level: 'Entry Level',
  pinned: false,
});

const Modal = ({ isOpen, onClose, job, onSave, onDelete }) => {
  const [editedJob, setEditedJob] = useState(job || getCurrentFormData());
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    console.log("Modal useEffect triggered. isOpen:", isOpen, "job:", job);
    if (isOpen) {
      if (job) {
        console.log("Setting editedJob with existing job:", job);
        setEditedJob({ ...job });
      } else {
        console.log("Setting editedJob with new form data");
        setEditedJob({
          ...getCurrentFormData(),
          date_applied: dayjs().format('YYYY-MM-DDTHH:mm:ss')
        });
      }
    }
  }, [isOpen, job]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && !isConfirmDeleteOpen) {
        console.log("Clicked outside modal. Closing.");
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isConfirmDeleteOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    console.log(`Input changed: ${name} = ${fieldValue}`);
    setEditedJob({ ...editedJob, [name]: fieldValue });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Save button clicked. Saving job:", editedJob);
    onSave(editedJob);
    onClose();
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Confirm delete clicked");
    onDelete(editedJob);
    setIsConfirmDeleteOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-800 bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-stone-50 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto my-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-stone-800">{job ? 'Edit' : 'Add'} Job Application</h2>
          <button onClick={() => {
            console.log("Close button clicked");
            onClose();
          }} className="text-stone-500 hover:text-stone-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSave} className="space-y-2">
          {/* Input fields */}
          <div>
            <label className="block text-sm font-medium text-stone-700">Job Posting URL</label>
            <input
              type="text"
              name="job_posting_url"
              value={editedJob.job_posting_url}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Job Title</label>
            <input
              type="text"
              name="job_title"
              value={editedJob.job_title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={editedJob.company_name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Base Pay</label>
            <input
              type="number"
              name="pay_amount"
              value={editedJob.pay_amount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Max Pay</label>
            <input
              type="number"
              name="pay_amount_max"
              value={editedJob.pay_amount_max}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Pay Type</label>
            <select
              name="pay_type"
              value={editedJob.pay_type}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Salary">Salary</option>
              <option value="Hourly">Hourly</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Job Description</label>
            <textarea
              name="job_description"
              value={editedJob.job_description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Notes</label>
            <textarea
              name="notes"
              value={editedJob.notes}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Location</label>
            <input
              type="text"
              name="location"
              value={editedJob.location}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Application Method</label>
            <select
              name="application_method"
              value={editedJob.application_method}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Employment Type</label>
            <select
              name="employment_type"
              value={editedJob.employment_type}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Work Location Mode</label>
            <select
              name="work_location_mode"
              value={editedJob.work_location_mode}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Experience Level</label>
            <select
              name="experience_level"
              value={editedJob.experience_level}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="No Experience Required">No Experience Required</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Application Status</label>
            <select
              name="application_status"
              value={editedJob.application_status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="To Apply">To Apply</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Date Applied</label>
            <input
              type="datetime-local"
              name="date_applied"
              value={editedJob.date_applied}
              onChange={handleInputChange}
              step="1"
              className="mt-1 block w-full border border-stone-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              Save Changes
            </button>
            {job && (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button
              className="bg-stone-400 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              type="button"
              onClick={() => {
                console.log("Cancel button clicked");
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this job application? This action cannot be undone."
      />
    </div>
  );
};

export default Modal;

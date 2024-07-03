// app/dashboard/FeedbackModal.jsx

'use client';

import { useState } from 'react';

const FeedbackModal = ({ isOpen, onClose, userId, submitFeedback }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedbackText.trim() === '') return;

    try {
      await submitFeedback(feedbackText);
      alert('Feedback submitted successfully.');
      setFeedbackText('Feedback submitted successfully.');
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
        <p className="text-sm text-gray-600 mb-4">Feedback can be issues, bugs found, features wanted, etc. Please include a contact method to be responded to.</p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Enter your feedback here..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            maxLength={500}
            rows={4}
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;

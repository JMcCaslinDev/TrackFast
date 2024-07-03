// app/mongodb/feedbackModel.js

import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  feedback_text: {
    type: String,
    required: true,
    maxlength: 500
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);

export default Feedback;

import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true },
  loginToken: String,
  tokenExpiry: Date,
  created_at: { type: Date, default: Date.now },
  daily_application_goal: { type: Number, default: 1 },
});

const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;

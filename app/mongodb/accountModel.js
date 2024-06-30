import { Schema, model } from 'mongoose';

const accountSchema = new Schema({
  email: { type: String, required: true },
  loginToken: String,
  tokenExpiry: Date,
  created_at: { type: Date, default: Date.now },
  daily_application_goal: { type: Number, default: 1 },
});

const Account = model('Account', accountSchema);

export default Account;

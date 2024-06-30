import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  magicToken: { type: String, required: false }
});

export default mongoose.models.User || mongoose.model('User', userSchema);

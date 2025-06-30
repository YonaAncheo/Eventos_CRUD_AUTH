import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requied: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    requied: true,
    trim: true,
    unique: true

  },
  password: {
    type: String,
    requied: true
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
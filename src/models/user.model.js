import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
});

export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, index: true },
  nickname: { type: String },
  birth: { type: Number },
  gender: { type: Number, enum: [1, 2] },
  consecution: { type: Number, default: 1 },
  fcm: { type: String, default: null },
  signup: { type: Date, default: Date.now },
  signin: { type: Date, default: Date.now },
  removed: { type: Date, default: null },
  token: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;
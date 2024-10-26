import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  date: { type: Date, index: true },
  code: { type: Number, index: true },
  count: { type: Number, default: 0 },
  elapsed: { type: Number, default: 0 },
  top: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
});

const Record = mongoose.model('Record', recordSchema);
export default Record;
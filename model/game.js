import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  code: { type: Number, index: true },
  top: { type: Number, default: 0 },
});

const Game = mongoose.model('Game', gameSchema);
export default Game;
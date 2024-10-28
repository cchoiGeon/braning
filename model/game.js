import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  code: { type: Number, index: true },
  top: { type: Number, default: 0 },
});

gameSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj._id
  delete obj.user
  delete obj.code
  delete obj.__v
  // obj.records.forEach(e => { delete e._id })
  return obj
}

const Game = mongoose.model('Game', gameSchema);
export default Game;
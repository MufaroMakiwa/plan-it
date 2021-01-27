const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleid: String,
  points: Number,
  num_friends: Number,
  coins: Number,
  speed: Number,
  high_score: Number,
  icon: Number,
  skin: Number,
  available_skins: Array,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);

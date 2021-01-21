const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleid: String,
  points: Number,
  num_friends: Number
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);

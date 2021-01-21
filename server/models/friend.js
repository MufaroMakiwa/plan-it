const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  userId_1: String,
  userName_1: String,
  userEmail_1: String,
  userId_2: String,
  userName_2: String,
  userEmail_2: String,
  is_friend: Boolean,
});

// compile model from schema
module.exports = mongoose.model("friend", FriendSchema);

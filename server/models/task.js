const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task_name: String,
  userId: String,
  userName: String,
  created: String,
  duration: Number,
  frequency: String,
  is_completed: Boolean,
  date_completed: String,
  progess: Number,
  is_challenge: Boolean,
  challenger: String
});

// compile model from schema
module.exports = mongoose.model("task", TaskSchema);

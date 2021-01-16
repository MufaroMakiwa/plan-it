const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task_name: String,
  user: String,
  created: String,
  duration: Number,
  frequency: String,
  is_completed: Boolean,
  progess: Number,
  is_challenge: Boolean,
  challenger: String
});

// compile model from schema
module.exports = mongoose.model("task", TaskSchema);

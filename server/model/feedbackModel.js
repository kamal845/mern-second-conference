const mongoose = require("mongoose");
const feedbackSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Message: {
    type: String,
  }
});
module.exports = mongoose.model("feedback", feedbackSchema);
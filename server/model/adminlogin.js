const mongoose = require("mongoose");
const adminloginSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  token: {
    type: String,
  }
});
module.exports = mongoose.model("adminlogin", adminloginSchema);
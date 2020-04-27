const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  isAdmin: String,
  wrongLoginCount: String,
  avatar: String
});

const User = mongoose.model("users", userSchema);

module.exports = User;

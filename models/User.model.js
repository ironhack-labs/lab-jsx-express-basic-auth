// Create the User model here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE THE SCHEMA
const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
});

// CREATE THE MODEL
const User = mongoose.model("User", userSchema);

// EXPORT THE MODEL
module.exports = User;
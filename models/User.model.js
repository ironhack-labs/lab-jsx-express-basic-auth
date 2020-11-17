// Create the User model here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: {
      createdAt: "create_at",
      updatedAt: "updated_at",
    },
  }
);

//Create the model
const User = mongoose.model("User", userSchema);

//Exports
module.exports = User;
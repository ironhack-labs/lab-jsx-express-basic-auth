// Create the User model here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

// CREATE MODEL
const User = mongoose.model("User", userSchema);

// EXPORT THE MODEL
module.exports = User;

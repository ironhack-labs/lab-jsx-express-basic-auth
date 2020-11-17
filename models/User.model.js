const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
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
//                          `users`
const User = mongoose.model("User", userSchema);

// EXPORT THE MODEL
module.exports = User;

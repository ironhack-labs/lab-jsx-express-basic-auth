// Create the User model here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
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

//create Model
const User = mongoose.model("User", userSchema);
//creara automaticamente una collection que se llamara "users"

//export Model
module.exports = User;

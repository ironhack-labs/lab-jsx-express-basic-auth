// Create the User model here
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

// CREATE SCHEMA FOR USER 
const UserSchema = new Schema({
    username: {type: String, unique:true}, 
    password: String
}, // timestamp
{
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'updated_at'
    }
  }
)
// CREATE A MODEL WHICH WILL AUTOMATICALLY CREATE A COLLECTION "users"
const User = mongoose.model("User", UserSchema); 

// EXPORT IT TO MAKE IT ACCESSIBLE 
module.exports = User; 
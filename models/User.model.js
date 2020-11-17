// Create the User model here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const userSchema = new Schema ({
    username: { type: String, unique: true },
    password: String
},
{
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'updated_at'
    }
}
)

//Creating the model
const User = mongoose.model('User', userSchema)

//Exporting the model
module.exports = User;
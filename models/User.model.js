// Create the User model here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create the schema

const userSchema = new Schema ({
      username:{type: String, unique: true},
      password: String
},
{
      timestamps: {
            createdAt: 'create_at',
            updatedAt: 'updated_at'
          }
        }

)

//create the model

const User = mongoose.model('User', userSchema)

//ecport the model

module.exports = User;
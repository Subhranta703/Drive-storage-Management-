const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength:[3,'username  must be at least 3 character long']
    },
    email: {
        type: String,
        required: true,
        unique: true,       // ensures no duplicate emails
        lowercase: true,    // converts email to lowercase before saving
        trim: true,
         minLength:[ 13,'email must be at least 13 character long']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength:[ 5,'username must be at least 5 character long']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

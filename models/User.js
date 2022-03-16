const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, `Email is required`],
        unique: true

    },

    password: {
        type: String,
        required: [true, `Password is required`]

    },

    isAdmin: {
        type: Boolean,
        default: false
    }


}, {timestamps: true})


module.exports = mongoose.model(`User`, userSchema); 
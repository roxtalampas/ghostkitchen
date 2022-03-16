const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, `Product Name is required`],
        unique: true
    },

    description: {
        type: String,
        required: [true, `Product Description is required`]
    },

    price: {
        type: Number,
        required: [true, `Price is required`],
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {timestamps:true})


module.exports = mongoose.model(`Product`, productSchema);
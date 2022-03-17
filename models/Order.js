const mongoose = require('mongoose');


const orderSchema = ({

    totalAmount: {
        type: Number,
        required: true

    },
    purchasedOn: {
        type: Date,
        default: Date.now

    },
    userId: {
        type: String,
        required: [true, `User ID is required`]

    },
    products: [
        {
            productId:{    
                type: String,
                required: [true, `Product Id is required`]
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})


module.exports = mongoose.model(`Order`, orderSchema);
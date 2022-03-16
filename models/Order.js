const mongoose = require('mongoose');


const orderSchema = ({

    totalAmount: {
        type: Number,
        required: [true, `Order Total Amount is required`]

    },
    purchasedOn: {
        type: Date,
        default: new Date

    },
    userId: {
        type: String,
        required: [true, `User ID is required`]

    },
    productId: [{
        type: String,
        required: [true, `Product Id is required`]

    }]
})
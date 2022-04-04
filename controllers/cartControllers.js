const Cart = require('../models/Cart');





// CREATE A CART
module.exports.createCart = async (reqBody) => {

    const { userId, products: [{productId, quantity}]} = reqBody



    let newCart = new Cart({

        userId: userId,
        products: [
            {
                productId: productId,
                quantity: quantity
            }
        ]

    })

    return await newCart.save().then((result, err) => result ? true : err)


}
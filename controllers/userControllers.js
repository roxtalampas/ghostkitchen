const User = require('../models/User');
const Order = require('../models/Order');
const CryptoJS = require('crypto-js');


// IMPORT createToken FUNCTION FROM AUTH.JS
const { createToken } = require('../auth');



// GET ALL USERS
module.exports.getAllUsers = async () => {
	return await User.find().then(result => result)
}


// REGISTER A USER
module.exports.register = async (reqBody) => {


    const { email, password } = reqBody


    const newUser = new User({

        email: email,
        password: CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString()

    })


    return await newUser.save().then(result => {

        if (result) {
            return true

        }
        else if (result == null) {
            return false
        }
    })

}


// CHECK IF EMAIL EXISTS
module.exports.checkEmail = async (reqBody) => {

    return await User.findOne({ email: reqBody.email }).then((result, err) => {

        if (result) {
            return true
        }
        else {
            if (result == null) {
                return false
            }
            else {
                return err
            }

        }
    })
}


// LOGIN A USER
module.exports.login = async (reqBody) => {

    return await User.findOne({ email: reqBody.email }).then(result => {

        if (result == null) {

            return { message: `User does not exists` }

        }
        else {
            if (result != null) {

                const decryptedPw = CryptoJS.AES.decrypt(result.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8);


                if (reqBody.password == decryptedPw) {

                    return { token: createToken(result) }

                }
                else {
                    return { auth: `Auth Failed` }
                }

            }
            else {
                return err
            }
        }
    })
}

// RETRIEVE USER INFORMATION
module.exports.profile = async (id) => {

	return await User.findById(id).then((result, err) => {

		if (result) {
			return result
		}
		else {
			if (result == null) {
				return { message: `user does not exists` }
			} else {
				return err
			}
		}

	})
}


// SET USER TO HAVE ADMIN ACCESS
module.exports.adminStatus = async (userId) => {

    return await User.findByIdAndUpdate(userId, { $set: { isAdmin: true } }, { new: true }).then((result, err) => result ? true : err)

}


// CREATE AN ORDER
module.exports.createOrder = async (reqBody) => {

    const { totalAmount, userId, products: [{productId, quantity}]} = reqBody



    let newOrder = new Order({

        totalAmount: totalAmount,
        userId: userId,
        products: [
            {
                productId: productId,
                quantity: quantity
            }
        ]

    })

    return await newOrder.save().then((result, err) => result ? true : err)


}


// GET ALL ORDERS
module.exports.getAllOrders = async () => {

    return await Order.find().then(result => result)

}


// GET USER'S ORDERS
module.exports.getMyOrders = async (userId) => {

    return await Order.find({ userId: userId }).then((result) => {


        // console.log (result)


        if (result) {
            return result

        }
        else {
            if (result.length == 0) {
                return { message: `Order is empty` }
            }
            else {
                return err
            }
        }
    })
}



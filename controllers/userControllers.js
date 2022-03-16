const User = require('../models/User');
const CryptoJS = require('crypto-js');


// IMPORT createToken FUNCTION FROM AUTH.JS
const {createToken} = require('../auth');


// REGISTER A USER
module.exports.register = async (reqBody) => {


    const {email, password} = reqBody


    const newUser = new User({

        email: email,
        password: CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString()
    
    })


    return await newUser.save().then(result => {

        if (result){
            return true

        }
        else if (result == null){
            return false
        }
    })

}



// CHECK IF EMAIL EXISTS
module.exports.checkEmail = async (reqBody) => {

    return await User.findOne({email: reqBody.email}).then((result, err) => {

        if (result){
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

    return await User.findOne({email: reqBody.email}).then(result => {

        if (result == null){

            return {message: `User does not exists`}

        }
        else{
            if (result != null){
                
                const decryptedPw = CryptoJS.AES.decrypt(result.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8);
                

                if (reqBody.password == decryptedPw){

                     return {token: createToken(result)}

                }
                else {
                    return {auth: `Auth Failed`}
                }

            }
            else {
                return err
            }
        }
    })
}


// SET USER TO HAVE ADMIN ACCESS
module.exports.adminStatus = async (userId) => {

    return await User.findByIdAndUpdate(userId, {$set: {isAdmin: true}}, {new:true}).then((result, err) => result ? true : err)

}
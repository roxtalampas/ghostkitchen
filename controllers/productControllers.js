const Product = require('../models/Product');


// CREATE A PRODUCT
module.exports.addProduct = async (reqBody) => {

    const {name, description, price} = reqBody

    let newProduct = new Product({
        name: name,
        description: description,
        price: price
    })

    return await newProduct.save().then((result, err) => result ? true : err)

}



// GET ALL PRODUCTS
module.exports.getAllProducts = async () => {

    return await Product.find().then(result => result)
}



// GET A SPECIFIC PRODUCT
module.exports.getAProduct = async (productId) => {

    return await Product.findById(productId).then((result, err) => {

        if(result){
            return (result)

        }
        else {
            
            if(result == null){
                return {message: `Product not Found`}

            }
            else {
                return err

            }
        }
    })

}



//GET ACTIVE PRODUCTS
module.exports.activeProducts = async () => {

    return await Product.find({isActive: true}).then(result => result)
    
}


// UPDATE A SPECIFIC PRODUCT
module.exports.updateProduct = async (productId, reqBody) => {

    return await Product.findByIdAndUpdate(productId, {$set: reqBody}, {new:true}).then(result => result)

}


// ARCHIVE A PRODUCT
module.exports.archiveProduct = async (productId) => {

    return await Product.findByIdAndUpdate(productId, {$set: {isActive: false}}, {new:true}).then(result => result)

}


// UNARCHIVE A PRODUCT
module.exports.unArchiveProduct = async (productId) => {

    return await Product.findByIdAndUpdate(productId, {$set: {isActive: true}}, {new:true}).then(result => result)

}



// DELETE A COURSE
module.exports.deleteProduct = async (productId) => {

    
    return await Product.findByIdAndDelete(productId).then((result, err) => result ? true : err)

}
















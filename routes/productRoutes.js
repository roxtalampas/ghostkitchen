const express = require('express');
const router = express.Router();


const {
    addProduct,
    getAllProducts,
    getAProduct,
    updateProduct,
    archiveProduct

} = require('../controllers/productControllers')

const {verify, verifyAdmin} = require('../auth')



// CREATE A PRODUCT
router.post('/', verifyAdmin, async (req, res) => {

    try{
         await addProduct(req.body).then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})


// GET ALL PRODUCTS
router.get('/', verify, async (req, res) => {

    try{
        await getAllProducts().then(result =>res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})


// GET A SPECIFIC PRODUCT
router.get('/:productId', verify, async (req, res) => {

    try{
        await getAProduct(req.params.productId).then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)
    }
})


// UPDATE A PRODUCT
router.put('/:productId', verifyAdmin, async (req, res) => {

    try{
        await updateProduct(req.params.productId, req.body).then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})


// ARCHIVE A PRODUCT
router.put('/:productId/archive', verifyAdmin, async (req, res) => {

    try{
        await archiveProduct(req.params.productId).then(result => res.send(result))

    } catch(err){
        res.status(500).json(err)

    }
})







module.exports = router;

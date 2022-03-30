const express = require('express');
const router = express.Router();


const {
    addProduct,
    getAllProducts,
    getAProduct,
    activeProducts,
    updateProduct,
    archiveProduct,
    unArchiveProduct,
    deleteProduct

} = require('../controllers/productControllers')

const {verify, verifyAdmin} = require('../auth')



// CREATE A PRODUCT
router.post('/create', verifyAdmin, async (req, res) => {

    try{
         await addProduct(req.body).then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})


// GET ALL PRODUCTS
router.get('/', verifyAdmin, async (req, res) => {

    try{
        await getAllProducts().then(result =>res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})

// GET ACTIVE PRODUCTS
router.get('/isActive', async (req, res) => {

    // try{
        await activeProducts().then(result => res.send(result))
    
    // } catch (err){
    //     res.status(500).json(err)
    // }

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
router.put('/:productId/update', verifyAdmin, async (req, res) => {

    try{
        await updateProduct(req.params.productId, req.body).then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})


// ARCHIVE A PRODUCT
router.patch('/:productId/archive', verifyAdmin, async (req, res) => {

    try{
        await archiveProduct(req.params.productId).then(result => res.send(result))

    } catch(err){
        res.status(500).json(err)

    }
})



// UNARCHIVE A PRODUCT
router.patch('/:productId/unArchive', verifyAdmin, async (req, res) => {

    try{
        await unArchiveProduct(req.params.productId).then(result => res.send(result))

    } catch(err){
        res.status(500).json(err)

    }
})



// DELETE A PRODUCT
router.delete('/:productId/delete-product', verifyAdmin, async (req, res) => {

  
    try{
        await deleteProduct(req.params.productId).then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)
    }
})





module.exports = router;

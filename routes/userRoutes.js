const express = require('express');
const router = express.Router();

// IMPORTS UNIT OF FUNCTIONS FROM USER CONTROLLER MODULE
const {
    register,
    checkEmail,
    login,
    adminStatus,
    createOrder,
    getAllOrders,
    getMyOrders

} = require('../controllers/userControllers');


// IMPORTS UNIT OF FUNCTIONS FROM AUTH MODULE
const {verifyAdmin, verifyUser, decode} = require('../auth');


// REGISTER A USER
router.post('/register', async (req, res) => {

    try{
        await register(req.body).then(result => res.send(result))

    }
    catch(err){
        res.status(500).json(err)

    }
})


// CHECK IF EMAIL EXISTS
router.post('/email-exists', async (req, res) => {

    try{
        await checkEmail(req.body).then(result => res.send(result))

    }
    catch(err){
        res.status(500).json(err)
    }

})



// LOGIN A USER
router.post('/login', async (req, res) => {

    try{
        await login(req.body).then(result => res.send(result))

    }
    catch(err){
        res.status(500).json(err)

    }

})



// SET USER TO HAVE ADMIN ACCESS
router.put('/:userId/setAsAdmin', verifyAdmin, async (req, res) => {

    // console.log(req.headers.authorization)

    try{
        await adminStatus(req.params.userId).then(result => res.send(result))

    }
    catch(err){
        res.status(500).json(err)

    }
})


// CREATE ORDER
router.post('/checkout', verifyUser, async (req, res) => {

    try{
        await createOrder(req.body).then(result =>res.send(result))

    }catch(err){
        res.status(500).json(err)
    }
})


// GET ALL ORDERS
router.get('/orders', verifyAdmin, async (req, res) => {

    try{
        await getAllOrders().then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})



// GET USER'S ORDERS
router.get('/myOrders', verifyUser, async (req, res) => {

    const userId = decode(req.headers.authorization).id
    // console.log(userId)


    try{
        await getMyOrders(userId).then(result => res.send(result))

    }catch(err){
        res.status(500).json(err)

    }
})












// EXPORTS ROUTER MODULE TO BE USED IN index.js
module.exports = router;
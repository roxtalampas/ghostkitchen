const express = require('express');
const router = express.Router();


// IMPORTS UNIT OF FUNCTIONS FROM CART CONTROLLER MODULE
const {

    createCart


} = require('../controllers/cartControllers');



// IMPORTS UNIT OF FUNCTIONS FROM AUTH MODULE
const {verifyAdmin, verifyUser, verify, decode} = require('../auth');












// ADD TO CART
router.post('/create', verifyUser, async (req, res) => {

    try{
        await createCart(req.body).then(result =>res.send(result))

    }catch(err){
        res.status(500).json(err)
    }
})
const express = require('express');
const router = express.Router();

// IMPORTS UNIT OF FUNCTIONS FROM USER CONTROLLER MODULE
const {
    register,
    checkEmail,
    login,
    adminStatus

} = require('../controllers/userControllers');


// IMPORTS UNIT OF FUNCTIONS FROM AUTH MODULE
const {verify, verifyAdmin} = require('../auth');


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










// EXPORTS ROUTER MODULE TO BE USED IN index.js
module.exports = router;
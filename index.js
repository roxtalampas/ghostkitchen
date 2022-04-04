const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3010
const app = express();


// CONNECT ROUTES MODULE
const userRoutes = require('../Capstone-2/routes/userRoutes.js');
const productRoutes = require('../Capstone-2/routes/productRoutes.js');
const cartRoutes = require('../Capstone-2/routes/cartRoutes.js');
const orderRoutes = require('../Capstone-2/routes/orderRoutes.js');


// MIDDLEWARE TO HANDLE JSON PAYLOADS
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors()) // prevents blocking of requests from client esp using different domain


// CONNECT DATABASE TO SERVER
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});


// TEST DB CONNECTION
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to Database`));


// SCHEMA
    // moved to Models Module


// ROUTES
    // create a middleware to be the URL of all routes
app.use(`/api/users`, userRoutes);
app.use(`/api/products`, productRoutes);
// app.use(`/api/carts`, cartRoutes);
// app.use(`/api/orders`, orderRoutes);


app.listen(PORT, () => console.log(`Server connected to port ${PORT}`))
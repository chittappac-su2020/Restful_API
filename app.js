const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const morgan=require('morgan');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://dbNodeRest:'+process.env.MONGO_ATLAS_PW+'@node-rest-shop.5mip0.mongodb.net/dbNodeRest?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});

module.exports = app;
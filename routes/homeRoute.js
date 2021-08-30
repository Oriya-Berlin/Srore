const express = require('express');
const router = express.Router();
const Product = require('./../models/product');




router.get('/home' , async (req, res) => {

    await Product.find({})
    .then( products => res.json(products))
    .catch(err => res.status(400).json(`Error  : ${err}`))
});









module.exports = router;
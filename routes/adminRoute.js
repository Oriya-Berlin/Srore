const express = require('express');
const router = express.Router();
const Product = require('./../models/product');



router.get('/admin' , async (req, res) => {

    await Product.find({})
    .then( products => res.json(products))
    .catch(err => res.status(400).json(`Error  : ${err}`))
});



// create new product
router.post('/admin/create', (req,res) => {

    const newProduct = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    }); 

    newProduct.save()
    .then(() => res.json('New product has been created!'))
    .catch(err => res.status(400).json(`Error: ${err}`));

});




// update
router.put('/admin/update/:id', async (req,res) => {

    await Product.findById(req.params.id)
    .then(product => {
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.body.image;

        product.save()
        .then(product => res.json('Product has been updated successfuly'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});




// delete
router.delete('/admin/delete/:id', async (req,res) => {

    await Product.findByIdAndDelete(req.params.id)
    .then( () => res.json('Product has been deleted!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});




module.exports = router;
const express = require('express');
const router = express.Router();
const Stats = require('./../models/stats');
const UniqueStats = require('./../models/uniqueStats');




// test
router.get('/stats/test' , async (req, res) => {

    // await Stats.aggregate([{$group: {_id : "$date" , count: { $sum: 1 } }}]).sort({"count": -1})
    await Stats.aggregate([{$group: {_id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, count: { $sum: 1 }, total:{$sum: "$price"} }}]).sort({"total": -1}).limit(5)
    .then( products => res.json(products))
    .catch(err => res.status(400).json(`Error  : ${err}`))
});














// top 5 sales
router.get('/stats/top5' , async (req, res) => {

    await Stats.aggregate([{$group: {_id : "$product_id" , count: { $sum: 1 } }}]).sort({"count": -1}).limit(5)
    .then( products => res.json(products))
    .catch(err => res.status(400).json(`Error  : ${err}`))
});



// top 5 unique
router.get('/stats/top5unique' , async (req, res) => {

    await UniqueStats.find({}).sort({"counter": -1}).limit(5)
    .then( products => res.json(products))
    .catch(err => res.status(400).json(`Error  : ${err}`))
});



// past 5 days
router.get('/stats/past5' , async (req, res) => {

    await Stats.aggregate([{$group: {_id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, count: { $sum: 1 }, total:{$sum: "$price"} }}]).sort({"total": -1}).limit(5)
    .then( products => res.json(products))
    .catch(err => res.status(400).json(`Error  : ${err}`))
});



// run after we pay at our cart
router.post('/stats/add', async (req,res) => {

    const item = new Stats({
        product_id: req.body.product_id,
        price: req.body.price,
        date: Date.now()
    }); 

    await item.save()
    .then(() => res.json('Stats item has been saved!'))
    .catch(err => res.status(400).json(`Error: ${err}`));

});



// run after we pay at our cart AND add uniqus to 'uniqueStats' table
router.put('/stats/addunique', async (req,res) => {

    const isItemExist = await UniqueStats.findOne({product_id: req.body.product_id})

    if(isItemExist){

        await UniqueStats.findById(isItemExist._id)
        .then(product => {

            product.counter = isItemExist.counter + 1;

            product.save()
            .then(product => res.json('Product has been updated successfuly'))
            .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));

    }else{

        const item = new UniqueStats({
            product_id: req.body.product_id,
            counter: 1
        });

        await item.save()
        .then(() => res.json('Unique Stats item has been saved!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    }

    

});







// ***** ONLY FOR TEST ***** //

router.post('/stats/addtest', async (req,res) => {

    const item = new Stats({
        product_id: req.body.product_id,
        price: req.body.price,
        date: req.body.date
    }); 

    await item.save()
    .then(() => res.json('Stats item has been saved!'))
    .catch(err => res.status(400).json(`Error: ${err}`));

});


// router.delete('/stats/delete' , async (req, res) => {

//     await UniqueStats.deleteMany({})
//     .then( products => res.json(products))
//     .catch(err => res.status(400).json(`Error  : ${err}`))
// });


module.exports = router;
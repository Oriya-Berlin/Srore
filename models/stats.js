const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const statsSchema = new Schema({

    product_id: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, required: true}
});


const Stats = mongoose.model("stats", statsSchema);


module.exports = Stats;
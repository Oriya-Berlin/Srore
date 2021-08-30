const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const uniqueStatsSchema = new Schema({

    product_id: {type: String, required: true},
    counter: {type: Number, required: true},
});


const uniqueStats = mongoose.model("uniquestats", uniqueStatsSchema);


module.exports = uniqueStats;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const server = express();
const PORT = process.env.PORT || 8080;
const URL = process.env.URL;


server.use(cors());
server.use(express.json());


mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => console.log('DB Connected! '));


// ------------------------------------------------------------------------ //
// Routes
const productsRouter = require('./routes/adminRoute')
const homeRouter = require('./routes/homeRoute')
const statsRouter = require('./routes/statsRoute')


server.use('/', productsRouter);
server.use('/', homeRouter);
server.use('/', statsRouter);


// ------------------------------------------------------------------------ //

server.listen(PORT, () => console.log(`SERVER is running on port ${PORT}`));
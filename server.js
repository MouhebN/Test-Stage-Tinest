const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
const colisRoute = require('./Routes/colis.js');
app.use('', colisRoute);
const agenceRoute = require('./Routes/agence.js');
app.use('', agenceRoute);
const magasinierRoute = require('./Routes/magasinier.js');
app.use('', magasinierRoute);

const livreurRoute = require('./Routes/livreur.js');
app.use('', livreurRoute);

const stockRoute = require('./Routes/stock.js');
app.use('', stockRoute);




mongoose.connect('mongodb://127.0.0.1:27017/tinest-delivery');
const db = mongoose.connection;
db.once('open', function () {
    console.log('MongoDB database connection established successfully');
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
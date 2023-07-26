const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ColisModel = require ('./Models/colis');
const FournisseurModel = require ('./Models/fournisseur');
const LivreurModel = require ('./Models/livreur');
const MagasinierModel = require ('./Models/magasinier');
const StockModel = require ('./Models/stock');

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





mongoose.connect('mongodb://127.0.0.1:27017/tinest-delivery');
const db = mongoose.connection;
db.once('open', function () {
    console.log('MongoDB database connection established successfully');
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
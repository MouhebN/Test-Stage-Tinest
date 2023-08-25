const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const fournisseurRoute = require('./routes/fournisseur') 
const colisRoute = require('./routes/colis');
const livreurRoute = require('./routes/livreur');
const agenceRoute = require('./routes/agence')
const stockRoute = require('./routes/stock');
const factureRoute = require('./routes/facture')
const articleRoute = require('./routes/article');

app.use('/colis',colisRoute)
app.use('/fournisseur',fournisseurRoute)
app.use('/livreur', livreurRoute)
app.use('/agence', agenceRoute)
app.use('/stock' , stockRoute)
app.use('/facture', factureRoute)
app.use('/article',articleRoute)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();

});
mongoose.connect('mongodb://127.0.0.1:27017/tinest-delivery' ,
   {
  useNewUrlParser : true,
  
   }
)

const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"))
  db.once("open", function(){
  console.log("database connected successfully...")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
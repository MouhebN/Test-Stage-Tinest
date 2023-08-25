const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  log: String,
  qrCode: String,
  nomClient: String,
  quantite: Number,
  puHt: Number,
  tva: Number,
  mtTva: Number,
  mtTtc: Number,
  prixTotal: Number,
  fragile: Boolean,
  nomLivreur: String,
  nomSociete: String,
  adresse: String,
  livreurEchange: Boolean,
});

const Facture = mongoose.model('Facture', factureSchema);

module.exports = Facture;

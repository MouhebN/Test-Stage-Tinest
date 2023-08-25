const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  quantite: { type: Number, required: true },
  prixUnitaireHT: { type: Number, required: true },
  tva: { type: Number, default: 0.19 }, // TVA par défaut de 19%
});

articleSchema.virtual('prixTotalHT').get(function () {
  return this.quantite * this.prixUnitaireHT;
});

articleSchema.virtual('montantTVA').get(function () {
  return this.prixTotalHT * this.tva;
});

articleSchema.virtual('montantTTC').get(function () {
  return this.prixTotalHT + this.montantTVA;
});

module.exports = mongoose.model('Article', articleSchema);

const express = require('express');
const factureController = require('../Controllers/factureController');

const router = express.Router();

// Route pour générer et enregistrer une facture
router.post('/generer-facture', factureController.genererFacture);

module.exports = router;

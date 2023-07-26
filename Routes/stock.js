const express = require('express');
const stockController = require("../Controllers/stockController");
const router = express.Router();

router.post('/ajouterStock' ,stockController.ajouterStock);
router.post('/:id/modifierStock' ,stockController.modifierStock);
router.get('/:id/supprimerStock' ,stockController.supprimerStock);
router.get('/listerStocks' ,stockController.listerStocks);



module.exports =router ;
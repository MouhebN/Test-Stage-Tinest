const express = require('express');
const stockController = require("../Controllers/stockController");
const colisController = require("../Controllers/colisController");
const router = express.Router();

router.post('/ajouterStock' ,stockController.ajouterStock);
router.post('/:id/modifierStock' ,stockController.modifierStock);
router.get('/:id/supprimerStock' ,stockController.supprimerStock);
router.get('/listerStocks' ,stockController.listerStocks);
router.get('/getNumberColisEnStock' ,stockController.getNumberColisEnStock);
router.get('/getNumberColisEnCours' ,stockController.getNumberColisEnCours);
router.get('/getNumberColisEnRetour' ,stockController.getNumberColisEnRetour);
router.post('/payementColis' ,stockController.payementColis);
router.post('/retourAuFournisseur' ,stockController.retourAuFournisseur);







module.exports =router ;
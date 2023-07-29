const express = require('express');
const colisController = require("../Controllers/colisController");
const stockController = require("../Controllers/stockController");
const router = express.Router();

router.post('/ajouterColis' ,colisController.ajouterColis);
router.post('/:id/modifierColis' ,colisController.modifierColis);
router.get('/:id/supprimerColis' ,colisController.supprimerColis);
router.get('/listerColis' ,colisController.listerColis);
router.get('/:id/listerLivreurAgence' ,colisController.listerLivreurAgence);
router.post('/ajouterColisAuStock' ,colisController.ajouterColisAuStock);
router.post('/attribuerColis' ,colisController.attribuerColisAuLivreur);
router.post('/retournerColis',colisController.retourColisAuStock);
router.get('/getStockColis' ,colisController.getAllColisFromStock);
router.get('/getLivreur/:id' ,colisController.getLivreur);
router.get('/getMultipleLivreur' ,colisController.getMultipleLivreur);
router.get('/getAllColisEnStock' ,colisController.getAllColisEnStock);










module.exports =router ;
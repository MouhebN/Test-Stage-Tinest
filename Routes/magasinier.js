const express = require('express');
const magasinierController = require("../Controllers/magasinierController");
const router = express.Router();

router.post('/ajouterMagasinier' ,magasinierController.ajouterMagasinier);
router.post('/:id/modifierMagasinier' ,magasinierController.modifierMagasinier);
router.get('/:id/supprimerMagasinier' ,magasinierController.supprimerMagasinier);
router.get('/listerMagasiniers' ,magasinierController.listerMagasiniers);


module.exports =router ;
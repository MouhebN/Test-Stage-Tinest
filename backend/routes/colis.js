const express = require('express');
const router = express.Router();
const colisController = require('../Controllers/colisController');

router.post('/ajouterColis', colisController.createColis); // Utilisez createColis au lieu d'ajouterColis
router.post('/:id/modifierColis', colisController.modifierColis);
router.get('/:id/supprimerColis', colisController.supprimerColis);
router.get('/listerColis', colisController.listerColis);

// livreur
//router.post('/scanPickup', colisController.pickUpColis);

module.exports = router;

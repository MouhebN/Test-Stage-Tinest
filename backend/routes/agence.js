const express = require('express');
const router = express.Router();
const agenceController = require('../Controllers/agenceController');

// Protected routes (require authentication)
router.post('/ajouterAgence', agenceController.ajouterAgence);
router.post('/:id/modifierAgence',  agenceController.modifierAgence);
router.get('/:id/supprimerAgence', agenceController.supprimerAgence);
router.get('/listerAgences', agenceController.listerAgences);

module.exports = router;
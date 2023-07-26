const express = require('express');
const agenceController = require("../Controllers/agenceController");
const router = express.Router();

router.post('/ajouterAgence' ,agenceController.ajouterAgence);
router.post('/:id/modifierAgence' ,agenceController.modifierAgence);
router.get('/:id/supprimerAgence' ,agenceController.supprimerAgence);
router.get('/listerAgences' ,agenceController.listerAgences);

module.exports =router ;
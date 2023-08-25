const express = require('express');
const router = express.Router();
const fournisseurController = require('../Controllers/fournisseurController');

// Route pour créer un nouveau fournisseur
router.post('/ajouterfournisseur', fournisseurController.createFournisseur);

// Route pour obtenir tous les fournisseurs
router.get('/listefournisseur', fournisseurController.getFournisseurs);

// Route pour obtenir un fournisseur par son ID
router.get('/fournisseur/:id', fournisseurController.getFournisseurById);

// Route pour mettre à jour un fournisseur
router.put('/fournisseur/:id', fournisseurController.updateFournisseur);

// Route pour supprimer un fournisseur
router.delete('/fournisseur/:id', fournisseurController.deleteFournisseur);

module.exports = router;

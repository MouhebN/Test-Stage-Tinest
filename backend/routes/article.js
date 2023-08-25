const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');

// Créer un nouvel article
router.post('/createarticle', articleController.createArticle);

// Récupérer tous les articles
router.get('/liste', articleController.getAllArticles);

// Mettre à jour un article
router.put('/:id/modifier', articleController.updateArticle);

// Supprimer un article
router.delete('/:id/supprimer', articleController.deleteArticle);

module.exports = router;

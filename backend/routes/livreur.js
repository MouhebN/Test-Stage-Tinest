
const express = require('express');
const router = express.Router();
const livreurController = require('../Controllers/livreurController');

// Protected route (requires authentication)
router.get('/getLivreurColis',  livreurController.getLivreurColis);///

module.exports = router;

const  express = require ('express');
const livreurController = require("../Controllers/livreurController");
const router = express.Router();


router.get('/getLivreurColis' ,livreurController.getLivreurColis);




module.exports =router ;

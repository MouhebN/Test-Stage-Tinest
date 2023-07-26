const Stock = require('../models/Stock');

// Ajouter un stock
exports.ajouterStock = (req, res) => {
    const { colis, agence } = req.body;

    const stock = new Stock({
        colis,
        agence,
    });

    stock.save()
        .then((nouveauStock) => {
            res.status(200).json({ stock: nouveauStock });
        })
        .catch((erreur) => {
            res.status(400).json({ erreur });
        });
};

// Modifier un stock
exports.modifierStock = (req, res) => {
    const stockId = req.params.id;
    const modifications = req.body;

    Stock.findByIdAndUpdate(stockId, modifications)
        .then(() => {
            res.status(200).json({ message: 'Stock modifié avec succès' });
        })
        .catch((erreur) => {
            res.status(400).json({ erreur });
        });
};

// Supprimer un stock
exports.supprimerStock = (req, res) => {
    const stockId = req.params.id;

    Stock.findByIdAndDelete(stockId)
        .then(() => {
            res.status(200).json({ message: 'Stock supprimé avec succès' });
        })
        .catch((erreur) => {
            res.status(400).json({ erreur });
        });
};

// Obtenir tous les stocks
exports.listerStocks = (req, res) => {
    Stock.find()
        .then((stocks) => {
            res.status(200).json({ stocks });
        })
        .catch((erreur) => {
            res.status(400).json({ erreur });
        });

};

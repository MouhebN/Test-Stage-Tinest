const Stock = require('../Models/stock');
const livreurModel = require("../Models/livreur");
const colisModel = require("../Models/colis");


// Ajouter un stock
exports.ajouterStock = (req, res) => {
    const {colis, agence} = req.body;

    const stock = new Stock({
        colis,
        agence,
    });

    stock.save()
        .then((nouveauStock) => {
            res.status(200).json({stock: nouveauStock});
        })
        .catch((erreur) => {
            res.status(400).json({erreur});
        });
};

// Modifier un stock
exports.modifierStock = (req, res) => {
    const stockId = req.params.id;
    const modifications = req.body;

    Stock.findByIdAndUpdate(stockId, modifications)
        .then(() => {
            res.status(200).json({message: 'Stock modifié avec succès'});
        })
        .catch((erreur) => {
            res.status(400).json({erreur});
        });
};

// Supprimer un stock
exports.supprimerStock = (req, res) => {
    const stockId = req.params.id;

    Stock.findByIdAndDelete(stockId)
        .then(() => {
            res.status(200).json({message: 'Stock supprimé avec succès'});
        })
        .catch((erreur) => {
            res.status(400).json({erreur});
        });
};

// Obtenir tous les stocks
exports.listerStocks = (req, res) => {
    Stock.find()
        .then((stocks) => {
            res.status(200).json({stocks});
        })
        .catch((erreur) => {
            res.status(400).json({erreur});
        });

};


exports.getNumberColisEnStock = async (req, res) => {
    try {
        const magasinierId = "64b6ae1e51cf40fcab65ee2c";

        // Find the stock for the given magasinierId
        const stock = await Stock.findOne({agence: magasinierId});
        if (!stock) {
            return res.status(404).json({error: 'Stock not found for the connected magasinier'});
        }

        // Filter colis with status 'en stock'
        const colisEnStock = stock.colis.filter((colis) => colis.status === 'en stock');

        // Get the count of colis in stock.colis array
        const colisEnStockCount = colisEnStock.length;

        return res.status(200).json(colisEnStockCount);
    } catch (error) {
        console.error('Error getting colis data from stock:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}
exports.getNumberColisEnCours = async (req, res) => {
    try {
        const magasinierId = "64b6ae1e51cf40fcab65ee2c";

        // Find the stock for the given magasinierId
        const stock = await Stock.findOne({agence: magasinierId});
        if (!stock) {
            return res.status(404).json({error: 'Stock not found for the connected magasinier'});
        }

        // Filter colis with status 'en stock'
        const colisEnStock = stock.colis.filter((colis) => colis.status === 'en cours');

        // Get the count of colis in stock.colis array
        const colisEnStockCount = colisEnStock.length;

        return res.status(200).json(colisEnStockCount);
    } catch (error) {
        console.error('Error getting colis data from stock:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}
exports.getNumberColisEnRetour = async (req, res) => {
    try {
        const magasinierId = "64b6ae1e51cf40fcab65ee2c";

        // Find the stock for the given magasinierId
        const stock = await Stock.findOne({agence: magasinierId});
        if (!stock) {
            return res.status(404).json({error: 'Stock not found for the connected magasinier'});
        }

        // Filter colis with status 'en stock'
        const colisEnStock = stock.colis.filter((colis) => colis.status === 'retour en stock');

        // Get the count of colis in stock.colis array
        const colisEnStockCount = colisEnStock.length;

        return res.status(200).json(colisEnStockCount);
    } catch (error) {
        console.error('Error getting colis data from stock:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}
exports.payementColis = async (req, res) => {
    const livreurId = "64ba84927fd16fd12cf724c7";
    const colisId = req.body._id;
    try {
        // Find the delivery person (livreur) based on the provided livreurId
        const livreur = await livreurModel.findById(livreurId);
        if (!livreur) {
            return res.status(404).json({error: 'Livreur not found'});
        }
        // Find the agency (agence) associated with the livreur
        const agenceId = livreur.agence;
        const stock = await Stock.findOne({agence: agenceId});
        console.log("agenceId:", agenceId);

        if (!stock) {
            return res.status(404).json({error: 'Stock not found for the connected agency'});
        }

        // Find the index of the colis in the stock.colis array
        const colisIndex = stock.colis.findIndex((colis) => colis._id.toString() === colisId);
        console.log("colisId:", colisId);
        console.log("colisIndex:", colisIndex);

        if (colisIndex === -1) {
            return res.status(400).json({error: 'Colis not found in the stock'});
        }

        // Update the status of the colis in the stock.colis array
        stock.colis[colisIndex].status = 'payé';

        // Save the changes to the stock
        await stock.save();

        // Update the status of the existing colis document in the colis collection
        await colisModel.findByIdAndUpdate(colisId, {status: 'payé'});

        // Remove the colis from the livreur's colis array
        livreur.colis = livreur.colis.filter((colis) => colis._id.toString() !== colisId);

        // Save the changes to the livreur
        await livreur.save();
        return res.status(200).json({message: 'Colis payé '});
    } catch (error) {
        console.error('Error updating colis status:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};
exports.retourAuFournisseur = async (req, res) => {
    const livreurId = "64ba84927fd16fd12cf724c7";
    const colisId = req.body._id;
    try {
        // Find the delivery person (livreur) based on the provided livreurId
        const livreur = await livreurModel.findById(livreurId);
        if (!livreur) {
            return res.status(404).json({error: 'Livreur not found'});
        }
        // Find the agency (agence) associated with the livreur
        const agenceId = livreur.agence;
        const stock = await Stock.findOne({agence: agenceId});
        console.log("agenceId:", agenceId);

        if (!stock) {
            return res.status(404).json({error: 'Stock not found for the connected livreur'});
        }
        // Find the index of the colis in the stock.colis array
        const colisIndex = stock.colis.findIndex((colis) => colis._id.toString() === colisId);
        console.log("colisId:", colisId);
        console.log("colisIndex:", colisIndex);

        if (colisIndex === -1) {
            return res.status(400).json({error: 'Colis not found in the stock'});
        }

        // Update the status of the colis in the stock.colis array
        stock.colis[colisIndex].status = 'retour au fournisseur';

        // Save the changes to the stock
        await stock.save();

        // Update the status of the existing colis document in the colis collection
        await colisModel.findByIdAndUpdate(colisId, {status: 'retour au fournisseur'});


        livreur.colis = livreur.colis.filter((colis) => colis._id.toString() !== colisId);

        // Save the changes to the livreur
        await livreur.save();

        return res.status(200).json({message: 'Colis en retour au fournisseur '});
    } catch (error) {
        console.error('Error Colis en retour au fournisseur:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};
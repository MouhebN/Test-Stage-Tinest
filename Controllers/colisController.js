const colisModel = require('../Models/colis');
const Agence = require('../Models/agence');
const Magasinier = require('../Models/magasinier');
const livreurModel = require('../Models/livreur');
const Stock = require('../Models/stock');


exports.ajouterColis = (req, res) => {
    const colisObj = {
        fournisseur: req.body.fournisseur,
        destination: req.body.destination,
        num_client: req.body.num_client,
        qr_code: req.body.qr_code,
        livreur: req.body.livreur,
        status: req.body.status,
        date_creation: req.body.date_creation,
        prix: req.body.prix,
        typeDePayment: req.body.typeDePayment,
        largeur: req.body.largeur,
        hauteur: req.body.hauteur,
        typeColis: req.body.typeColis
    };

    const colis = new colisModel(colisObj);

    colis.save()
        .then(createdColis => {
            res.status(200).json({createdColis});
        })
        .catch(error => {
            res.status(400).json({error});
        });
};

exports.modifierColis = (req, res) => {
    const colisId = req.params.id;
    const modifiedColis = {
        fournisseur: req.body.fournisseur,
        destination: req.body.destination,
        num_client: req.body.num_client,
        qr_code: req.body.qr_code,
        livreur: req.body.livreur,
        status: req.body.status,
        date_creation: req.body.date_creation,
        prix: req.body.prix,
        typeDePayment: req.body.typeDePayment,
        largeur: req.body.largeur,
        hauteur: req.body.hauteur,
        typeColis: req.body.typeColis
    };

    colisModel.findByIdAndUpdate(colisId, modifiedColis)
        .then(updatedColis => {
            res.status(200).json({message: 'Colis modifié avec succès'});
        })
        .catch(error => {
            res.status(400).json({error});
        });
};

exports.supprimerColis = (req, res) => {
    const colisId = req.params.id;
    colisModel.findByIdAndDelete(colisId)
        .then(deletedColis => {
            res.status(200).json({message: 'Colis supprimé avec succès'});
        })
        .catch(error => {
            res.status(400).json({error});
        });
};

exports.listerColis = (req, res) => {
    colisModel.find({})
        .then(colisList => {
            res.status(200).json({colisList});
        })
        .catch(error => {
            res.status(400).json({error});
        });
};


exports.listerLivreurAgence = (req, res) => {
    const magasinierId = req.params.id; // Get the magasinier ID from the URL parameter

    // Find the magasinier using the magasinierId
    Magasinier.findById(magasinierId)
        .then((magasinier) => {
            if (!magasinier) {
                return res.status(404).json({error: 'Magasinier not found'});
            }
            const agenceId = magasinier.agence; // Get the ID of the agence to which the magasinier belongs
            // Use the agenceId to filter the livreurs
            livreurModel.find({agence: agenceId})
                .then((livreurList) => {
                    res.status(200).json({livreurList});
                })
                .catch((error) => {
                    res.status(400).json({error});
                });
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};
exports.ajouterColisAuStock = async (req, res) => {
    const magasinierAgenceId = "64b6ae1e51cf40fcab65ee2c"; // Assuming you have the magasinier's agence ID

    try {
        // Find the stock using the agence ID
        const stock = await Stock.findOne({agence: magasinierAgenceId});

        if (!stock) {
            return res.status(404).json({error: 'Stock not found'});
        }

        const {
            id,
            fournisseur,
            destination,
            num_client,
            date_creation,
            prix,
            typeDePayment,
            largeur,
            hauteur,
            typeColis
        } = req.body;

        // Check if a colis with the same _id already exists in the stock
        const existingColis = stock.colis.find((colis) => colis._id.toString() === id);

        if (existingColis) {
            return res.status(400).json({error: 'Colis already exists in the stock'});
        }

        const newColis = {
            _id: id,
            fournisseur,
            destination,
            num_client,
            status: 'en stock',
            date_creation,
            prix,
            typeDePayment,
            largeur,
            hauteur,
            typeColis,
        };

        // Add the new colis to the stock
        stock.colis.push(newColis);

        // Save the updated stock
        const updatedStock = await stock.save();
        res.status(200).json({message: 'Colis ajouté au stock avec succès', updatedStock});
    } catch (error) {
        res.status(400).json({error});
    }
};
exports.attribuerColisAuLivreur = async (req, res) => {
    console.log(req.body);
    try {
        console.log('Start function attribuerColisAuLivreur');
        // Step 1: Verify the existence of the selected livreur.
        const {livreurId, id} = req.body;
        console.log('livreurId:', livreurId);
        console.log('colisId:', id);

        const livreur = await livreurModel.findById(livreurId);

        // Step 2: Find the colis with the provided ID in the stock's colis array.
        const stock = await Stock.findOne({agence: livreur.agence});

        // Verify that the colis exists in the stock's colis array
        const colisIndex = stock.colis.findIndex((item) => item._id.toString() === id);
        if (colisIndex === -1) {
            console.log('Colis not found in the stock');
            return res.status(404).json({error: 'Colis not found in the stock'});
        }

        const colis = stock.colis[colisIndex];

        // Check if the colis already has a livreur assigned to it
        if (livreur.colis.includes(id)) {
            console.log('Colis already has a livreur assigned');
            return res.status(400).json({error: 'Colis already has a livreur assigned'});
        }

        // Step 3: Check if the colis is already present in any livreur's colis array.
        const existingLivreur = await livreurModel.findOne({colis: {$elemMatch: {_id: id}}});
        if (existingLivreur) {
            console.log('Colis is already assigned to a livreur');
            return res.status(400).json({error: 'Colis is already assigned to a livreur'});
        }

        // Step 4: Update the colis with the livreur's details and change the status to "en cours".
        colis.livreur = livreurId;
        colis.status = 'en cours';
        await colis.save();

        // Step 5: Add the colis to the livreur's colis array.
        livreur.colis.push(colis);
        await livreur.save();

        // Step 6: Update the status of the colis in the stock collection.
        stock.colis[colisIndex] = colis; // Update the colis in stock.colis array
        await stock.save();

        console.log('Colis attributed to livreur successfully');
        res.status(200).json({message: 'Colis attributed to livreur successfully'});
    } catch (error) {
        console.error('Error attribuerColisAuLivreur:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};
exports.retourColisAuStock = async (req, res) => {
    try {
        const {id} = req.body;
        console.log("id colis = ", id);

        // Find the stock for the given magasinierId
        const magasinierId = "64b6ae1e51cf40fcab65ee2c"; // Replace this with the actual magasinierId
        const stock = await Stock.findOne({agence: magasinierId});

        if (!stock) {
            return res.status(404).json({error: 'Stock not found'});
        }

        // Find the colis in the stock's colis array
        const colisIndex = stock.colis.findIndex((colis) => colis._id.toString() === id);

        if (colisIndex === -1) {
            return res.status(404).json({error: 'Colis not found in the stock'});
        }

        // Get the colis from the stock's colis array
        const colis = stock.colis[colisIndex];
        console.log("status : ", colis.status);
        // Update the colis status based on the current status

        colis.set({status: 'retour en stock'});
        colis.retourCount += 1;

        console.log("updated status  : ", colis.status);
        // Save the updated stock
        await stock.save();
        if (colis.livreur) {
            const livreur = await livreurModel.findById(colis.livreur);
            if (livreur) {
                livreur.colis = livreur.colis.filter((colisId) => colisId.toString() !== id);
                await livreur.save();
                console.log('colis removed from livreur ');
            }
        }
        return res.status(200).json({message: 'Colis status updated successfully', updatedColis: colis});
    } catch (error) {
        console.error('Error in retourColisAuStock:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};

exports.getAllColisFromStock = async (req, res) => {
    try {
        const magasinierId = "64b6ae1e51cf40fcab65ee2c";
        // Find the stock for the given magasinierId
        const stock = await Stock.findOne({agence: magasinierId});
        if (!stock) {
            return res.status(404).json({error: 'Stock not found for the connected magasinier'});
        }
        return res.status(200).json(stock.colis);
    } catch (error) {
        console.error('Error getting colis data from stock:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};
exports.getLivreur = async (req, res) => {
    try {
        const {id} = req.params;
        // Find the livreur in the database by its ID
        const livreur = await livreurModel.findById(id);
        if (!livreur) {
            return res.status(404).json({error: 'Livreur not found'});
        }
        // Return the livreur data
        return res.status(200).json(livreur);
    } catch (error) {
        console.error('Error in getLivreur:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};
exports.getMultipleLivreur = async (req, res) => {
    console.log("start get multiple Livreur");
    try {
        const {ids} = req.query;
        console.log("ids", ids);
        // Find multiple livreurs in the database based on their IDs
        const livreurs = await livreurModel.find({_id: {$in: ids}});
        console.log("livreurs", livreurs);
        // Return the livreurs data
        return res.status(200).json(livreurs);
    } catch (error) {
        console.error('Error in getMultipleLivreur:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};
exports.getAllColisEnStock = async (req, res) => {
    try {
        const magasinierId = "64b6ae1e51cf40fcab65ee2c";
        // Find the stock for the given magasinierId
        const stock = await Stock.findOne({agence: magasinierId});
        if (!stock) {
            return res.status(404).json({error: 'Stock not found for the connected magasinier'});
        }
        // Filter colis to get those with status 'en stock'
        const colisEnStock = stock.colis.filter((colis) => colis.status === 'en stock');
        return res.status(200).json(colisEnStock);
    } catch (error) {
        console.error('Error getting colis data from stock:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
};


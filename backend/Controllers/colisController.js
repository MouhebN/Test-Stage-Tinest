const Colis = require('../Models/colis'); // Assurez-vous que le chemin est correct
const colisModel = require('../Models/colis'); // Assurez-vous que le chemin est correct
const qrCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

// Obtenir tous les colis
exports.getAllColis = async (req, res) => {
  try {
    const colis = await Colis.find();
    res.json(colis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtenir un colis par son ID
exports.getColisById = async (req, res) => {
  try {
    const colis = await Colis.findById(req.params.id);
    if (colis) {
      res.json(colis);
    } else {
      res.status(404).json({ message: 'Colis non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const generateQRCode = async (data) => {
  try {
    const qrCodeImage = await qrCode.toDataURL(data);
    return qrCodeImage;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

exports.createColis = (req, res) => {
  const colisObj = {
      fournisseur: req.body.fournisseur,
      destination: req.body.destination,
      num_client: req.body.num_client,
      nomClient: req.body.nomClient,
      prenomClient: req.body.prenomClient,
      livreur: req.body.livreur,
      status: req.body.status,
      date_creation: Date.now(),
      prix: req.body.prix,
      typeDePayment: req.body.typeDePayment,
      largeur: req.body.largeur,
      hauteur: req.body.hauteur,
      typeColis: req.body.typeColis,
      nomArticle: req.body.nomArticle
  };

  const colis = new colisModel(colisObj);

  colis.save()
      .then(createdColis => {
          res.status(200).json({message: 'Colis crée avec succès'});
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
    nomClient: req.body.nomClient,
    prenomClient: req.body.prenomClient,
    livreur: req.body.livreur,
    status: req.body.status,
    date_creation: req.body.date_creation,
    prix: req.body.prix,
    typeDePayment: req.body.typeDePayment,
    largeur: req.body.largeur,
    hauteur: req.body.hauteur,
    typeColis: req.body.typeColis,
  };

  colisModel
    .findByIdAndUpdate(colisId, modifiedColis) // Utilisez colisModel au lieu de Colis
    .then(updatedColis => {
      res.status(200).json({ message: 'Colis modifié avec succès' });
    })
    .catch(error => {
      res.status(400).json({ error });
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

exports.rechercherColis = async (req, res) => {
  const { q } = req.query;
  try {
    const resultatRecherche = await Colis.find({
      $or: [
        { nomprenom: { $regex: q, $options: 'i' } },
        { nomArticle: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(resultatRecherche);
  } catch (error) {
    console.error('Erreur lors de la recherche de colis : ', error);
    res.status(500).json({ message: 'Erreur lors de la recherche de colis' });
  }
};

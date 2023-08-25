const fournisseurModel = require('../Models/fournisseur'); // Import du modèle Fournisseur

// Méthode pour créer un nouveau fournisseur
exports.createFournisseur = async (req, res) => {
  try {
    const fournisseur = new fournisseur(req.body);
    const nouveauFournisseur = await fournisseur.save();
    res.status(201).json(nouveauFournisseur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Méthode pour obtenir tous les fournisseurs
exports.getFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Méthode pour obtenir un fournisseur par son ID
exports.getFournisseurById = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) {
      return res.status(404).json({ message: 'Fournisseur non trouvé' });
    }
    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Méthode pour mettre à jour un fournisseur
exports.updateFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fournisseur) {
      return res.status(404).json({ message: 'Fournisseur non trouvé' });
    }
    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Méthode pour supprimer un fournisseur
exports.deleteFournisseur = async (req, res) => {
  try {
    const fournisseur = await fournisseurModel.findByIdAndDelete(req.params.id);
    if (!fournisseur) {
      return res.status(404).json({ message: 'Fournisseur non trouvé' });
    }
    res.json({ message: 'Fournisseur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

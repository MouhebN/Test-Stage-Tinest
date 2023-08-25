const Facture = require('../Models/facture');

const genererFacture = async (req, res) => {
  try {
    const { colisId } = req.body;

    // Obtenez les détails du colis à partir de la base de données en utilisant colisId
    const colis = await Colis.findById(colisId);

    // Créez votre facture en utilisant les données du colis
    const facture = {
      log: colis.log,
      qrCode: colis.qrCode,
      nomClient: colis.client.nom,
      quantite: colis.quantite,
      // ... Autres données nécessaires pour la facture ...
    };

    // Enregistrez la facture dans la base de données
    const nouvelleFacture = new Facture(facture);
    await nouvelleFacture.save();

    res.json({ message: 'Facture générée et enregistrée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la génération de la facture.' });
  }
};

module.exports = { genererFacture };

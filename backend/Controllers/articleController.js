const Article = require('../Models/article');

// Créer un nouvel article
exports.createArticle = async (req, res) => {
  try {
    const { designation, quantite, prixUnitaireHT } = req.body;
    const newArticle = new Article({
      designation,
      quantite,
      prixUnitaireHT,
    });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'article', error });
  }
};

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des articles', error });
  }
};

// Mettre à jour un article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { designation, quantite, prixUnitaireHT } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { designation, quantite, prixUnitaireHT },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article', error });
  }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndRemove(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'article', error });
  }
};

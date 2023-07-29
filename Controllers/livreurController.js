const livreurModel = require('../Models/livreur');


exports.getLivreurColis = async (req, res) => {
    const livreurId = "64ba84927fd16fd12cf724c7"; // Replace with the actual Livreur _id

    try {
        const livreur = await livreurModel.findOne({ _id: livreurId }).select('colis');
        if (!livreur) {
            return res.status(404).json({ error: 'Livreur not found' });
        }

        // Extract the required colis information from the livreur's colis array
        const colisInfo = livreur.colis.map(colis => ({
            id: colis._id.toString(),
            destination: colis.destination,
            num_client: colis.num_client,
            date_creation: colis.date_creation,
            status: colis.status,
            retourCount:colis.retourCount
        }));

        return res.status(200).json(colisInfo);

    } catch (error) {
        console.error('Error fetching livreur data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


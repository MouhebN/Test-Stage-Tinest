const mongoose = require('mongoose');


const livreurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    matricule_voiture: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        required: false
    },
    agence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agence',
        required: true
    }, colis: [
        {
            destination: {
                type: String,
                required: true
            },
            num_client: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                enum: ['en attente', 'en stock', 'en cours','retour en stock','payé','en pickup',
                    'annulé','retour au fournisseur'],
                required: true
            },
            retourCount: {
                type: Number,
                default: 0
            },
            date_creation: {
                type: Date,
                required: true
            },
            prix: {
                type: Number,
                required: true
            },
            typeDePayment: {
                type: String,
                required: false
            },
            largeur: {
                type: Number,
                required: false
            },
            hauteur: {
                type: Number,
                required: false
            },
            typeColis: {
                type: String,
                required: false
            }
        }
    ],
})
module.exports = mongoose.model('livreurs', livreurSchema);
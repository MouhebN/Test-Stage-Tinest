const mongoose = require('mongoose');
const Agence = require('./agence');
const Livreur = require('./livreur');

const stockSchema = new mongoose.Schema({
    colis: [
        {
            fournisseur: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Fournisseur',
                required: true
            },
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
                    'annulé'],
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
            },livreur : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Livreur',
                required: false
            }
        }
    ],
    agence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agences',
        required: true
    }
});

module.exports = mongoose.model('Stocks', stockSchema);
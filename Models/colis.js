const mongoose = require('mongoose');
const Fournisseur = require('./fournisseur');
const Livreur = require('./livreur');
const colisSchema = new mongoose.Schema(
    {
        fournisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fournisseur',
            required: false
        },
        destination: {
            type: String,
            required: true
        },
        num_client: {
            type: Number,
            required: true
        },
        qr_code: {
            type: String,
            required: false
        },
        livreur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Livreur',
            required: false
        },
        status: {
            type: String,
            enum: ['en attente', 'en stock', 'en cours','retour en stock','payé','en pickup',
                'annulé'],
            required: false
        },
        retourCount: {
            type: Number,
            default: 0
        },
        date_creation:
            {
                type: Date,
                required: true
            },
        prix:
            {
                type: Number,
                required: true
            },
        typeDePayment:
            {
                type: String,
                required: false
            },
        largeur:
            {
                type: Number,
                required: false
            },
        hauteur:
            {
                type: Number,
                required: false
            },
        typeColis:
            {
                type: String,
                required: false
            }
    }
)

module.exports = mongoose.model('colis', colisSchema);

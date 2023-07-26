const mongoose = require('mongoose');
const Agence = require('./agence');
const Colis = require('./colis');

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
    },colis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colis'
    }],
})
module.exports = mongoose.model('livreurs', livreurSchema);
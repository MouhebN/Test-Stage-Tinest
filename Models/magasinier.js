const mongoose = require('mongoose');


const magasinierSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    agence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agence',
        required: true
    },
    telephone: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('magasiniers', magasinierSchema);
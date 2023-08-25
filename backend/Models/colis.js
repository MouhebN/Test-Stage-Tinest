const mongoose = require('mongoose');
const colisSchema = new mongoose.Schema(
    {
         fournisseur: {
             type: mongoose.Schema.Types.ObjectId,
            ref: 'Fournisseur',
            required: false
        },
        nomClient:{
            type: String,
            required: true
        },
        prenomClient:{
            type: String,
            required: true
        },

        destination: {
            type: String,
            required: false
        },
        adresse:{

            type:String,
            required: false
        },
        num_client: {
            type: Number,
            required: true
        },
        
        livreur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Livreur',
            required: false
        },

        status: {
            type: String,
            enum: ['En attente', 'En stock', 'En cours','Retour en stock','Retour définitif', 'Livrés' ,'Livrés payés','Pickup',
                'annulé','Echange crée','Echange livré'],
            required: false
        },

        retourCount: {
            type: Number,
            default: 0
        },
        date_creation:
            {
                type: Date,
                required: false
            },
        prix:
            {
                type: Number,
                required: false
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
            },
        fragile:
        {
            type: String,
             required: false
        }   ,
       
        nomArticle:{
            type: String,
            required: false
        },

        livreurPickup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Livreur',
            required: false
        },   

        agence: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Agence',
            required: false
        }
    }
)

module.exports = mongoose.model('colis', colisSchema);
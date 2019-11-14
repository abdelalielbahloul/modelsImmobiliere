const mongoose = require('mongoose');

const nosBienSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    situation: {
        type: String,
        required: true
    },
    nbrChambre: {
        type: Number,
        required: true
    },
    nbrSDB: {
        type: Number,
        required: true
    },
    nbrDouche: {
        type: Number,
        required: true
    },
    nbrWC: {
        type: Number,
        required: true
    },
    nbrSalonSejour: {
        type: Number,
        required: true
    },
    meublee: {
        type: Boolean,
        required: true
    },
    equipement: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // index: true,
        // unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        // required: true
    },
    prix: {
        type: Number,
        required: true
    },
    corpo:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    typeBienId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeBien',
        required: true
    },
    superficieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Superficie',
        required: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    }

});

module.exports = mongoose.model('NosBien', nosBienSchema);
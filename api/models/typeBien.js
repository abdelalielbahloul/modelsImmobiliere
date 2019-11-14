const mongoose = require('mongoose');

const typeBienScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    typeImob: { 
        type:String, required: true
    }
});

module.exports = mongoose.model('TypeBien', typeBienScheme);
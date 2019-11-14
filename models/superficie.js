const mongoose = require('mongoose');

const superficieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    intitule: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Superficie', superficieSchema);
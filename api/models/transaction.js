const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    typeLocation: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Transaction', transactionSchema);
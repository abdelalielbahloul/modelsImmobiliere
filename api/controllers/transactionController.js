const Transaction = require('../models/transaction');
const mongoose = require('mongoose');

exports.index = async (req, res) => {
    await Transaction.find()
        .select('_id typeLocation')
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.create = async (req, res) => {
    const transaction = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        typeLocation: req.body.typeLocation
    });
    await transaction.save()
        .then( result => {
            res.status(201).json({
                message: "Transaction was created",
                transactionCreated: {
                    _id: result._id,
                    typeLocation: result.typeLocation
                }
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.show = async (req, res) => {
    const id = req.params.id;
    await Transaction.findOne({ _id: id })
        .select('_id typeLocation')
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.update = async (req, res) => {
    const id = req.params.id;
    if( !req.body.typeLocation ){
        res.status(500).json({
            error: "Can't update"
        })
        res.end();
        return
    }
    const updatedTransaction = new Transaction({
        typeLocation: req.body.typeLocation
    });
    await Transaction.updateOne({ _id: id }, { $set: updatedTransaction })
        .exec()
        .then( result => {
            console.log(result);
            
            res.status(201).json({
                message: "Transaction was updated"
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.edit = async (req, res) => {
    const id = req.params.id;
    if( !req.body.typeLocation ){
        res.status(500).json({
            error: "Can't edit"
        })
        res.end();
        return
    }
    const updatedfield = req.body;
    await Transaction.updateOne({ _id: id }, { $set: updatedfield })
        .exec()
        .then( result => {
            res.status(201).json({
                message: "Transaction was updated"
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await Transaction.deleteOne({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: "Transaction was deleted"
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}
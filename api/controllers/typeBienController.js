const TypeBien = require('../models/typeBien');
const mongoose = require('mongoose');

exports.index = async (req, res) => {
    await TypeBien.find()
        .select('_id typeImob')
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
    const typeBien = new TypeBien({
        _id: new mongoose.Types.ObjectId(),
        typeImob: req.body.typeImob
    });
    await typeBien.save()
        .then( result => {
            res.status(201).json({
                message: "TypeBien was created",
                typeBienCreated: {
                    _id: result._id,
                    typeImob: result.typeImob
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
    await TypeBien.findOne({ _id: id })
        .select('_id typeImob')
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
    if( !req.body.typeImob ){
        res.status(500).json({
            error: "Can't update"
        })
        res.end();
        return
    }
    const updatedTypeBien = new TypeBien({
        typeImob: req.body.typeImob
    });
    await TypeBien.updateOne({ _id: id }, { $set: updatedTypeBien })
        .exec()
        .then( result => {
            console.log(result);
            
            res.status(201).json({
                message: "TypeBien was updated"
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
    if( !req.body.typeImob ){
        res.status(500).json({
            error: "Can't edit"
        })
        res.end();
        return
    }
    const updatedfield = req.body;
    await TypeBien.updateOne({ _id: id }, { $set: updatedfield })
        .exec()
        .then( result => {
            res.status(201).json({
                message: "TypeBien was updated"
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
    await TypeBien.deleteOne({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: "TypeBien was deleted"
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}
const Superficie = require('../models/superficie');
const mongoose = require('mongoose');

exports.index = async (req, res) => {
    await Superficie.find()
        .select('_id intitule')
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
    if( !req.body.intitule ){
        res.sendStatus(400)
        res.end();
        return
    }
    const superficie = new Superficie({
        _id: new mongoose.Types.ObjectId(),
        intitule: req.body.intitule
    });
    await superficie.save()
        .then( result => {
            res.status(201).json({
                message: "Superficie was created",
                superficieCreated: {
                    _id: result._id,
                    intitule: result.intitule
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
    await Superficie.findOne({ _id: id })
        .select('_id intitule')
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
    if( !req.body.intitule ){
        res.sendStatus(400)
        res.end();
        return
    }
    const updatedSuperficie = new Superficie({
        intitule: req.body.intitule
    });
    await Superficie.updateOne({ _id: id }, { $set: updatedSuperficie })
        .exec()
        .then( result => {
            console.log(result);
            
            res.status(201).json({
                message: "Superficie was updated"
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
    if( !req.body.intitule ){
        res.sendStatus(400)
        res.end();
        return
    }
    const updatedfield = req.body;
    await Superficie.updateOne({ _id: id }, { $set: updatedfield })
        .exec()
        .then( result => {
            res.status(201).json({
                message: "Superficie was updated"
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
    await Superficie.deleteOne({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: "Superficie was deleted"
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })
}

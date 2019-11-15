const Contact = require('../models/contact');
const mongoose = require('mongoose');

exports.index = async (req, res) => {
     await Contact.find().select('_id firstName lastName email phone message').exec()
        .then( result => {
            // console.log(result);
            res.send(result);
            
        }).catch( err => {
            res.status(500).json({
                error: err
            });
            res.end();
            return
        })
}

exports.create = async (req, res) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });
    await contact.save()
        .then( result => {
            res.status(201).json({
                message: "Contact was created",
                createdContact: {
                    _id: result._id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    phone: result.phone,
                    message: result.message
                }
            })
        }).catch( err => {
            res.status(500).json({
                error: err
            })
            res.end();
            return
        })
    
}

exports.show = async (req, res) => {
    const id = req.params.id;
    await Contact.findOne({ _id: id }).select('_id firstName lastName email phone message').exec()
    .then( result => {
        // console.log(result);
        res.send(result);
        
    }).catch( err => {
        res.status(500).json({
            error: err
        });
        res.end();
        return
    })
}

exports.update = async (req, res) => {
    const id = req.params.id;
    if( !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone ){
        res.status(500).json({
            error: "Can't update"
        })
        res.end();
        return
    }
    const updatedContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });
    await Contact.updateOne({ _id: id }, { $set: updatedContact })
        .exec()
        .then( result => {
            res.status(201).json({
                message: "Contact was updated",
                updatedContact: {
                    _id: result._id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    phone: result.phone,
                    message: result.message
                }
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
            res.end();
            return
        })
    
}

exports.edit = async (req, res) => {
    const id = req.params.id;
    if( !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone ){
        res.status(500).json({
            error: "Can't edit"
        })
        res.end();
        return
    }
    const updatedField = req.body;
    await Contact.updateOne({ _id: id }, { $set: updatedField })
        .exec()
        .then( result => {
            res.status(201).json({
                message: "Contact was updated"
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
            res.end();
            return
        })
    
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id })
        .exec()
        .then( result => {
            res.status(201).json({
                message: "Contact was deleted"
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
            res.end();
            return
        })
    
}
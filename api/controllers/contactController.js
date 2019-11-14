const Contact = require('../models/contact');
const mongoose = require('mongoose');

exports.index = async (req, res) => {
     await Contact.find().select('_id firstName lastName email phone message').exec()
        .then( result => {
            console.log(result);
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

exports.show = (req, res) => {
    
}

exports.update = (req, res) => {
    
}

exports.edit = (req, res) => {
    
}

exports.delete = (req, res) => {
    
}
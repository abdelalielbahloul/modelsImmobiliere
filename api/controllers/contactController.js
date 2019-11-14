const Contact = require('../models/contact');
const mongoose = require('mongoose');

exports.index = (req, res, next) => {
    try {
        Contact.find().select('_id firstName lastName email phone message').exec()
        .then( result => {
            console.log(result);
            res.status(200).json({
                msg: "jqsdjkqsjk"
            })
            
        }).catch( err => {
            res.status(500).json({
                error: err
            });
            res.end();
            return
        })
    } catch (error) {
        res.json(error)
    }
    next();
}

exports.create = (req, res, next) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });
    contact.save()
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

exports.show = (req, res, next) => {
    
}

exports.update = (req, res, next) => {
    
}

exports.edit = (req, res, next) => {
    
}

exports.delete = (req, res, next) => {
    
}
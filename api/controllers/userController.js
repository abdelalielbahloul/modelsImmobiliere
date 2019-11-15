const User = require('../models/user');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

exports.login = (req, res) => {
    User.findOne({ email : req.body.email })
    .exec()
    .then( user => {
        if(user.length < 1){
            res.sendStatus(401)
        }
        bcryptjs.compare(req.body.password, user[0].password, (er, result) => {
            if(er){
                return res.sendStatus(401)
            }
            if(result){
                return res.status(200).json({
                    message: 'Auth successful !'
                })
            }
            return res.sendStatus(401)
        })
    })
    .catch( err => {
        console.log(err);
        res.sendStatus(401)
    });
}

exports.register = (req, res) => {

    if(!req.body.userName || !req.body.email || !req.body.password ){
        res.sendStatus(400);
        res.end();
        return
    }

    bcryptjs.hash( req.body.password, 10, (err, hash) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            userName: req.body.userName,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then( result => {
                res.sendStatus(201);
            })
            .catch(err => {
                res.sendStatus(500)
            })
    })
    
}
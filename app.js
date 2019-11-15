require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// importer les routes
const contactRoute = require('./api/routes/contactRoute');
const superficieRoute = require('./api/routes/superficieRoute');
const transactionRoute = require('./api/routes/transactionRoute');



//connection to mongoDB
mongoose.set('useNewUrlParser', true);
const opts = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect(process.env.DATABASE, opts)
    .catch( error => {
        console.log(error);
        
    });
mongoose.Promise = global.Promise;


//middlewares 
app.use(morgan('dev')); //afficher l'etats des requetes dans le console en dev
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Headers
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, PATCH, POST');
        return res.status(200).json({});
    }

    next();
});

// les routes disponibles
app.use('/contacts', contactRoute);
app.use('/superficies', superficieRoute);
app.use('/transactions', transactionRoute)


// handel errors
app.use( (req, res, next) => {
    const err = new Error('404 - Not Found!');

    res.status = 404;
    next(err)
});
app.use( (err, req, res, next) => {

    res.status = err.status || 500;
    res.sendStatus(res.status);
    res.end();
    return
});


module.exports = app;
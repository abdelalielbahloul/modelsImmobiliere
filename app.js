require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const nosBienRoute = require('./routes/nosBienRoute');
const contact = require('./routes/contacts');
const proposition = require('./routes/propositions');
const superficie = require('./routes/superficies');
const transaction = require('./routes/transactions');
const typeBien = require('./routes/typeBiens');
const user = require('./routes/users');



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

//configuration de server
app.use(morgan('dev')); //afficher l'etats des requetes dans le console
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/nosBiens', nosBien)


module.exports = app;
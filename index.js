/*jshint esversion: 6 */
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
require('./initialize/routes')(app);

winston.handleExceptions(
  new winston.transports.File({filename: 'uncaughtExceptions.log'})
);

process.on('unhandledRejection', error => {
  throw error;
});

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/jackclinic', level: 'warn'});
 
if (!config.get('authJWTPrivateKey')) {
  console.error('FATAL ERROR: authJWTPrivateKey not set');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/jackclinic')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
/*jshint esversion: 6 */
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const express = require('express');
const app = express();
require('./initialize/routes')(app);
require('./initialize/db')();

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

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
/*jshint esversion: 6 */
const winston = require('winston');
require('winston-mongodb');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const specializations = require('./routes/specializations');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const healthServices = require('./routes/healthServices');
const config = require('config');
const auth = require('./routes/auth');
const login = require('./routes/login');
const error = require('./middleware/error');
const cors = require('cors');
const express = require('express');
const app = express();

winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/jackclinic', level: 'warn'});

if (!config.get('authJWTPrivateKey')) {
  console.error('FATAL ERROR: authJWTPrivateKey not set');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/jackclinic')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(cors());
app.use('/api/specializations', specializations);
app.use('/api/doctors', doctors);
app.use('/api/patients', patients);
app.use('/api/healthservices', healthServices);
app.use('/api/auth', auth);
app.use('/api/login', login);

app.use(error);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
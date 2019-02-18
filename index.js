/*jshint esversion: 6 */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const specializations = require('./routes/specializations');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const healthServices = require('./routes/healthServices');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/jackclinic')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/specializations', specializations);
app.use('/api/doctors', doctors);
app.use('/api/patients', patients);
app.use('/api/healthservices', healthServices);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
/*jshint esversion: 6 */
const mongoose = require('mongoose');
const specializations = require('./routes/specializations');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/jackclinic')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/specializations', specializations);
app.use('/api/doctors', doctors);
app.use('/api/patients', patients);;

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
/*jshint esversion: 6 */
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = async () => {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect('mongodb://localhost/jackclinic', { useNewUrlParser: true });
    winston.info('Connected to MongoDB . . .');
}


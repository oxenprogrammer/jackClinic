/*jshint esversion: 6 */
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect('mongodb://localhost/jackclinic');
    winston.info('Connected to MongoDB . . .');
}


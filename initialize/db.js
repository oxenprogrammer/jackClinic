/*jshint esversion: 6 */
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
    const db = config.get('db');
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(db, { useNewUrlParser: true });
    winston.info(`Connected to ${db} . . .`);
}


/*jshint esversion: 6 */
const winston = require('winston');
require('winston-mongodb');

module.exports = () => {
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
    );
      
    process.on('unhandledRejection', error => {
    throw error;
    });
      
    winston.add(winston.transports.File, {filename: 'logfile.log'});
    winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/jackclinic', level: 'warn'});
}
/*jshint esversion: 6 */
const winston = require('winston');

module.exports = function(err, req, res, next){
    winston.error(err.message, err);
    res.status(500).send({'message': 'something went wrong', 'error': err.message});
}
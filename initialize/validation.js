/*jshint esversion: 6 */
const Joi = require('joi');

module.exports = () => {
    Joi.objectId = require('joi-objectid')(Joi);
};


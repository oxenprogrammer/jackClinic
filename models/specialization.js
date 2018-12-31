/*jshint esversion: 6 */
const Joi = require('joi');
const mongoose = require('mongoose');

const Specialization = mongoose.model('Specialization', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        enum: ['Allergist', 'Anesthesiologist', 'Cardiologist',
         'Neurologist', 'Pediatrician', 'Psychiatrist', 'Gynecologist?']
    }
}));

function validateSpecialization(specialization) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(specialization, schema);
}

exports.Specialization = Specialization;
exports.validate = validateSpecialization;

/*jshint esversion: 6 */
const Joi = require('joi');
const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        enum: ['Allergist', 'Anesthesiologist', 'Cardiologist', 'Nurse',
         'Neurologist', 'Pediatrician', 'Psychiatrist', 'Gynecologist', 'Paramedic']
    }
});

const Specialization = mongoose.model('Specialization', specSchema);

function validateSpecialization(specialization) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(specialization, schema);
}

exports.specSchema = specSchema;
exports.Specialization = Specialization;
exports.validate = validateSpecialization;

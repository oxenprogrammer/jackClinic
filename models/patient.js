/*jshint esversion: 6 */
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 80
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13,
        unique: true
    },
    location: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200
    },
    dob: {
        type: Date,
        required: true
    },
    registeredOn: {
        type: Date,
        default: Date.now
    }
});

patientSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, phone: this.phone}, config.get('authJWTPrivateKey'));
};

const Patient = mongoose.model('Patient', patientSchema);


function validatePatient(patient) {
    const schema = {
        name: Joi.string().min(5).max(80).required(),
        phone: Joi.string().min(10).max(13).required(),
        location: Joi.string().min(4).max(50).required(),
        dob: Joi.required(),
        password: Joi.string().min(6).max(200).required()
    };
    return Joi.validate(patient, schema);
}

exports.Patient = Patient;
exports.validate = validatePatient;
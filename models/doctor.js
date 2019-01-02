/*jshint esversion: 6 */
const Joi = require('Joi');
const mongoose = require('mongoose');
const { specSchema } = require('./specialization');

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    nin: {
        type: String,
        required: true,
        minlength: 14,
        maxlength: 14
    },
    dob: {
        type: Date,
        required: true
    },
    specialization: {
        type: specSchema,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    postalAddress: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    city: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200
    },
    priceRate: {
        type: Number,
        required: true
    },
    registeredOn: {
        type: Date,
        default: Date.now
    },
    isAvailable: {
        type: boolean,
        default: false
    },
    everHired: {
        type: boolean,
        default: false
    },
    isActive: {
        type: boolean,
        default: false
    }
}));

function validateDoctor(doctor) {
    const schema = {
        firstName: Joi.string().min(5).max(30).required(),
        lastName: Joi.string().min(5).max(30).required(),
        nin: Joi.string().min(14).max(14).required(),
        dob: Joi.required(),
        specializationId: Joi.objectId().required(),
        postalAddress: Joi.string().min(5).max(30).required(),
        city: Joi.string().min(4).max(50).required(),
        phone: Joi.string().min(10).max(13).required(),
        password: Joi.string().min(6).max(200).required()
    };
    return Joi.validate(doctor, schema);
}

exports.Doctor = Doctor;
exports.validate = validateDoctor;
/*jshint esversion: 6 */
const Joi = require('joi');
const mongoose = require('mongoose');

const HealthService = mongoose.model('HealthService', new mongoose.Schema({
    patient: {
        type: new mongoose.Schema({
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
                maxlength: 13
            },
            location: {
                type: String,
                required: true,
                minlength: 4,
                maxlength: 50
            },
            dob: {
                type: Date,
                required: true
            }
        }),
        required: true
    },
    doctor: {
        type: new mongoose.Schema({
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
            priceRate: {
                type: Number,
                required: true
            },
            isAvailable: {
                type: boolean,
                default: false
            },
            isActive: {
                type: boolean,
                default: false
            }
        }),
        required: true
    }
}));

function validateHealthService(healthService) {
    const schema = {
        patientId: Joi.objectId().required(),
        doctorId: Joi.objectId().required()
    };

    return Joi.validate(healthService, schema);
}

exports.HealthService = HealthService;
exports.validate = validateHealthService;
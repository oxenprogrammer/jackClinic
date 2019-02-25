/*jshint esversion: 6 */
const Joi = require('joi');
const mongoose = require('mongoose');
const { specSchema } = require('./specialization');
const jwt = require('jsonwebtoken');
const config = require('config');

const doctorSchema = new mongoose.Schema({
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
        type: Boolean,
        default: false
    },
    everHired: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
    // roles: {
    //     type: [
    //         {
    //             type: String,
    //             enum: ['DOCTOR', 'ADMIN']
    //         }
    //     ],
    //     default: ['DOCTOR']
    // }
})

doctorSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin, isActive: this.isActive}, config.get('authJWTPrivateKey'));
};

const Doctor = mongoose.model('Doctor', doctorSchema);

function validateDoctor(doctor) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        nin: Joi.string().min(14).max(14).required(),
        dob: Joi.required(),
        specializationId: Joi.objectId().required(),
        postalAddress: Joi.string().min(5).max(30).required(),
        city: Joi.string().min(4).max(50).required(),
        phone: Joi.string().min(10).max(13).required(),
        password: Joi.string().min(6).max(200).required(),
        priceRate: Joi.number().required()
    };
    return Joi.validate(doctor, schema);
}

exports.Doctor = Doctor;
exports.validate = validateDoctor;
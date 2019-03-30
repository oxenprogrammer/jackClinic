/*jshint esversion: 6 */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncMiddleware = require('../middleware/async');
const { Doctor } = require('../models/doctor');
const { Patient } = require('../models/patient');
const Joi = require('joi');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let doctor = await Doctor.findOne({phone: req.body.phone});
    let patient = await Patient.findOne({phone: req.body.phone});

    let validPassword;
    let token;

    if(doctor) { 
        validPassword = await bcrypt.compare(req.body.password, doctor.password);
        if (!validPassword) return res.status(400).send({'message': `Invalid phone or password`});
        token = doctor.generateAuthToken();
        res.header('x-auth-token', token).send({access_token: token, username: doctor.fullName, id: doctor._id});
    } else if (patient) {
        validPassword = await bcrypt.compare(req.body.password, patient.password);
        if (!validPassword) return res.status(400).send({'message': `Invalid phone or password`});
        token = patient.generateAuthToken();
        res.header('x-auth-token', token).send({access_token: token, username: patient.fullName, id: patient._id});
    } else {
        return res.status(400).send({'message': `Invalid phone or password`});
    }

    })
);


router.get('/verify', asyncMiddleware(async(req, res) => {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({'message': 'Access Denied: No token provided'});

    try {
        jwt.verify(token, config.get('authJWTPrivateKey'), function (err) {
            if (err) return res.status(400).json({ auth: false, message: 'Failed to authenticate token.' });
            res.status(200).json({msg: "You are logged in"})
        });
        
    } catch (error) {
        return res.status(400).send({ error }); 
    }
    
}) )


function validate(req) {
    const schema = {
        phone: Joi.string().min(10).max(13).required(),
        password: Joi.string().min(6).max(200).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;
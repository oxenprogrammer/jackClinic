/*jshint esversion: 6 */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {Patient} = require('../models/patient');
const asyncMiddleware = require('../middleware/async');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let patient = await Patient.findOne({phone: req.body.phone});
    if (!patient) return res.status(400).send({'message': `Invalid phone or password`});
    
    const validPassword = await bcrypt.compare(req.body.password, patient.password);
    if (!validPassword) return res.status(400).send({'message': `Invalid phone or password`});
    
    const token = patient.generateAuthToken();

    res.header('x-auth-token', token).send({'access_token': token});
    })
);

function validate(req) {
    const schema = {
        phone: Joi.string().min(10).max(13).required(),
        password: Joi.string().min(6).max(200).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;
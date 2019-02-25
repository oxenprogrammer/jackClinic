/*jshint esversion: 6 */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncMiddleware = require('../middleware/async');
const {Doctor} = require('../models/doctor');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let doctor = await Doctor.findOne({phone: req.body.phone});
    if (!doctor) return res.status(400).send({'message': `Invalid phone or password`});
    
    const validPassword = await bcrypt.compare(req.body.password, doctor.password);
    if (!validPassword) return res.status(400).send({'message': `Invalid phone or password`});
    
    const token = doctor.generateAuthToken();
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
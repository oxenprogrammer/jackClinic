/*jshint esversion: 6 */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {Doctor} = require('../models/doctor');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let doctor = await Doctor.findOne({phone: req.body.phone});
    if (!doctor) return res.status(400).send({'message': `Invalid phone or password`});
    
    const validPassword = await bcrypt.compare(req.body.password, doctor.password);
    if (!validPassword) return res.status(400).send({'message': `Invalid phone or password`});
    
    const token = jwt.sign({ _id: doctor._id, phone: doctor.phone}, config.get('authJWTPrivateKey'));

    res.header('x-auth-token', token).send({'access_token': token});
});

function validate(req) {
    const schema = {
        phone: Joi.string().min(10).max(13).required(),
        password: Joi.string().min(6).max(200).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;
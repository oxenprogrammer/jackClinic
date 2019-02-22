/*jshint esversion: 6 */
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {Patient, validate} = require('../models/patient');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const patients = await Patient.find().sort('name');
    if (pageSize && currentPage) {
        pagePatients = patients.skip(pageSize * (currentPage - 1))
                .limit(pageSize);
        res.send(pagePatients);    
    }else {
        res.send(patients);
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let patient = await Patient.findOne({phone: req.body.phone});
    if (patient) return res.status(409).send('User with this phone number already exist');

    patient = new Patient({ 
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      dob: req.body.dob,
      password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt);
    await patient.save();

    const token = jwt.sign({ _id: patient._id, phone: patient.phone}, config.get('authJWTPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(patient, 
        ['name', 'phone', 'location', 'dob']));
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const patient = await Patient.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        location: req.body.location,
        phone: req.body.phone,
        password: req.body.password
      }, { new: true });
  
    if (!patient) return res.status(404).send('The patient with the given ID was not found.');
    
    res.send(patient);
});

router.delete('/:id', async (req, res) => {
    const patient = await Patient.findByIdAndRemove(req.params.id);
  
    if (!patient) return res.status(404).send('The patient with the given ID was not found.');
  
    res.send(patient);
});

router.get('/:id', async (req, res) => {
const patient = await Patient.findById(req.params.id);

if (!patient) return res.status(404).send('The patient with the given ID was not found.');

res.send(patient);
});

module.exports = router;



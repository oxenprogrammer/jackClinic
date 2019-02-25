/*jshint esversion: 6 */
const _ = require('lodash');
const authMiddleware = require('../middleware/authMiddleware'); 
const bcrypt = require('bcrypt');
const {Patient, validate} = require('../models/patient');
const admin = require('../middleware/admin');
const isActive = require('../middleware/isActive');
const express = require('express');
const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id).select('-password');
        res.send({'user': patient}); 
    } catch (error) {
        res.send({error});
    }
});

router.get('/', [authMiddleware, isActive], async (req, res) => {
    try {
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
    } catch (error) {
        res.send({error});
    } 
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    try {
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
        const token = patient.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(patient, 
            ['name', 'phone', 'location', 'dob']));
    } catch (error) {
        res.send({error});
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id,
            { 
              name: req.body.name,
              location: req.body.location,
              phone: req.body.phone,
              password: req.body.password
            }, { new: true });
        
          if (!patient) return res.status(404).send('The patient with the given ID was not found.');
          
          res.send(patient);
    } catch (error) {
        res.send({error});
    }
});

router.delete('/:id', [authMiddleware, admin], async (req, res) => {
    try {
        const patient = await Patient.findByIdAndRemove(req.params.id);
        if (!patient) return res.status(404).send('The patient with the given ID was not found.');
        res.send(patient);
    } catch (error) {
        res.send({error});
    }
});

router.get('/:id', [authMiddleware, isActive], async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).send('The patient with the given ID was not found.');
        res.send(patient);
    } catch (error) {
        res.send({error});
    }
});

module.exports = router;



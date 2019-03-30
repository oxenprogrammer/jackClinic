/*jshint esversion: 6 */
const _ = require('lodash');
const authMiddleware = require('../middleware/authMiddleware'); 
const asyncMiddleware = require('../middleware/async');
const bcrypt = require('bcrypt');
const {Patient, validate} = require('../models/patient');
const admin = require('../middleware/admin');
const isActive = require('../middleware/isActive');
const express = require('express');
const router = express.Router();

router.get('/me', authMiddleware, asyncMiddleware(async (req, res) => {
    const patient = await Patient.findById(req.user._id).select('-password'); 
    res.send(patient); 
    })
);

router.get('/', [authMiddleware, isActive], asyncMiddleware(async (req, res) => {
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
    })
);

router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

        let patient = await Patient.findOne({phone: req.body.phone});
        if (patient) return res.status(409).send('User with this phone number already exist');

        patient = new Patient({ 
        fullName: req.body.fullName,
        phone: req.body.phone,
        location: req.body.location, 
        city: req.body.city,
        // dob: req.body.dob,
        password: req.body.password
        });

        const salt = await bcrypt.genSalt(10);
        patient.password = await bcrypt.hash(patient.password, salt);
        await patient.save();
        const token = patient.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(patient, 
            ['name', 'phone', 'location', 'dob']));
    })
);

router.put('/:id', authMiddleware, asyncMiddleware(async (req, res) => {
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
    })
);

router.delete('/:id', [authMiddleware, admin], asyncMiddleware(async (req, res) => {
    const patient = await Patient.findByIdAndRemove(req.params.id);
    if (!patient) return res.status(404).send('The patient with the given ID was not found.');
    res.send(patient);
    })
);

router.get('/:id', [authMiddleware, isActive], asyncMiddleware(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send('The patient with the given ID was not found.');
    res.send(patient);
    })
);

router.post('/me', authMiddleware, asyncMiddleware( async (req, res) => {
    
    const patient = await Patient.findByIdAndUpdate(req.user._id,
        { 
          location: req.body.location,
          city: req.body.city,
          phone: req.body.phone,
          fullName: req.body.fullName,
        }, { new: true }
    ).select('-password');
    
    if (!patient) return res.status(404).send('The patient with the given ID was not found.');
    res.send(patient);
})
);


module.exports = router;



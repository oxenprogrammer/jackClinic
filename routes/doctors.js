/*jshint esversion: 6 */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncMiddleware = require('../middleware/async');
const {Doctor, validate} = require('../models/doctor');
const {Specialization} = require('../models/specialization');
const authMiddleware = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const isActive = require('../middleware/isActive');
const express = require('express');
const router = express.Router();

router.get('/me', authMiddleware, asyncMiddleware( async (req, res) => {
    const doctor = await Doctor.findById(req.user._id).select('-password');
    // res.send({user: doctor}); 
    res.send(doctor); 
    })
);

router.get('/', authMiddleware, asyncMiddleware( async (req, res) => {
    const doctors = await Doctor.find().sort('firstName'); 
    res.send(doctors);
    }) 
);

router.post('/', asyncMiddleware( async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

        let doctor = await Doctor.findOne({phone: req.body.phone});
        if (doctor) return res.status(409).send({'message': `Doctor with phone number ${req.body.phone} already exist`});

        doctor = new Doctor({ 
            fullName: req.body.fullName,
            specialization: req.body.specialization,
            postalAddress: req.body.postalAddress,
            city: req.body.city,
            phone: req.body.phone,
            password: req.body.password,
            priceRate: req.body.priceRate
        });
        const salt = await bcrypt.genSalt(10);
        doctor.password = await bcrypt.hash(doctor.password, salt);
        await doctor.save();
        
        res.send(_.pick(doctor, ['_id', 'fullName', 'specialization', 'postalAddress', 'city', 'phone', 'priceRate' ]));
    })
);

router.put('/:id', [authMiddleware, isActive], asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

        const doctor = await Doctor.findByIdAndUpdate(req.params.id,
            { 
              postalAddress: req.body.postalAddress,
              city: req.body.city,
              phone: req.body.phone,
              password: req.body.password,
              priceRate: req.body.priceRate,
              isAvailable: req.body.isAvailable,
              isActive: req.body.isActive
            }, { new: true }
        );
        
        if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
        res.send(doctor);
    })
);

router.delete('/:id', [authMiddleware, admin], asyncMiddleware(async (req, res) => {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);
    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
    res.send(doctor);
    })
);

router.get('/:id', authMiddleware, validateObjectId, asyncMiddleware(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
    res.send(doctor);
    })
);

router.post('/me', authMiddleware, asyncMiddleware( async (req, res) => {
    
        const doctor = await Doctor.findByIdAndUpdate(req.user._id,
            { 
              postalAddress: req.body.postalAddress,
              city: req.body.city,
              phone: req.body.phone,
              priceRate: req.body.priceRate,
              fullName: req.body.fullName,
              biography: req.body.biography,
              specialization: req.body.specialization
            }, { new: true }
        ).select('-password');
        
        if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
        res.send(doctor);
    })
);

router.post('/my-availability', authMiddleware, asyncMiddleware(async (req, res) => {
    const doctor = await Doctor.findByIdAndUpdate(req.user._id, {isAvailable: req.body.isAvailable}).select('-password');

    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
        res.send(doctor);
}))

module.exports = router;



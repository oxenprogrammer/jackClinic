/*jshint esversion: 6 */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {Doctor, validate} = require('../models/doctor');
const {Specialization} = require('../models/specialization');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const doctors = await Doctor.find().sort('firstName');
    res.send(doctors);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const specialization = await Specialization.findById(req.body.specializationId);
    if (!specialization) return res.status(400).send('Invalid Specialization.');

    let doctor = await Doctor.findOne({phone: req.body.phone});
    if (doctor) return res.status(409).send('Doctor with this phone number already exist');
  
    doctor = new Doctor({ 
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nin: req.body.nin,
      dob: req.body.dob,
      specialization: {
          _id: specialization._id,
          name: specialization.name
      },
      postalAddress: req.body.postalAddress,
      city: req.body.city,
      phone: req.body.phone,
      password: req.body.password,
      priceRate: req.body.priceRate
    });
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(doctor.password, salt);
    await doctor.save();
    
    res.send(_.pick(doctor,
        ['_id', 'firstName', 'lastName', 'nin', 'dob',
         'specialization', 'postalAddress', 'city', 'phone', 'priceRate' ]));
});

router.put('/:id', async (req, res) => {
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
      }, { new: true });
  
    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
    
    res.send(doctor);
});

router.delete('/:id', async (req, res) => {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);
  
    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
  
    res.send(doctor);
});

router.get('/:id', async (req, res) => {
const doctor = await Doctor.findById(req.params.id);

if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');

res.send(doctor);
});

module.exports = router;



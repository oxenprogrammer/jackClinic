/*jshint esversion: 6 */
const { HealthService, validate } = require('../models/healthService');
const { Doctor } = require('../models/doctor');
const { Patient } = require('../models/patient');
const Fawn = require('fawn');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

Fawn.init(mongoose);
 
router.get('/', async (req, res) => {
    const healthservices = await HealthService.find().sort('-dateOfService');
    res.send(healthservices);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = await Patient.findById(req.body.patientId);
    if(!patient) return res.status(400).send('Invalid Patient Account');

    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(400).send('Invalid Doctor.');

    if (!doctor.isAvailable) return res.status(400).send('Doctor not currently Available');

    let healthService = new HealthService({
        patient: {
            _id: patient._id,
            name: patient.name,
            phone: patient.phone,
            location: patient.location,
            dob: patient.dob
        },
        doctor: {
            _id: doctor._id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            postalAddress: doctor.postalAddress,
            city: doctor.city,
            priceRate: doctor.priceRate,
            everHired: doctor.everHired,
            phone: doctor.phone,
            nin: doctor.nin
        }
    });
    // healthService = await healthService.save();
    // doctor.everHired === true;
    // doctor.save()
    // res.send(healthService)
    try {
        new Fawn.Task()
            .save('healthServices', healthService)
            .update('doctors', { _id: doctor._id}, {
                $set: { everHired: true }
            })
            .run();
            res.send(healthService);
    } catch (error) {
        res.send('Something failed.', error);
    }
});

router.get('/:id', async (req, res) => {
    const healthService = await HealthService.findById(req.params.id);

    if (!healthService) return res.status(404).send('The provided health service was not found.');
    res.send(healthService);
});

module.exports = router;

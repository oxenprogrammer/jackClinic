/*jshint esversion: 6 */
const crypto = require('crypto');
const {Doctor} = require('../models/doctor');
const {Patient} = require('../models/patient');



async function generateRefreshToken(req, res, next) {

    let doctor = await Doctor.findOne({phone: req.body.phone});
    let patient = await Patient.findOne({phone: req.body.phone});
    
    if (doctor) {
        const refreshToken = doctor.phone.toString() + '.' + crypto.randomBytes(40).toString('hex');
        await Doctor.findOneAndUpdate({'phone': doctor.phone}, {
            refreshToken: refreshToken
        },
        function (err, doc) {
            if (err) return res.json(500, {error: err});
            return next();
        });
    } else if(patient) {
        const refreshToken = patient.phone.toString() + '.' + crypto.randomBytes(40).toString('hex');
        await Patient.findOneAndUpdate({'phone': patient.phone}, {
            refreshToken: refreshToken
        },
        function (err, doc) {
            if (err) return res.json(500, {error: err});
            return next();
        });
    } else {
        return res.json(500, {error: err});
    }
    
}

module.exports = {
    generateRefreshToken: generateRefreshToken,
  };
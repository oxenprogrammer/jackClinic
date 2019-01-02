/*jshint esversion: 6 */
const {Doctor, validate} = require('../models/patient');
const {Specialization} = require('../models/specialization');
const mongoose = require('mongoose');
const router = express.Router;

router.get('/', async (req, res) => {
    const doctors = await Doctor.find().sort('name');
    res.send(doctors);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const specialization = await Specialization.findById(req.body.specializationId);
    if (!specialization) return res.status(400),send('Invalid Specialization.');
  
    let doctor = new Doctor({ 
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
      dob: req.body.dob,
      password: req.body.password
    });
    doctor = await doctor.save();
    
    res.send(doctor);
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



/*jshint esversion: 6 */
const { Specialization, validate } = require('../models/specialization');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const specializations = await Specialization.find().sort('name');
    res.send(specializations);
  });

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let specialization = new Specialization({name: req.body.name});
  specialization = await specialization.save();

  res.send(specialization);
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const specialization = await Specialization.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!specialization) return res.status(404).send('The Specialization with the given ID was not found.');
  
  res.send(specialization);
});

router.delete('/:id', async (req, res) => {
  const specialization = await Specialization.findByIdAndRemove(req.params.id);

  if (!specialization) return res.status(404).send('The Specialization with the given ID was not found.');

  res.send(specialization);
});

router.get('/:id', async (req, res) => {
  const specialization = await Specialization.findById(req.params.id);

  if (!specialization) return res.status(404).send('The Specialization with the given ID was not found.');

  res.send(specialization);
});
  
module.exports = router;

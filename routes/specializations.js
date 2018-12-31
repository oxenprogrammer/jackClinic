/*jshint esversion: 6 */
const { Specialization, validate } = require('../models/specialization');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const specializations = await specializations.find().sort('name');
    res.send(specializations);
  });
  
module.exports = router;

/*jshint esversion: 6 */
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const asyncMiddleware = require('../middleware/async');
const {Doctor, validate} = require('../models/doctor');
const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

// config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{
        width: 500,
        height: 500,
        crop: "limit"
    }]
});
const parser = multer({
    storage: storage
});

// route
router.put('/:id', [authMiddleware, parser.single('avatar')], asyncMiddleware(async (req, res) => {
    console.log(req.file); // to see what is returned to you
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);


    const doctor = await Doctor.findByIdAndUpdate(req.params.id,
        { 
          imageURL: req.file.url,
          imageId: req.file.public_id
        }, { new: true }
    );
    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');
    res.send(doctor);
  })
);

module.exports = router;

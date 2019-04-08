/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const specializations = require('../routes/specializations');
const patients = require('../routes/patients');
const doctors = require('../routes/doctors');
const upload = require('../routes/upload');
const healthServices = require('../routes/healthServices');
const auth = require('../routes/auth');
const login = require('../routes/login');
const cors = require('cors');
const error = require('../middleware/error');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

module.exports = function(app) {
    app.use(express.json());
    app.use(cors());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api', router);
    app.use('/api/specializations', specializations);
    app.use('/api/doctors', doctors);
    app.use('/api/patients', patients);
    app.use('/api/healthservices', healthServices);
    app.use('/api/auth', auth);
    app.use('/api/login', login);
    app.use('/api/upload', upload);
    app.use(error);
};
/*jshint esversion: 6 */
const express = require('express');
const app = express();
const winston = require('winston');

require('./initialize/config')();
require('./initialize/logging')();
require('./initialize/routes')(app);
require('./initialize/db')();
require('./initialize/validation')();

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
// npm libs
const express = require('express');

// our dependencies
const configureExpress = require('./config/express');

// express config
const app = express();
configureExpress(app);

module.exports = app;

global.ENV = process.env.NODE_ENV || 'development';

exports = module.exports = require('./src/server.js');

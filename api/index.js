const app = require('./server');
module.exports = app;
module.exports.handler = require('serverless-http')(app);

'use strict';

var config = require('../config/consolidate');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.mongo.user + ':' + config.mongo.password + '@' + config.mongo.server +'/' + config.mongo.database);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB error: ' + err.message);
  console.error('Make sure a mongoDB server is running and accessible by this application');
  process.exit(1);
});
mongoose.connection.on('open', function (err) {
});

module.exports = mongoose;

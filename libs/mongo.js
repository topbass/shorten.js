'use strict';

var config = require('../config/consolidate');
var mongoose = require('mongoose');
var util = require('util');

var uri = util.format(
  'mongodb://%s:%s@%s/%s',
  config.mongo.user,
  onfig.mongo.password,
  config.mongo.server,
  config.mongo.database
);

// Create the database connection
mongoose.connect(uri);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
  // console.error('Make sure a mongoDB server is running and accessible by this application');
  // process.exit(1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;

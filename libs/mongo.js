'use strict';

var config = require('../config/consolidate');
var mongoose = require('mongoose');
var util = require('util');

function Mongo() {
  this.readyStates = {
    disconnected: 0,
    connected: 1,
    connecting: 2,
    disconnecting: 3
  };

  this.uri = util.format(
    'mongodb://%s:%s@%s/%s',
    config.mongo.user,
    config.mongo.password,
    config.mongo.server,
    config.mongo.database
  );

  if (this.isConnectable()) {
    this.connect();
    this.attachMongooseEventListeners();
    this.attachProcessEventListeners();
  }

  return mongoose;
}

Mongo.prototype.connect = function() {
  mongoose.connect(this.uri);
}

Mongo.prototype.isConnectable = function() {
  return (mongoose.connection.readyState === this.readyStates.disconnected);
}

Mongo.prototype.attachMongooseEventListeners = function() {
  var that = this;
  // When successfully connected
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + that.uri);
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
}

Mongo.prototype.attachProcessEventListeners = function() {
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
}

module.exports = new Mongo();

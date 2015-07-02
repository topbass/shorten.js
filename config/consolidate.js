'use strict';

var config = require('config');
var extend = require('extend');

exports = module.exports = extend(true, config, {
  mongo: {
    server: process.env.SHORTENJS_MONGO_SERVER || config.mongo.server,
    database: process.env.SHORTENJS_MONGO_DATABASE || config.mongo.database,
    user: process.env.SHORTENJS_MONGO_USER || config.mongo.user,
    password: process.env.SHORTENJS_MONGO_PASSWORD || config.mongo.password
  }
});

'use strict';

var hashids = require('hashids');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  apiKey: String,
  member_since: {type: Date, default: Date.now}
  display_name, String,
  full_name: String
});

User.index({hash: 1});

module.exports = mongoose.model('User', User);

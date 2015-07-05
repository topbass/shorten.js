'use strict';

var hashids = require('hashids');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Url = new Schema({
  hash: String,
  long_url: String,
  status: String,
  views: Number,
  title, String,
  note: String,
  archived: Boolean,
  timestamp: {type: Date, default: Date.now}
});

Url.index({hash: 1});

module.exports = mongoose.model('Url', Url);

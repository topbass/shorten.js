'use strict';

var hashids = require('hashids');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Url = new Schema({
});

module.exports = mongoose.model('Url', Url);

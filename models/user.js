'use strict';

var hashids = require('hashids');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
});

User.index({hash: 1});

module.exports = mongoose.model('User', User);

'use strict';

var config = require('config');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/shorten', function(req, res) {
  //
});

module.exports = router;

'use strict';

var config = require('config');
var express = require('express');
var mongoose = require('../../libs/mongo');

var Link = require('../../models/link');
var User = require('../../models/user');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/shorten', function(req, res) {
  //
});

router.get('/expand', function(req, res) {
  //
});

router.get('/link/clicks', function(req, res) {
  //
});

router.get('/oauth/app', function(req, res) {
  //
});

router.get('/user/info', function(req, res) {
  //
});

module.exports = router;

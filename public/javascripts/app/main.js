'use strict';

var angular = require('angular');

exports = module.exports = angular
  .module('shortenJs', [
    require('angular-route'),
    require('./components/version/version')
  ]);

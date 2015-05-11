'use strict';

var angular = require('angular');

exports = module.exports = angular
  .module('shortenJs.version', [])
  .value('version', '0.1')
  .filter('interpolate', require('./interpolate-filter'))
  .directive('appVersion', require('./version-directive'));

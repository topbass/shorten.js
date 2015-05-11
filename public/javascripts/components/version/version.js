'use strict';

var angular = require('angular');

exports = module.exports = angular.module('shortenJs.version');

angular
  .module('shortenJs.version', [
    // 'shortenJs.version.interpolate-filter',
    // 'shortenJs.version.version-directive'
    require('./interpolate-filter'),
    require('./version-directive')
  ])
  .value('version', '0.1');

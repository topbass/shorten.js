'use strict';

var angular = require('angular');

angular
  .module('shortenJs.version.interpolate-filter', [])
  .filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);

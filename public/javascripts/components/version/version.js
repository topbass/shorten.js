'use strict';

var angular = require('../../bower/angular/angular');

angular
  .module('shortenJs.version', [
    'shortenJs.version.interpolate-filter',
    'shortenJs.version.version-directive'
  ])
  .value('version', '0.1');

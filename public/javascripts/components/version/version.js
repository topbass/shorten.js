'use strict';

angular
  .module('shortenJs.version', [
    'shortenJs.version.interpolate-filter',
    'shortenJs.version.version-directive'
  ])
  .value('version', '0.1');
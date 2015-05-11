'use strict';

require('angular');
require('angular-mocks');

describe('shortenJs.version module', function() {
  beforeEach(angular.mock.module('shortenJs.version'));

  describe('interpolate filter', function() {
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('version', 'TEST_VER');
    }));

    it('should replace VERSION', angular.mock.inject(function(interpolateFilter) {
      expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
    }));
  });
});

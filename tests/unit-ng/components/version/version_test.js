'use strict';

require('angular');
require('angular-mocks');

describe('shortenJs.version module', function() {
  beforeEach(angular.mock.module('shortenJs.version'));

  describe('version service', function() {
    it('should return current version', angular.mock.inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});

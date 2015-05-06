'use strict';

describe('shortenJs.version module', function() {
  beforeEach(module('shortenJs.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});

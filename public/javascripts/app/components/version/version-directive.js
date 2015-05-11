'use strict';

exports = module.exports = function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
};

exports.$inject = ['version'];

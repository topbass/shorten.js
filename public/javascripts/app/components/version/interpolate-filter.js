'use strict';

exports = module.exports = function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}

exports.$inject = ['version'];

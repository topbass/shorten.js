'use strict';

function NotFoundError(code, error) {
  var message;

  code = (typeof code == 'undefined') ? '404' : code;
  message = (typeof error == 'undefined') ? undefined : error.message;

  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);

  this.name = 'NotFoundError';
  this.message = message;
  this.code = code;
  this.status = 404;
  this.inner = error;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;

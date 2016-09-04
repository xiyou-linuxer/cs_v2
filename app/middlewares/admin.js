'use strict';

let qs = require('querystring');

module.exports = function (ctx) {
  return function* (next) {
    if (!/^\/admin\//.test(this.path)) {
      return yield* next;
    }

    if (this.session.grant.user.group !== 1) {
      this.throw(404);
    }

    return yield* next;
  };
};

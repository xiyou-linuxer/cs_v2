'use strict';

let qs = require('querystring');

module.exports = function (ctx) {
  return function* (next) {
    if (!/\/admin\//.test(this.path)) {
      return yield* next;
    }

    if (this.session.user.group !== 1) {
      yield this.render('common/404');
      return this.status = 404;
    }

    return yield* next;
  };
};

'use strict';

let qs = require('querystring');

module.exports = function (app) {
  return function* (next) {
    try {
      yield *next;
    } catch (e) {
      let status = e.status || 500;
      let message = e.message || '服务器错误';

      if (/api/.test(this.path)) {
        this.body = {
          'status': status,
          'message': message
        };

        return this.status = status;
      }

      return this.throw(status, new Error(message));

      if (e.status === 404) {
        yield this.render('common/404');
        return this.status = 404;
      }

      yield this.render('common/error');
      return this.status = e.status;
    }

    if (this.status === 404) {
      yield this.render('common/404');
      return this.status = 404;
    }
  };
};

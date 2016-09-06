'use strict';

const xtpl = require('xtpl');

module.exports = function (app) {
  return function* (next) {
    if (process.env.NODE_ENV === 'dev') {
      return yield *next;
    }

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

      //return this.throw(status, new Error(message));

      if (e.status === 401) {
        this.redirect('/connect/adam');
        return this.status = 302;
      }

      if (e.status === 404) {
        yield this.render('404');
        return this.status = 404;
      }

      yield this.render('error');
      return this.status = e.status;
    }

    if (this.status === 404) {
      yield this.render('404');
      return this.status = 404;
    }
  };
};

'use strict';

let qs = require('querystring');

module.exports = function (app) {
  return function* (next) {

    let escape_reg = /\/assets|\/connect\/.+|\/handle_.+_callback/;
    if (escape_reg.test(this.path)) {
      return yield* next;
    }

    if (this.session.grant
      && this.session.grant.response
      && this.session.grant.response.access_token) {
      return yield* next;
    }

    if (/^\/api/.test(this.path)) {
      return this.throw(401, '未登录或token失效，请重新登录');
    }

    this.session.old_path = escape_reg.test(this.path) ? '/' : this.path;
    this.redirect('/connect/adam');
    this.status = 302;
  };
};

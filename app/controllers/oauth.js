'use strict';

const baseDir = process.cwd();

const path = require('path');

module.exports = function (app) {

  exports.handle_adam_callback = function* () {
    if (!this.session.grant.response
      || !this.session.grant.response.access_token) {
      return this.throw(500, 'unkown error!');
    }

    try {
      let client = yield this.proxy.adam.get('client');
      this.session.grant.client = client;

      let user = yield this.proxy.adam.get('me');
      this.session.grant.user = user;

      this.redirect(this.session.old_path || '/');
      this.status = 302;
    } catch (err) {
      this.body = err.message;
      //this.throw(err);
    }
  };

  exports.logout = function* () {
    if (this.session.grant && this.session.grant.response) {
      delete this.session.grant.response;
    }

    this.redirect(app.env.oauth.logout_url);
    this.status = 301;
  };

  exports.resetPassword = function* () {
    this.redirect(app.env.oauth.reset_password_url);
    this.status = 301;
  };

  exports.getAccessToken = function* () {
    this.body = this.session.grant.response.raw;
  };

  return exports;
};

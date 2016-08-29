'use strict';

const baseDir = process.cwd();

const path = require('path');
const oauthConfig = require(path.join(baseDir, 'config/oauth'));

module.exports = function (app) {

  exports.handle_adam_callback = function* () {
    if (!this.session.grant.response
      || !this.session.grant.response.access_token) {
      return this.throw(500, 'unkown error!');
    }

    try {
      let user = yield this.proxy.adam.get('me');
      this.session.grant.user = user;

      this.redirect(this.session.old_path || '/');
      this.status = 301;
    } catch (err) {
      this.body = err.message;
      //this.throw(err);
    }
  };

  exports.logout = function* () {
    if (this.session.grant && this.session.grant.response) {
      delete this.session.grant.response;
    }

    this.redirect(oauthConfig.adam.logout_url);
    this.status = 301;
  };

  return exports;
};

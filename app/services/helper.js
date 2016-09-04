'use strict';

module.exports = function (app) {
  exports.getOAuthScopes = function* (ctx) {
    return yield ctx.proxy.adam.get('oauth/scopes');
  };

  return exports;
};

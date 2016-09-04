'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let isMy = this.query.isMy ? true : false;

    let query = {};
    if (isMy) {
      query.author_id = this.session.grant.user.id;
    } else {
      query.status = 3;
    }

    let ret = yield this.services.app.getByQuery(this, query);
    let apps = ret.data;

    let data = {
      isMy: isMy,
      apps: apps
    };

    yield this.render('app/index', {
      data: data
    });
  };

  exports.create = function* () {
    let scopes = yield this.services.helper.getOAuthScopes(this);

    yield this.render('app/edit', {
      scopes: scopes
    });
  };

  exports.update = function* () {
    let id = parseInt(this.params.id) || 0;
    let user = this.session.grant.user;

    let app = yield this.services.app.getById(this, id);
    if (!app) {
      return this.status = 404;
    }

    if (app.author_id !== user.id && user.group !== 1) {
      return this.status = 404;
    }

    let scopes = yield this.services.helper.getOAuthScopes(this);

    let appScopes = app.scopes.split(',');
    let maxLevel = 0;
    scopes.forEach(scope => {
      if (appScopes.indexOf(scope.id) > -1 && scope.level > maxLevel) {
        maxLevel = scope.level;
      }
    });

    scopes = scopes.map(scope => {
      scope.hasScope = appScopes.indexOf(scope.id) > -1;
      if (scope.level < maxLevel) {
        scope.disabled = true;
      }

      return scope;
    });

    yield this.render('app/edit', {
      app: app,
      scopes: scopes
    });
  };


  exports.show = function* () {
    let id = parseInt(this.params.id) || 0;
    let user = this.session.grant.user;

    let app = yield this.services.app.getById(this, id);
    if (!app) {
      return this.status = 404;
    }

    if (app.author_id !== user.id && user.group !== 1) {
      return this.status = 404;
    }

    let scopes = yield this.services.helper.getOAuthScopes(this);

    let appScopes = app.scopes.split(',');

    scopes = scopes.map(scope => {
      scope.hasScope = appScopes.indexOf(scope.id) > -1;

      return scope;
    });

    yield this.render('app/show', {
      app: app,
      scopes: scopes
    });
  };

  return exports;
};

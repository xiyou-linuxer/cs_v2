'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let page = parseInt(this.query.page, 10) || 1;
    let isMy = this.query.isMy ? true : false;
    let author_id = parseInt(this.query.author_id, 10);
    let status = parseInt(this.query.status, 10);
    let keyword = this.query.keyword || '';

    let query = {
      page: page,
      keyword: keyword
    };

    if (isMy) {
      query.author_id = this.session.grant.user.id;
      if (status || status === 0) {
        query.status = status;
      }
    } else {
      query.status = 3;
      if (author_id || author_id === 0) {
        query.author_id = author_id;
      }
    }

    let ret = yield this.services.app.getByQuery(this, query);
    let totalPage = Math.ceil(ret.total_count / ret.per_page);
    let apps = ret.data;

    let data = {
      page: page,
      totalPage: totalPage,
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
    let id = this.params.id;
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
    let id = this.params.id;
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

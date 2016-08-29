'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let isMy = this.query.isMy ? true : false;

    let query = {};
    if (isMy) {
      query.author_id = this.session.user.id;
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
    yield this.render('app/edit');
  };

  exports.update = function* () {
    let id = parseInt(this.params.id) || 0;

    let app = yield this.services.app.getById(this, id);
    if (!app) {
      return this.status = 404;
    }

    yield this.render('app/edit', {
      app: app
    });
  };


  exports.show = function* () {
    let id = parseInt(this.params.id) || 0;

    let app = yield this.services.app.getById(this, id);
    if (!app) {
      return this.status = 404;
    }

    yield this.render('app/show', {
      app: app
    });
  };

  return exports;
};

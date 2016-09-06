'use strict';

module.exports = function (app) {
  exports.index = function* () {
    let page = parseInt(this.query.page) || 1;
    let pageSize = parseInt(this.query.per_page) || 20;
    let keyword = this.query.keyword || '';

    let query = {
      page: page,
      per_page: pageSize
    };

    if (keyword) {
      query.keyword = keyword;
    }

    let ret = yield this.services.app.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    let ret = yield this.services.app.create(this, data);

    this.body = ret;
  };

  exports.update = function* () {
    let id = this.params.id;
    let data = this.request.body;

    let ret = yield this.services.app.updateById(this, id, data);

    this.body = ret;
  };

  exports.show = function* () {
    let id = this.params.id;
    let ret = yield this.services.app.getById(this, id);

    this.body = ret;
  };

  exports.destroy = function* () {
    let id = this.params.id;

    let ret = yield this.services.app.deleteById(this, id);

    this.body = ret;
  };

  exports.refreshSecret = function* () {
    let id = this.params.id;

    let ret = yield this.services.app.refreshSecret(this, id);

    this.body = ret;
  };

  exports.confirm = function* () {
    let id = this.params.id;

    let ret = yield this.services.app.confirm(this, id);

    this.body = ret;
  };

  exports.reject = function* () {
    let id = this.params.id;

    let ret = yield this.services.app.reject(this, id);

    this.body = ret;
  };

  return exports;
};

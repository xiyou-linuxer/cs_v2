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

    let ret = yield this.services.user.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    let ret = yield this.services.user.create(this, data);

    this.body = ret;
  };

  exports.update = function* () {
    let id = parseInt(this.params.id);
    let data = this.request.body;

    let ret = yield this.services.user.updateById(this, id, data);

    this.body = ret;
  };

  exports.show = function* () {
    let id = parseInt(this.params.id);
    let ret = yield this.services.user.getById(this, id);

    this.body = ret;
  };

  exports.destroy = function* () {
    let id = parseInt(this.params.id);

    yield this.services.user.deleteById(this, id);
    this.status = 204;
  };

  return exports;
};

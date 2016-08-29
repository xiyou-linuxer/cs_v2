'use strict';

module.exports = function (app) {
  let userService = app.services.user;

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

    let ret = yield userService.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    let ret = yield userService.create(this, data);

    this.body = ret;
  };

  exports.update = function* () {
    let id = parseInt(this.params.id);
    let data = this.request.body;

    let ret = yield userService.updateById(this, id, data);

    this.body = ret;
  };

  exports.destroy = function* () {
    let id = parseInt(this.params.id);

    let user = yield userService.getById(this, id);
    if (!user) {
      return this.throw(404, new Error('该成员不存在~'));
    }

    yield userService.deleteById(this, id);
    this.status = 204;
  };

  return exports;
};

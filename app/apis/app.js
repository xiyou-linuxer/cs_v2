'use strict';

module.exports = function (app) {
  let appService = app.services.app;

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

    let ret = yield appService.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    let ret = yield appService.create(this, data);

    this.body = ret;
  };

  exports.update = function* () {
    let id = parseInt(this.params.id);
    let data = this.request.body;

    let ret = yield appService.updateById(this, id, data);

    this.body = ret;
  };

  return exports;
};

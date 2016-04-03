'use strict';

module.exports = function (app) {
  let repositoryService = app.services.repository;

  exports.index = function* () {
    let keywords = this.query.keywords;
    let page = parseInt(this.query.page, 10) || 1;
    let pageSize = paseInt(this.query.size, 10) || 20;

    let query = {
      page: page,
      size: pageSize
    };

    if (keywords) {
      query.keywords = keywords;
    }

    let ret = yield repositoryService.getByQuery(query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;
    data.author = '张永军';
    let ret = yield repositoryService.create(data);

    this.body = ret;
  };

  return exports;
};

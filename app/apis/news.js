'use strict';

module.exports = function (app) {
  let newsService = app.services.news;

  exports.index = function* () {
    let page = parseInt(this.query.page) || 1;
    let pageSize = parseInt(this.query.per_page) || 20;
    let keyword = this.query.keyword || '';
    let authorId = this.query.author_id || 0;

    let query = {
      page: page,
      per_page: pageSize
    };

    if (keyword) {
      query.keyword = keyword;
    }

    if (authorId) {
      query.author_id = authorId;
    }

    let ret = yield newsService.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    let ret = yield newsService.create(this, data);

    this.body = ret;
  };

  return exports;
};

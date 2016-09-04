'use strict';

module.exports = function (app) {

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

    let ret = yield this.services.news.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    let ret = yield this.services.news.create(this, data);

    this.body = ret;
  };

  exports.destroy = function* () {
    let id = parseInt(this.params.id);

    let ret = yield this.services.news.deleteById(this, id);

    this.body = ret;
  };

  exports.createComment = function* () {
    let newsId = parseInt(this.params.id);
    let data = this.request.body;

    let ret = yield this.services.news.createComment(this, newsId, data);

    this.body = ret;
  };

  exports.getComments = function* () {
    let newsId = parseInt(this.params.id);
    let page = parseInt(this.query.page) || 1;
    let pageSize = parseInt(this.query.per_page) || 20;
    let authorId = this.query.author_id || 0;

    let query = {
      page: page,
      per_page: pageSize
    };

    if (authorId) {
      query.author_id = authorId;
    }

    let ret = yield this.services.news.getCommentsByQuery(this, newsId, query);

    this.body = ret;
  };

  exports.favor = function* () {
    let newsId = parseInt(this.params.id);

    let ret = yield this.services.news.favor(this, newsId);

    this.body = ret;
  };

  return exports;
};

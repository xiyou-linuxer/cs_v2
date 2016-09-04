'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let ret = yield this.services.app.getByQuery(this, {
      status: 3
    });
    let apps = ret.data;

    ret = yield this.services.news.getByQuery(this);
    let news = ret.data;

    yield this.render('index', {
      apps: apps,
      news: news
    });
  };

  exports.search = function* () {
    let keyword = this.params.keyword || '';

    let ret = yield this.services.news.getByQuery(this, {
      keyword: keyword
    });

    let news = ret.data;

    ret = yield this.services.user.getByQuery(this, {
      keyword: keyword
    });
    let users = ret.data;

    yield this.render('search', {
      keyword: keyword,
      news: news,
      users: users
    });
  };

  return exports;
};

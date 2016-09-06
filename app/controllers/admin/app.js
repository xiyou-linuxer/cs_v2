'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let page = parseInt(this.query.page, 10) || 1;
    let status = parseInt(this.query.status, 10);
    let author_id = parseInt(this.query.author_id, 10);
    let keyword = this.query.keyword || '';

    let query = {
      page: page,
      keyword: keyword
    };

    if (author_id || author_id === 0) {
      query.author_id = author_id;
    }

    if (status || status === 0) {
      query.status = status;
    }

    let ret = yield this.services.app.getByQuery(this, query);
    let totalPage = Math.ceil(ret.total_count / ret.per_page);
    let apps = ret.data;

    let data = {
      page: page,
      totalPage: totalPage,
      apps: apps
    };

    yield this.render('admin/app/index', {
      data: data
    });
  };

  return exports;
};

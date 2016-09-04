'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let page = parseInt(this.query.page) || 1;
    let pageSize = parseInt(this.query.per_page) || 20;
    let category = parseInt(this.query.category, 10);
    let keyword = this.query.keyword || '';

    let query = {
      page: page,
      per_page: pageSize
    };

    if (category || category === 0) {
      query.category = category;
    }

    if (keyword) {
      query.keyword = keyword;
    }

    let ret = yield this.services.message.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    data.type = 0;
    let ret = yield this.services.message.create(this, data);

    this.body = ret;
  };

  exports.update = function* () {
    let id = parseInt(this.params.id);
    let data = this.request.body;

    let ret = yield this.services.message.updateById(this, id, data);

    this.body = ret;
  };

  exports.show = function* () {
    let id = parseInt(this.params.id);

    let ret = yield this.services.message.getById(this, id);

    this.body = ret;
  };

  exports.destroy = function* () {
    let id = parseInt(this.params.id);

    let ret = yield this.services.message.deleteById(this, id);

    this.body = ret;
  };

  return exports;
};

'use strict';

module.exports = function (app) {
  let messageService = app.services.message;

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

    let ret = yield messageService.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    data.type = 0;
    data.status = data.status === 'send' ? 1 : 0;
console.log(data)
    let ret = yield messageService.create(this, data);

    this.body = ret;
  };

  exports.update = function* () {
    let id = parseInt(this.params.id);
    let data = this.request.body;

    let ret = yield messageService.updateById(this, id, data);

    this.body = ret;
  };

  return exports;
};

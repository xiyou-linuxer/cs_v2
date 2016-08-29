'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let category = this.query.category || '';

    let query = {};
    if (category) {
      query.category = category;
    }

    let ret = yield this.services.message.getByQuery(this, query);
    let messages = ret.data;

    let data = {
      category: category,
      messages: messages
    };

    yield this.render('message/index', {
      data: data
    });
  };

  exports.create = function* () {
    yield this.render('message/edit');
  };

  exports.show = function* () {
    let id = parseInt(this.params.id) || 0;

    let app = yield this.services.message.getById(this, id);
    console.log(app)
    if (!app) {
      return this.status = 404;
    }

    yield this.render('message/show', {
      app: app
    });
  };

  return exports;
};

'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let isMy = this.query.isMy ? true : false;

    let query = {};
    if (isMy) {
      query.author_id = this.session.user.id;
    } else {
      query.status = 3;
    }

    let ret = yield this.services.app.getByQuery(this, query);
    let apps = ret.data;

    let data = {
      isMy: isMy,
      apps: apps
    };

    yield this.render('admin/app/index', {
      data: data
    });
  };

  return exports;
};

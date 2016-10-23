'use strict';

const _ = require('lodash');
const path = require('path');
const marked = require('marked');

module.exports = function (app) {
  exports.getByQuery = function* (ctx, q) {
    let query = _.pick(q, ['keyword', 'author_id', 'status', 'page', 'per_page']);
    let ret = yield ctx.proxy.adam.get('apps', {
      qs: query
    });

    ret.data = ret.data.map(function (app) {
        return unfoldAppInfo(app);
    });

    return ret;
  };

  exports.getById = function* (ctx, id) {
    let app = yield ctx.proxy.adam.get(`apps/${id}`);

    app = unfoldAppInfo(app);
    return app;
  };

  exports.create = function* (ctx, data) {
    let app = yield ctx.proxy.adam.post('apps', {
      form: data
    });

    app = unfoldAppInfo(app);
    return app;
  };

  exports.updateById = function* (ctx, id, data) {
    let app = yield ctx.proxy.adam.put(`apps/${id}`, {
      form: data
    });

    app = unfoldAppInfo(app);
    return app;
  };

  exports.deleteById = function* (ctx, id, data) {
    return yield ctx.proxy.adam.delete(`apps/${id}`);
  };

  exports.refreshSecret = function* (ctx, id) {
    let app = yield ctx.proxy.adam.put(`apps/${id}/secret`);

    app = unfoldAppInfo(app);
    return app;
  };

  exports.confirm = function* (ctx, id) {
    let app = yield ctx.proxy.adam.put(`apps/${id}/confirm`);

    app = unfoldAppInfo(app);
    return app;
  };

  exports.reject = function* (ctx, id) {
    let app = yield ctx.proxy.adam.put(`apps/${id}/reject`);

    app = unfoldAppInfo(app);
    return app;
  };


  return exports;
};

function unfoldAppInfo(app) {
  if (!app) {
    return app;
  }

  app.description_html = marked(app.description);
  app.description_text = app.description_html.replace(/<.+?>|<\/.+?>/g, ' ');
  return app;
}

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
    let app = yield ctx.proxy.adam.get('apps', {
      subpath: id
    });

    return unfoldAppInfo(app);
  };

  exports.create = function* (ctx, data) {
    let app = yield ctx.proxy.adam.post('apps', {
      form: data
    });

    return unfoldAppInfo(app);
  };

  exports.updateById = function* (ctx, id, data) {
    let app = yield ctx.proxy.adam.put('apps', {
      subpath: id,
      form: data
    });

    return unfoldAppInfo(app);
  };

  exports.deleteById = function* (ctx, id, data) {
    return yield ctx.proxy.adam.delete('apps', {
      subpath: id
    });
  };

  exports.refreshSecret = function* (ctx, id) {
    let app = yield ctx.proxy.adam.put('apps', {
      subpath: id + '/secret'
    });

    return unfoldAppInfo(app);
  };

  exports.confirm = function* (ctx, id) {
    let app = yield ctx.proxy.adam.put('apps', {
      subpath: id + '/confirm'
    });

    return unfoldAppInfo(app);
  };

  exports.reject = function* (ctx, id) {
    let app = yield ctx.proxy.adam.put('apps', {
      subpath: id + '/reject'
    });

    return unfoldAppInfo(app);
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

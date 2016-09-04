'use strict';

const _ = require('lodash');
const path = require('path');

module.exports = function (app) {
  exports.getByQuery = function* (ctx, q) {
    let query = _.pick(q, ['keyword', 'author_id', 'status', 'page', 'per_page']);
    let ret = yield ctx.proxy.adam.get('apps', {
      qs: query
    });

    return ret;
  };

  exports.getById = function* (ctx, id) {
    return yield ctx.proxy.adam.get('apps', {
      subpath: id
    });
  };

  exports.create = function* (ctx, data) {
    return yield ctx.proxy.adam.post('apps', {
      form: data
    });
  };

  exports.updateById = function* (ctx, id, data) {
    return yield ctx.proxy.adam.put('apps', {
      subpath: id,
      form: data
    });
  };

  exports.deleteById = function* (ctx, id, data) {
    return yield ctx.proxy.adam.delete('apps', {
      subpath: id
    });
  };

  exports.refreshSecret = function* (ctx, id) {
    return yield ctx.proxy.adam.put('apps', {
      subpath: id + '/secret'
    });
  };

  exports.confirm = function* (ctx, id) {
    return yield ctx.proxy.adam.put('apps', {
      subpath: id + '/confirm'
    });
  };

  exports.reject = function* (ctx, id) {
    return yield ctx.proxy.adam.put('apps', {
      subpath: id + '/reject'
    });
  };


  return exports;
};

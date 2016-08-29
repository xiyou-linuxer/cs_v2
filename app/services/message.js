'use strict';

const _ = require('lodash');
const path = require('path');

module.exports = function (app) {

  exports.getByQuery = function* (ctx, q) {
    let query = _.pick(q, ['keyword', 'category', 'page', 'per_page']);

    let ret = yield ctx.proxy.adam.get('messages', {
      where: query
    });
    return ret;
  };

  exports.getById = function* (ctx, id) {
    return yield ctx.proxy.adam.get('messages', {
      subpath: id
    });
  };

  exports.create = function* (ctx, data) {
    return yield ctx.proxy.adam.post('messages', {
      form: data
    });
  };

  exports.updateById = function* (ctx, id, data) {
    return yield ctx.proxy.adam.put('messages', {
      subpath: id,
      form: data
    });
  };

  return exports;
};

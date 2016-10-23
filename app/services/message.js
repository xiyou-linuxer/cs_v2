'use strict';

const _ = require('lodash');
const path = require('path');
const marked = require('marked');

module.exports = function (app) {

  exports.getByQuery = function* (ctx, q) {
    let query = _.pick(q, ['keyword', 'category', 'page', 'per_page']);

    let ret = yield ctx.proxy.adam.get('messages', {
      qs: query
    });

    ret.data = ret.data.map(function (message) {
        message = unfoldMessageInfo(message);
        return message;
    });

    return ret;
  };

  exports.getById = function* (ctx, id) {
    let message = yield ctx.proxy.adam.get(`messages/${id}`);

    message = unfoldMessageInfo(message);
    return message;
  };

  exports.create = function* (ctx, data) {
    let message = yield ctx.proxy.adam.post('messages', {
      form: data
    });

    message = unfoldMessageInfo(message);
    return message;
  };

  exports.updateById = function* (ctx, id, data) {
    let message = yield ctx.proxy.adam.put(`messages/${id}`, {
      form: data
    });

    message = unfoldMessageInfo(message);
    return message;
  };

  exports.deleteById = function* (ctx, id) {
    return yield ctx.proxy.adam.delete(`messages/${id}`);
  };

  return exports;
};

function unfoldMessageInfo(message) {
  if (!message) {
    return message;
  }

  message.content_html = marked(message.content);
  message.content_text = message.content_html.replace(/<.+?>|<\/.+?>/g, ' ');
  return message;
}

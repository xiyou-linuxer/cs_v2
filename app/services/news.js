'use strict';

const _ = require('lodash');
const path = require('path');
const moment = require('moment');

module.exports = function (app) {

  exports.getByQuery = function* (ctx, q) {
    let query = _.pick(q, ['keyword', 'author_id', 'page', 'per_page']);

    let ret = yield ctx.proxy.adam.get('news', {
      where: query
    });

    ret.data = ret.data.map(function (news) {
      return unfoldNewsInfo(news);
    });

    return ret;
  };

  exports.getById = function* (ctx, id) {
    return yield ctx.proxy.adam.get('news', {
      subpath: id
    });
  };

  exports.create = function* (ctx, data) {
    return yield ctx.proxy.adam.post('news', {
      form: data
    });
  };

  return exports;
};

function unfoldNewsInfo (news) {
  if (moment(news.created_at).isAfter(moment().subtract(7, 'days'))) {
    moment.locale('zh-cn');
    news.created_at = moment(news.created_at).fromNow();
  } else {
    news.created_at = moment(news.created_at).format('YYYY年MM月DD日');
  }

  return news;
}

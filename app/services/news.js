'use strict';

const _ = require('lodash');
const path = require('path');
const moment = require('moment');
const marked = require('marked');

module.exports = function (app) {

  exports.getByQuery = function* (ctx, q) {
    let query = _.pick(q, ['keyword', 'author_id', 'page', 'per_page']);

    let ret = yield ctx.proxy.adam.get('news', {
      qs: query
    });
    ret.data = ret.data.map(function (news) {
      return unfoldNewsInfo(news);
    });

    return ret;
  };

  exports.getById = function* (ctx, id) {
    let news = yield ctx.proxy.adam.get('news', {
      subpath: id
    });

    return unfoldNewsInfo(news);
  };

  exports.create = function* (ctx, data) {
    let news = yield ctx.proxy.adam.post('news', {
      form: data
    });

    return unfoldNewsInfo(news);
  };

  exports.deleteById = function* (ctx, id, data) {
    return yield ctx.proxy.adam.delete('news', {
      subpath: id
    });
  };

  exports.createComment = function* (ctx, newsId, data) {
    let news = yield ctx.proxy.adam.post('news', {
      subpath: newsId + '/comments',
      form: data
    });

    return unfoldNewsInfo(news);
  };

  exports.getCommentsByQuery = function* (ctx, newsId, q) {
    let query = _.pick(q, ['author_id', 'page', 'per_page']);

    let ret = yield ctx.proxy.adam.get('news', {
      subpath: newsId + '/comments',
      qs: query
    });
    ret.data = ret.data.map(function (comment) {
      return unfoldCommentInfo(comment);
    });

    return ret;
  };

  exports.favor = function* (ctx, newsId) {
    let news = yield ctx.proxy.adam.post('news', {
      subpath: newsId + '/favors'
    });

    return unfoldNewsInfo(news);
  };

  return exports;
};

function unfoldNewsInfo (news) {
  if (!news) {
    return news;
  }

  if (moment(news.created_at).isAfter(moment().subtract(7, 'days'))) {
    moment.locale('zh-cn');
    news.created_at = moment(news.created_at).fromNow();
  } else {
    news.created_at = moment(news.created_at).format('YYYY年MM月DD日');
  }

  news.comments = news.comments.map(function (comment) {
    return unfoldCommentInfo(comment);
  });

  news.favors = news.favors.map(function (favor) {
    return unfoldFavorInfo(favor);
  });

  news.content_html = marked(news.content);
  news.content_text = news.content_html.replace(/<.+?>|<\/.+?>/g, ' ');

  return news;
}

function unfoldCommentInfo (comment) {
  if (moment(comment.created_at).isAfter(moment().subtract(7, 'days'))) {
    moment.locale('zh-cn');
    comment.created_at = moment(comment.created_at).fromNow();
  } else {
    comment.created_at = moment(comment.created_at).format('YYYY年MM月DD日');
  }

  return comment;
}

function unfoldFavorInfo (favor) {
  if (moment(favor.created_at).isAfter(moment().subtract(7, 'days'))) {
    moment.locale('zh-cn');
    favor.created_at = moment(favor.created_at).fromNow();
  } else {
    favor.created_at = moment(favor.created_at).format('YYYY年MM月DD日');
  }

  return favor;
}

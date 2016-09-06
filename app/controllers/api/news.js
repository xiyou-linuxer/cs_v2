'use strict';

const fmt = require('util').format;;

module.exports = function (app) {

  exports.index = function* () {
    let page = parseInt(this.query.page) || 1;
    let pageSize = parseInt(this.query.per_page) || 20;
    let keyword = this.query.keyword || '';
    let authorId = this.query.author_id || 0;

    let query = {
      page: page,
      per_page: pageSize
    };

    if (keyword) {
      query.keyword = keyword;
    }

    if (authorId) {
      query.author_id = authorId;
    }

    let ret = yield this.services.news.getByQuery(this, query);

    this.body = ret;
  };

  exports.create = function* () {
    let data = this.request.body;

    let ret = yield this.services.news.create(this, data);

    this.body = ret;
  };

  exports.destroy = function* () {
    let id = parseInt(this.params.id);

    let ret = yield this.services.news.deleteById(this, id);

    this.body = ret;
  };

  exports.createComment = function* () {
    let client = this.session.grant.client;
    let operator = this.session.grant.user;
    let newsId = parseInt(this.params.id);
    let data = this.request.body;

    let ret = yield this.services.news.createComment(this, newsId, data);

    let messageData = packMessageInfo(client, operator, ret, 'comment');

    yield this.services.message.create(this, messageData);

    this.body = ret;
  };

  exports.getComments = function* () {
    let newsId = parseInt(this.params.id);
    let page = parseInt(this.query.page) || 1;
    let pageSize = parseInt(this.query.per_page) || 20;
    let authorId = this.query.author_id || 0;

    let query = {
      page: page,
      per_page: pageSize
    };

    if (authorId) {
      query.author_id = authorId;
    }

    let ret = yield this.services.news.getCommentsByQuery(this, newsId, query);

    this.body = ret;
  };

  exports.favor = function* () {
    let client = this.session.grant.client;
    let operator = this.session.grant.user;
    let newsId = parseInt(this.params.id);

    let ret = yield this.services.news.favor(this, newsId);

    let messageData = packMessageInfo(client, operator, ret, 'favor');

    yield this.services.message.create(this, messageData);

    this.body = ret;
  };

  return exports;
};

function packMessageInfo (client, operator, news, action) {
  if (action !== 'favor' && action !== 'comment') {
    return;
  }

  let data = {
    type: 1,
    receiver_id: news.author_id,
    title: '系统通知',
    status: 1
  };

  if (action === 'favor') {
    data.content = fmt('%s 刚刚在 [%s](%s) 上给你的动态点了赞。[点击查看](%s/#news_%d)', operator.name, client.name, client.homepage_url, client.homepage_url, news.id);
  } else {
    data.content = fmt('%s 刚刚在 [%s](%s) 上评论了你的动态。[点击查看](%s/#news_%d)', operator.name, client.name, client.homepage_url, client.homepage_url, news.id);
  }

  return data;
}

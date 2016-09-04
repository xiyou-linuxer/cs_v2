'use strict';

const baseDir = process.cwd();

const path = require('path');
const xtpl = require('xtpl');
const moment = require('moment');

let render = (tpl, data) => {
  return new Promise(function (resolve, reject) {
    xtpl.renderFile(tpl, data, function (err, content) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(content);
      }
    });
  });
};

// data cache
let _userCache = {};

module.exports = function (app) {
  let viewPath = path.join(baseDir, 'resources/views');

  return function* (next) {
    let ctx = this;
    if (/\/(assets|api)\//.test(ctx.path) || ctx.render) {
      return yield* next;
    }

    ctx.render = function* (tpl, data) {
      let userService = ctx.services.user;
      let messageService = ctx.services.message;

      let session = ctx.session;
      let cookies = ctx.request.header.cookie;
      let leftSideBarCollapsed = /left_sidebar_collapsed=true/.test(cookies);
      let rightSideBarCollapsed = /right_sidebar_collapsed=true/.test(cookies);

      // 侧栏用户信息缓存一分钟
      if (!_userCache.expire || _userCache.expire < Date.now()) {
        let ret = yield userService.getByQuery(this, {
          per_page: 1000
        });

        let users = ret.data.sort(function (a, b) {
          return a.online_at - b.online_at;
        });
        _userCache.data = users;
        _userCache.expire = Date.now() + 60000;
      }

      let ret = yield messageService.getByQuery(this, {
        per_page: 1000,
        category: 1
      });
      let _messages = ret.data;

      data = data || {};
      data._users = _userCache.data || [];
      data._messages = _messages || [];
      data._query = this.query;
      data._me = session.grant.user;
      data._cookies = data._cookies || {};
      data._cookies.leftSideBarCollapsed = leftSideBarCollapsed;
      data._cookies.rightSideBarCollapsed = rightSideBarCollapsed;

      let tplPath = path.join(viewPath, tpl + '.xtpl');
      this.body = yield render(tplPath, data);
    };

    return yield* next;
  };
};

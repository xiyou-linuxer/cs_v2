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

module.exports = function (app) {
  let viewPath = path.join(baseDir, 'resources/views');

  return function* (next) {
    let ctx = this;
    if (/\/(assets|api)\//.test(ctx.path) || ctx.render) {
      return yield* next;
    }

    ctx.render = function* (tpl, data) {
      let userService = ctx.services.user;

      let session = ctx.session;
      let cookies = ctx.request.header.cookie;
      let leftSideBarCollapsed = /left_sidebar_collapsed=true/.test(cookies);
      let rightSideBarCollapsed = /right_sidebar_collapsed=true/.test(cookies);

      let ret = yield userService.getByQuery(this);
      let users = ret.data.sort(function (a, b) {
        return a.online_at - b.online_at;
      });

      data = data || {};
      data._users = users;
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

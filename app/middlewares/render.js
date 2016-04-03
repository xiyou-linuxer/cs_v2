'use strict';

let Q = require('q');
let path = require('path');
let xtpl = require('xtpl');

let render = (tpl, data) => {
  let deferred = Q.defer();

  xtpl.renderFile(tpl, data, function (err, content) {
    if (err) {
      deferred.reject(new Error(err));
    } else {
      deferred.resolve(content);
    }
  });

  return deferred.promise;
};

module.exports = function (ctx) {
  let viewPath = path.join(ctx.configs.homedir, ctx.configs.views.path);

  return function* (next) {
    let context = this;
    this.render = function* (tpl, data) {
      let cookies = context.request.header.cookie;
      let tplPath = path.join(viewPath, tpl + '.xtpl');
      let collapsed_nav = /collapsed_nav=true/.test(cookies);

      data.cookies = data.cookies || {};
      data.cookies.collapsed_nav = collapsed_nav;
      context.body = yield render(tplPath, data);
    };

    return yield* next;
  };
};

'use strict';

const baseDir = process.cwd();

const _ = require('lodash');
const path = require('path');
const promise = global.Promise;
const request = require('request');
const purest = require('purest')({request, promise});
const proxyConfig = require(path.join(baseDir, 'config/proxy'));

module.exports = function (app) {

  let apiDomain = app.env.api_domain;
  let _temp;
  Object.keys(proxyConfig.adam).forEach(function (key) {
    _temp = proxyConfig.adam[key];
    delete proxyConfig.adam[key];
  });
  proxyConfig.adam[apiDomain] = _temp;

  let adamProxy = purest({
    provider: 'adam',
    config: proxyConfig,
    api: 'basic'
  });

  return function* (next) {
    let ctx = this;

    if (/\/(assets)\//.test(ctx.path) || ctx.render) {
      return yield* next;
    }

    if (!ctx.session.grant || !ctx.session.grant.response
      || !ctx.session.grant.response.access_token) {
      return yield* next;
    }

    let access_token = ctx.session.grant.response.access_token;
    ctx.proxy = {};
    ctx.proxy.adam = {};
    ['get', 'post', 'put', 'patch', 'delete'].forEach(key => {
      ctx.proxy.adam[key] = function* (path, options) {
        let ret;
        try {
          ret = yield adamProxy[key](path, Object.assign({}, options, {
            auth: {bearer: access_token}
          }));
        } catch (err) {
          return ctx.throw(err);
        }

        if (!_.isArray(ret) || ret.length !== 2) {
          return ctx.throw(500, '代理层接口返回数据格式错误');
        }

        let statusCode = ret[0].statusCode;
        if (statusCode < 200 || statusCode >= 300) {
          console.log(ret)

          let resBody = ret[0].body;
          let message;
          if (_.isObject(resBody)) {
            if (_.isObject(resBody.error)) {
              message = '';
              Object.keys(resBody.error).forEach(key => {
                if (_.isArray(resBody.error[key])) {
                  message += resBody.error[key].join(',') + '。';
                } else {
                  message += resBody.error[key] + '。';
                }
              });
            } else {
              message = resBody.error;
            }
          } else {
            message = resBody;
          }

          if (statusCode === 401) {
            message = '未授权或token已过期，请重新登录系统';
          }

          return ctx.throw(statusCode, message);
        }

        return ret[1];
      };
    });

    return yield *next;
  };
};

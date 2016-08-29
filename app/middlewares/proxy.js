'use strict';

const baseDir = process.cwd();

const _ = require('lodash');
const path = require('path');
const promise = global.Promise;
const request = require('request');
const purest = require('purest')({request, promise});
const proxyConfig = require(path.join(baseDir, 'config/proxy'));

module.exports = function (app) {

  let adamProxy = purest({
    provider: 'adam',
    config: proxyConfig,
    api: 'basic'
  });

  return function* (next) {
    let ctx = this;

    if (!this.session.grant.response
      || !this.session.grant.response.access_token) {
      return yield* next;
    }

    let access_token = this.session.grant.response.access_token;
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
          return ctx.throw(statusCode, ret[0].body);
        }

        return ret[1];
      };
    });

    return yield *next;
  };
};

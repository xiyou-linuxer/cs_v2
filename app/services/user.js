'use strict';

const baseDir = process.cwd();

const _ = require('lodash');
const path = require('path');
const moment = require('moment');

const constantsPath = path.join(baseDir, 'resources/constants');
const JOBS = require(path.join(constantsPath, 'job'));
const MAJORS = require(path.join(constantsPath, 'major'));
const NATIVES = require(path.join(constantsPath, 'native'));
const WORKPLACES = require(path.join(constantsPath, 'workplace'));

module.exports = function (app) {

  exports.getByQuery = function* (ctx, q) {
    let query = _.pick(q, ['group', 'grade', 'major', 'keyword', 'page', 'per_page']);

    let ret = yield ctx.proxy.adam.get('users', {
      qs: query
    });

    ret.data = ret.data.map(function (user) {
      user = unfoldUserInfo(user);
      return user;
    });

    return ret;
  };

  exports.getById = function* (ctx, id) {
    let user = yield ctx.proxy.adam.get(`users/${id}`);

    return user;
  };

  exports.create = function* (ctx, data) {
    let user = yield ctx.proxy.adam.post('users', {
      form: data
    });

    return user;
  };

  exports.updateById = function* (ctx, id, data) {
    let user = yield ctx.proxy.adam.put(`users/${id}`, {
      form: data
    });

    return user;
  };

  exports.deleteById = function* (ctx, id) {
    return yield ctx.proxy.adam.delete(`users/${id}`);
  };

  exports.getGradeList = function* (ctx) {
    let grades = [];
    for (let i = 1980; i < 2099; i++) {
      grades.push(i.toString());
    }

    return yield grades;
  };

  exports.getMajorList = function* (ctx) {
    return yield MAJORS;
  };

  exports.getWorkplaceList = function* (ctx) {
    return yield WORKPLACES;
  };

  exports.getJobList = function* (ctx) {
    return yield JOBS;
  };

  exports.getNativeList = function* (ctx) {
    return yield NATIVES;
  };

  return exports;
};

function unfoldUserInfo (user) {
  if (!user) {
    return user;
  }

  if (moment(user.online_at).isAfter(moment().subtract(1, 'hours'))) {
    user.isOnline = true;
  } else {
    user.isOnline = false;
  }

  moment.locale('zh-cn');
  user.online_at = moment(user.online_at).fromNow();

  return user;
}

'use strict';

let _ = require('lodash');
let path = require('path');
let nodegit = require('nodegit');

module.exports = function (app) {
  let RepositoryGit = nodegit.Repository;
  let RepositoryDB = app.databases.repository;
  let repositoryDir = app.configs.repository.path;

  exports.create = function* (data) {
    data = _.pick(data, ['title', 'author', 'path', 'description']);

    if (!_.isString(data.path)) {
      throw new Error('路径不能为空');
    }

    let repositoryPath = path.join(repositoryDir, data.path);

    try {
      yield RepositoryGit.init(repositoryPath, 0);
    } catch (err) {
      throw new Error(err);
    }

    let ret = yield RepositoryDB.create(data);

    return ret;
  };

  exports.getById = function* (id) {
    return yield RepositoryDB.getById(id);
  };

  exports.getByQuery = function* (query) {
    return yield RepositoryDB.getByQuery(query);
  };

  return exports;
};

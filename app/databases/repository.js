'use strict';

let _ = require('lodash');
let Sequelize = require('sequelize');

let schemas = {
  title: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  path: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
};

let options = {
  freezeTableName: true,
  scopes: {
    query: queryScope
  }
};

module.exports = function (app) {
  let Repository =  app.sequelize.define('repositorys', schemas, options);

  exports.create = function* (data) {
    let ret = Repository.create(data, {
      fields: ['title', 'author', 'path', 'description']
    });

    return ret;
  };

  exports.getById = function* (id) {
    let ret = Repository.findById(id);

    return ret.get();
  };

  exports.getByQuery = function* (q) {
    let query = _.pick(q, ['keywords', 'page', 'size']);

    let repositorys = yield Repository.scope({
      method: ['query', query]
    }).findAll();

    repositorys = repositorys.map(function (rep) {
      return rep.get();
    });

    return repositorys;
  };

  return exports;
};


function queryScope (query) {
  let page = query.page || 1;
  let size = query.size || 20;

  let ret = {
    limit: size,
    offset: size * (page - 1)
  };

  if (query.keywords) {
    ret.where = {
      $or: [{
        title: {
          $like: query.keywords
        }
      }, {
        path: {
          $like: query.keywords
        }
      }]
    };
  }

  return ret;
};

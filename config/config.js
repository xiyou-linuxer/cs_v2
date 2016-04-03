'use strict';
let _ = require('lodash');
let GitHubApi = require("github");
let Sequelize = require('sequelize');
let sequelize = new Sequelize('mysql://root:jk213@121.42.144.117:3306/linux_wiki');

let github = new GitHubApi({
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000,
    headers: {
      'user-agent': 'xiyou-linux-wiki'
    }
});

let githubRequest = (methed, params) => {
  let target = github;
  let keys = methed.split('.');
  keys.forEach(function (key) {
    if (target[key]) {
      target = target[key];
    } else {
      throw new Error('该方法不存在');
    }
  });

  return new Promise(function (resolve, reject) {
    target(params, function (err, res) {
      if (err) {
        return reject(err);
      }

      resolve(res);
    });
  });
};

exports.init = function (app) {
  app.sequelize = sequelize;
  app.github = githubRequest;
};

exports.server = {
  host: 'localhost',
  port: 4444
};

exports.autoload = {
  databases: {
    path: 'app/databases'
  },
  services: {
    path: 'app/services'
  },
  controllers: {
    path: 'app/controllers'
  },
  apis: {
    path: 'app/apis'
  }
};

exports.middlewares = {
  path: 'app/middlewares',
  queue: [
    'render',
    'session'
  ]
};

exports.views = {
  path: './app/views'
};

exports.repository = {
  path: './repositorys'
};

exports.assets = {
  path: 'build/assets',
  prefix: '/assets'
};

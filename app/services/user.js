'use strict';

let _ = require('lodash');
let path = require('path');
let nodegit = require('nodegit');

module.exports = function (app) {
  exports.getByName = function* (name) {
    return yield app.github('user.getFrom', {
      user: name
    });
  };

  return exports;
};

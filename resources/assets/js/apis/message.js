'use strict';

define([
  'utils'
], function (require, exports, module) {
  var utils = require('utils');

  exports.getById = function (id) {
    return utils.request({
      type: 'GET',
      url: '/api/messages/' + id
    });
  };

  exports.create = function (data) {
    return utils.request({
      type: 'POST',
      url: '/api/messages',
      data: data
    });
  };

  exports.update = function (id, data) {
    return utils.request({
      type: 'PUT',
      url: '/api/messages/' + id,
      data: data
    });
  };

  exports.delete = function (id) {
    return utils.request({
      type: 'DELETE',
      url: '/api/messages/' + id
    });
  };
});

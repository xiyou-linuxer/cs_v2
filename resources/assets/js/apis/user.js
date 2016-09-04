'use strict';

define([
  'utils'
], function (require, exports, module) {
  var utils = require('utils');

  exports.create = function (data) {
    return utils.request({
      type: 'POST',
      url: '/api/users',
      data: data
    });
  };

  exports.update = function (id, data) {
    return utils.request({
      type: 'PUT',
      url: '/api/users/' + id,
      data: data
    });
  };

  exports.delete = function (id) {
    return utils.request({
      type: 'DELETE',
      url: '/api/users/' + id
    });
  };

});

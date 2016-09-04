'use strict';

define([
  'utils'
], function (require, exports, module) {
  var utils = require('utils');

  exports.getByQuery = function (query) {
    return utils.request({
      type: 'GET',
      url: '/api/news',
      data: query
    });
  };

  exports.create = function (data) {
    return utils.request({
      type: 'POST',
      url: '/api/news',
      data: data
    });
  };

  exports.update = function (id, data) {
    return utils.request({
      type: 'PUT',
      url: '/api/news/' + id,
      data: data
    });
  };

  exports.delete = function (id) {
    return utils.request({
      type: 'DELETE',
      url: '/api/news/' + id
    });
  };

  exports.createComment = function (id, data) {
    return utils.request({
      type: 'POST',
      url: '/api/news/' + id + '/comments',
      data: data
    });
  };

  exports.favor = function (id) {
    return utils.request({
      type: 'POST',
      url: '/api/news/' + id + '/favors'
    });
  };

});

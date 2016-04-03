define([
  'utils'
], function (require, exports, module) {
  let utils = require('utils');

  exports.create = function (data) {
    return utils.request({
      type: 'POST',
      url: '/api/repositorys',
      data: data
    });
  };
});

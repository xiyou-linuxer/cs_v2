'use strict';

import request from 'request';

module.exports = {
  create (data) {
    return request({
      type: 'POST',
      url: '/api/apps',
      data: data
    });
  },

  update (id, data) {
    return request({
      type: 'PUT',
      url: '/api/apps/' + id,
      data: data
    });
  },

  delete (id) {
    return request({
      type: 'DELETE',
      url: '/api/apps/' + id
    });
  },

  refreshSecret (id) {
    return request({
      type: 'PUT',
      url: '/api/apps/' + id + '/secret'
    });
  },

  confirm (id) {
    return request({
      type: 'PUT',
      url: '/api/apps/' + id + '/confirm'
    });
  },

  reject (id) {
    return request({
      type: 'PUT',
      url: '/api/apps/' + id + '/reject'
    });
  }
};

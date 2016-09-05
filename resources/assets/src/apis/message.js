'use strict';

import request from 'request';

module.exports = {
  getById (id) {
    return request({
      type: 'GET',
      url: '/api/messages/' + id
    });
  },

  create (data) {
    return request({
      type: 'POST',
      url: '/api/messages',
      data: data
    });
  },

  update (id, data) {
    return request({
      type: 'PUT',
      url: '/api/messages/' + id,
      data: data
    });
  },

  delete (id) {
    return request({
      type: 'DELETE',
      url: '/api/messages/' + id
    });
  }
};

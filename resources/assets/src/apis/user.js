'use strict';

import request from 'request';

module.exports = {
  create (data) {
    return request({
      type: 'POST',
      url: '/api/users',
      data: data
    });
  },

  update (id, data) {
    return request({
      type: 'PUT',
      url: '/api/users/' + id,
      data: data
    });
  },

  delete (id) {
    return request({
      type: 'DELETE',
      url: '/api/users/' + id
    });
  }
};

'use strict';

import request from 'request';

module.exports = {
  getByQuery (query) {
    return request({
      type: 'GET',
      url: '/api/news',
      data: query
    });
  },

  create (data) {
    return request({
      type: 'POST',
      url: '/api/news',
      data: data
    });
  },

  update (id, data) {
    return request({
      type: 'PUT',
      url: '/api/news/' + id,
      data: data
    });
  },

  delete (id) {
    return request({
      type: 'DELETE',
      url: '/api/news/' + id
    });
  },

  createComment (id, data) {
    return request({
      type: 'POST',
      url: '/api/news/' + id + '/comments',
      data: data
    });
  },

  favor (id) {
    return request({
      type: 'POST',
      url: '/api/news/' + id + '/favors'
    });
  }
};

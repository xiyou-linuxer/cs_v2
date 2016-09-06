'use strict';

module.exports = {
  getQueryObject (querystring) {
    if (!querystring) {
      return {};
    }

    return (querystring || document.location.search).replace(/(^\?)/,'')
    .split("&").map(function(n) {
      return n = n.split("="),this[n[0]] = n[1],this
    }.bind({}))[0];
  },

  getQueryString (query) {
    let qs = Object.keys(query).map(function (key) {
      return query[value] ? key + '=' + query[key] : '';
    }).join('&');

    return !qs ? '' : '?' + qs;
  },

  updateQueryString (querystring, key, value) {
    if (value === undefined) {
      value = key;
      key = querystring;
      querystring = location.search;
    }

    if (!querystring) {
      querystring = location.search;
    }

    if (!key) {
      return querystring;
    }

    let query = this.getQueryObject(querystring);

    if (typeof key === 'string') {
      query[key] = value;
    } else if (typeof key === 'object') {
      query = Object.assign(query, key);
    }

    Object.keys(query).forEach(function (key) {
      if (!query[key]) {
        delete query[key];
      }
    });

    return this.getQueryString(query);
  }
};

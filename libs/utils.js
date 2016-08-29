let request = require('request');

exports.request = function* () {

}

'use strict';

let Q = require('q');
let qs = require('querystring');
let request = require('request');

let baseUrl = 'http://dev.adam.404befound.com';

let headers = {};
module.exports = function (config) {

  exports.get = function (url, params, callback) {
    let deferred = Q.defer();

    url = baseUrl + url;
    url += params ? '?' + qs.unescape(qs.stringify(params)) : '';

    request({
      url: url,
      headers: headers
    }, function (err, res, body) {
      if (err || res.statusCode !== 200) {
        deferred.reject(new Error(err));
      }

      let data = JSON.parse(body);

      if (data.error) {
        return deferred.reject({ code: data.error });
      }

      return deferred.resolve(data);

    });

    return deferred.promise;
  };

  return exports;
};

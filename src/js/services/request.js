define(['angular'], function (angular) {
  'use strict'

  return angular.module('mods.svcs.request', [])
  .factory('requestSvc', [
    '$q',
    '$http',
    '$httpParamSerializer',
    function ($q, $http, $httpParamSerializer) {
      return {
        get: function (uri, query) {
          var defer = $q.defer()

          if (query) {
            uri += '?' + $httpParamSerializer(query)
          }

          $http.get(uri)
          .success(function (data) {
            defer.resolve(data)
          })
          .error(function (err) {
            defer.reject(err)
          })

          return defer.promise
        },
        post: function (uri, data) {
          var defer = $q.defer()

          $http.post(uri, data)
          .success(function (data) {
            defer.resolve(data)
          })
          .error(function (err) {
            defer.reject(err)
          })

          return defer.promise
        },
        put: function (uri, data) {
          var defer = $q.defer()

          $http.put(uri, data)
          .success(function (data) {
            defer.resolve(data)
          })
          .error(function (err) {
            defer.reject(err)
          })

          return defer.promise
        },
        patch: function (uri, data) {
          var defer = $q.defer()

          $http.patch(uri, data)
            .success(function (data) {
              defer.resolve(data)
            })
            .error(function (err) {
              defer.reject(err)
            })

          return defer.promise
        },
        delete: function (uri) {
          var defer = $q.defer()

          $http.delete(uri)
            .success(function (data) {
              defer.resolve(data)
            })
            .error(function (err) {
              defer.reject(err)
            })

          return defer.promise
        }
      }
    }
  ])
  .factory('authInterceptor', [
    '$rootScope',
    '$q',
    '$window',
    function ($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {}

          var token = $window.localStorage.token

          if (token) {
            config.headers.Authorization = 'Bearer ' + token
          }

          return config
        },
        responseError: function (res) {
          if (res.status === 401) {
            $rootScope.$broadcast('EVENT:SIGNIN_REQUIRED')
          }

          return $q.reject(res)
        }
      }
    }
  ])
  .config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor')
    }
  ])
})
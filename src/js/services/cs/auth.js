define([
  'angular',
  'angular-ui-router',
  'services/cs/notify',
  'services/cs/request'
  ], function (angular) {
  'use strict'

  return angular.module('mods.svcs.cs.auth', [
    'ui.router',
    'mods.svcs.cs.notify',
    'mods.svcs.cs.request'
  ])
  .factory('authSvc', [
    '$q',
    '$state',
    '$rootScope',
    '$window',
    'notifySvc',
    'requestSvc',
    function ($q, $state, $rootScope, $window, notifySvc, requestSvc) {
      $rootScope.auth = {
        user: {
          id: 123,
          name: 'jensyn'
        }
      }

      $rootScope.urlBase64Decode = function (str) {
        var output = str.replace('-', '+').replace('_', '/')

        switch (output.length % 4) {
          case 0: {
            break
          }

          case 2: {
            output += '=='
            break
          }

          case 3: {
            output += '='
            break
          }

          default: {
            throw 'Illegal base64url string!'
          }
        }

        return $window.atob(output)
      }

      function parseAuthInfoFromToken (token) {
        var payload = token.split('.')[1]
        var userJson = $rootScope.urlBase64Decode(payload)

        return JSON.parse(userJson)
      }

      function setAuthInfo (user) {
        $rootScope.auth = { user: user }
      }

      function unsetAuthInfo () {
        $rootScope.auth = {}
      }

      $rootScope.verifyAuthState = function () {
        if (angular.isObject($rootScope.auth.user) &&
          $rootScope.auth.user.name) {
          return true
        }

        return false
      }

      var token = $window.localStorage.authToken

      if (token) {
        var user = parseAuthInfoFromToken(token)

        setAuthInfo(user)
      }

      if (!$rootScope.verifyAuthState()) {
        event.preventDefault()
        $state.go('auth.signin')
      }

      console.log($state.current)

      // 判断用户是否登录，如果未登录，则跳转至登录页面
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.name === 'auth.signin') {
          if (!$rootScope.verifyAuthState()) {
            return
          }

          $state.go('cs.home')
        }

        if (!$rootScope.verifyAuthState()) {
          event.preventDefault()
          $state.go('auth.signin')
        }
      })

      $rootScope.$on('EVENT:SIGNIN_REQUIRED', function () {
        $state.go('auth.signin')
      })

      return {
        signin: function (data) {
          var defer = $q.defer()
          var uri = '/api/auth'

          requestSvc.post(uri, data)
          .then(function (res) {
            var token = res.data.token
            var user = parseAuthInfoFromToken(token)

            setAuthInfo(user)
            $window.localStorage.authToken = token

            notifySvc.showSuccess('登录成功！')
            defer.resolve(user)
          },
          function (err) {
            notifySvc.showError(err)
            defer.reject(err)
          })

          return defer.promise
        },

        signout: function () {
          var defer = $q.defer()

          unsetAuthInfo()
          delete $window.localStorage.authToken

          notifySvc.showSuccess('登出成功！')
          defer.resolve()

          return defer.promise
        }
      }
    }
  ])
})
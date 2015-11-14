define(['angular'], function (angular) {
  'use strict'

  return angular.module('mods.svcs.cs.notify', [])
  .factory('notifySvc', [
    '$rootScope',
    '$timeout',
    function ($rootScope, $timeout) {
      $rootScope.alert = {}

      return {
        showError: function (msg) {
          $rootScope.alert.visible = true
          $rootScope.alert.class = 'alert-danger'
          $rootScope.alert.msg = msg

          $timeout(function () {
            $rootScope.alert.visible = false
          }, 3000)
        },
        showSuccess: function (msg) {
          $rootScope.alert.visible = true
          $rootScope.alert.class = 'alert-success'
          $rootScope.alert.msg = msg

          $timeout(function () {
            $rootScope.alert.visible = false
          }, 3000)
        }
      }
    }
  ])
})
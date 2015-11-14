define([
  'angular',
  'angular-ui-router',
  'services/cs/auth'
  ], function (angular) {
  'use strict'

  return angular.module('mods.ctrls.cs.auth', [
    'ui.router',
    'mods.svcs.cs.auth'
  ])
  .controller('ctrls.cs.auth.signin', [
    '$scope',
    function ($scope) {
      console.log('hello')

      $scope.handleSignin = function () {
        console.log('hello')
      }
    }
  ])
})
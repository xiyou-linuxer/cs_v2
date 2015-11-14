define([
  'angular',
  'angular-ui-router',
  'services/cs/activity'
  ], function (angular) {
  'use strict'

  return angular.module('mods.ctrls.cs.activity', [
    'ui.router',
    'mods.svcs.cs.activity'
  ])
  .controller('ctrls.cs.activity.list', [
    '$scope',
    'activitySvc',
    function ($scope, activitySvc) {
      $scope.cs.acts = {}

      activitySvc.getAll()
      .then(function (res) {
        $scope.cs.acts = res.data
      })
    }
  ])
})
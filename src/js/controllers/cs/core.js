define([
  'angular',
  'angular-ui-router',
  'services/cs/auth',
  'services/cs/user',
  'services/cs/mail'
  ], function (angular) {
  'use strict'

  return angular.module('mods.ctrls.cs.core', [
    'ui.router',
    'mods.svcs.cs.auth',
    'mods.svcs.cs.user',
    'mods.svcs.cs.mail'
  ])
  .controller('ctrls.cs.core', [
    '$rootScope',
    '$state',
    '$uibModal',
    'authSvc',
    'userSvc',
    'mailSvc',
    function ($rootScope, $state, $uibModal, authSvc, userSvc, mailSvc) {
      $rootScope.cs = {}

      $rootScope.cs.users = {}
      userSvc.getAll({
        state: 'online'
      })
      .then(function (res) {
        $rootScope.cs.users.online = res.data
      })

      userSvc.getAll({
        state: 'offline'
      })
      .then(function (res) {
        $rootScope.cs.users.offline = res.data
      })

      $rootScope.cs.mails = {}
      mailSvc.getAll({
        state: 'unread'
      })
      .then(function (res) {
        $rootScope.cs.mails.unread = res.data
      })

      $rootScope.openModal = function (ctx) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: ctx.templateUrl,
          controller: ctx.controller
        })

        modalInstance.result.then(ctx.callback)
      }

      $rootScope.cs.modals = {}
      $rootScope.cs.modals.activity = {
        templateUrl: '/partials/common/modal.html',
        controller: 'ctrls.cs.modals.activity',
        callback: function (data) {
          console.log(data)
        }
      }

      $rootScope.handleNewAct = function (data) {
        console.log(data)
      }

      $rootScope.cs.search = {
        keywords: '',
        handleSubmit: function () {
          $state.go('cs.search', {
            keywords: $scope.cs.search.keywords
          })
        }
      }
    }
  ])
  .controller('ctrls.cs.modals.activity', [
    '$scope',
    '$uibModalInstance',
    function ($scope, $uibModalInstance) {
      $scope.act = {}

      $scope.ok = function () {
        if (!$scope.act.title || !$scope.act.content) {
          return false
        }

        $uibModalInstance.close($scope.act)
      }

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel')
      }
    }
  ])
})
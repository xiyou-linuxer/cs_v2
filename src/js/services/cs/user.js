define([
  'angular',
  'services/cs/notify',
  'services/cs/request'
  ], function (angular) {
  'use strict'

  return angular.module('mods.svcs.cs.user', [
    'mods.svcs.cs.notify',
    'mods.svcs.cs.request'
  ])
  .factory('userSvc', [
    '$q',
    '$sce',
    'notifySvc',
    'requestSvc',
    function ($q, $sce, notifySvc, requestSvc) {
      var uriPrefix = 'http://api.xiyoulinux.org/v1'

      return {
        getAll: function (q) {
          var defer = $q.defer()
          var uri = uriPrefix + '/users'

          requestSvc.get(uri, q)
          .then(function (res) {
            defer.resolve(res)
          },
          function (err) {
            notifySvc.showError(err)
            defer.reject(err)
          })

          return defer.promise
        },
        getById: function (id, opt) {
          if (!id) {
            notifySvc.showError('用户不存在！')
            return false
          }

          var defer = $q.defer()
          var uri = uriPrefix + '/users/' + id

          requestSvc.get(uri, opt)
          .then(function (res) {
            defer.resolve(res)
          },
          function (err) {
            notifySvc.showError(err)
            defer.reject(err)
          })

          return defer.promise
        },
        create: function (data) {
          var defer = $q.defer()
          var uri = uriPrefix + '/users'

          requestSvc.post(uri, data)
          .then(function (res) {
            notifySvc.showSuccess('保存成功！')
            defer.resolve(res)
          },
          function (err) {
            notifySvc.showError(err)
            defer.reject(err)
          })

          return defer.promise
        },
        update: function (id, data) {
          if (!id) {
            notifySvc.showError('用户不存在！')
            return false
          }

          var defer = $q.defer()
          var uri = uriPrefix + '/users/' + id

          requestSvc.patch(uri, data)
          .then(function (res) {
            notifySvc.showSuccess('更新成功！')
            defer.resolve(res)
          },
          function (err) {
            notifySvc.showError(err)
            defer.reject(err)
          })

          return defer.promise
        },
        delete: function (id) {
          if (!id) {
            notifySvc.showError('资源不存在！')
            return false
          }

          var defer = $q.defer()
          var uri = uriPrefix + '/users/' + id

          requestSvc.delete(uri)
          .then(function () {
            notifySvc.showSuccess('删除成功！')
            defer.resolve()
          },
          function (err) {
            notifySvc.showError(err)
            defer.reject(err)
          })

          return defer.promise
        }
      }
    }
  ])
})
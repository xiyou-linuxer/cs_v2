define([
  'angular',
  'angular-ui-router'
  ], function (angular) {
  'use strict'

  return angular.module('mods.ctrls.cs', [
    'ui.router'
  ])
  .controller('ctrls.cs.core', [
    '$scope',
    function ($scope) {
      $scope.cs = {
        users: {
          signed: {
            id: 121,
            name: 'Jensyn',
            avatar: 'http://7xj8c4.com1.z0.glb.clouddn.com/' +
              'xiyoulinux.png?imageView2/2/w/64'
          },
          online: [{
            id: 121,
            name: '陈志城',
            avatar: 'http://7xj8c4.com1.z0.glb.clouddn.com/' +
            'xiyoulinux.png?imageView2/2/w/64',
            workplace: '西安'
          }, {
            id: 121,
            name: '孙磊',
            avatar: 'http://7xj8c4.com1.z0.glb.clouddn.com/' +
            'xiyoulinux.png?imageView2/2/w/64',
            workplace: '西安'
          }],
          offline: [{
            id: 121,
            name: '廖声馨',
            avatar: 'http://7xj8c4.com1.z0.glb.clouddn.com/' +
            'xiyoulinux.png?imageView2/2/w/64',
            workplace: '深圳'
          }, {
            id: 121,
            name: '耿进凯',
            avatar: 'http://7xj8c4.com1.z0.glb.clouddn.com/' +
            'xiyoulinux.png?imageView2/2/w/64',
            workplace: '深圳'
          }]
        },
        mails: {
          unread: [{
            id: 1024,
            title: 'hello, world',
            avatar: 'http://7xj8c4.com1.z0.glb.clouddn.com/' +
            'xiyoulinux.png?imageView2/2/w/64',
            content: '测试一下拉',
            createAt: '2015-11-04 11:20:00'
          }, {
            id: 1024,
            title: 'hello, world',
            avatar: 'http://7xj8c4.com1.z0.glb.clouddn.com/' +
            'xiyoulinux.png?imageView2/2/w/64',
            content: '测试一下拉',
            createAt: '2015-11-04 11:20:00'
          }]
        }
      }
    }
  ])
})
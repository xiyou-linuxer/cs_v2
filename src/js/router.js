define([
    './core'
  ], function (cs) {
  'use strict'

  cs.config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')
    $stateProvider
    .state('auth', {
      abstract: true,
      url: '',
      views: {
        'layout': {
          templateUrl: '/partials/common/signin.html'
        }
      }
    })
    .state('auth.signin', {
      url: '^/signin',
      views: {
        'layout': {
          templateUrl: '/partials/common/signin.html'
        }
      }
    })
    .state('cs', {
      abstract: true,
      url: '',
      views: {
        'layout': {
          controller: 'ctrls.cs.core',
          templateUrl: '/partials/common/layout.html'
        }
      }
    })
    .state('cs.home', {
      url: '^/',
      views: {
        'grid': {
          templateUrl: '/partials/pages/home/grid.html'
        }
      }
    })
    .state('cs.profile', {
      url: '^/profile/{id:[0-9]{3,4}}',
      views: {
        'grid': {
          templateUrl: '/partials/pages/profile/grid.html'
        }
      }
    })
    .state('cs.search', {
      url: '^/search/{id:[0-9]{3,4}}',
      views: {
        'grid': {
          templateUrl: '/partials/pages/search/grid.html'
        }
      }
    })
    .state('cs.mails', {
      url: '^/mails',
      views: {
        'grid': {
          templateUrl: '/partials/pages/mails/list.html'
        }
      }
    })
    .state('cs.mails.edit', {
      url: '^/mails/{id:[0-9]{3,4}|new}/edit',
      views: {
        'grid@cs': {
          templateUrl: '/partials/pages/mails/edit.html'
        }
      }
    })
    .state('cs.mails.info', {
      url: '^/mails/{id:[0-9]{3,4}}',
      views: {
        'grid@cs': {
          templateUrl: '/partials/pages/mails/info.html'
        }
      }
    })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
  }])
})

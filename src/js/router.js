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
    .state('cs.mails', {
      url: '^/mails/{id:[0-9]{3,4}}',
      views: {
        'grid': {
          templateUrl: '/partials/pages/mails/grid.html'
        }
      }
    })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
  }])
})

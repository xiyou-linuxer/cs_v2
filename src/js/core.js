define([
    'angular',
    'angular-ui-router',
    'angular-ui-bootstrap',
    'controllers/core'
  ], function (angular) {
  'use strict'

  var deps = [
    'ui.router',
    'ui.bootstrap',
    'mods.ctrls.cs'
  ]

  return angular.module('cs', deps)
})
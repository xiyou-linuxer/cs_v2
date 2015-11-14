define([
    'angular',
    'angular-ui-router',
    'angular-ui-bootstrap',
    'controllers/cs/auth',
    'controllers/cs/core',
    'controllers/cs/activity'
  ], function (angular) {
  'use strict'

  var deps = [
    'ui.router',
    'ui.bootstrap',
    'mods.ctrls.cs.auth',
    'mods.ctrls.cs.core',
    'mods.ctrls.cs.activity'
  ]

  return angular.module('cs', deps)
})
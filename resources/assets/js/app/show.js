'use strict';

define([
  'ui',
  '../apis/app',
], function (require, exports, module) {
  var UI = require('ui');
  var App = require('../apis/app');

  $('.secret-component .toggle-btn').on('click', function (e) {
    e.preventDefault();
    $('.secret-component').toggleClass('open');
  });
});

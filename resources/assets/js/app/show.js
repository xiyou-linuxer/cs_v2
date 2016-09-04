'use strict';

define([
  'ui',
  '../apis/app',
], function (require, exports, module) {
  var UI = require('ui');
  var App = require('../apis/app');

  var appId = $('#data_app_id').val();

  $('.secret-component .toggle-btn').on('click', function (e) {
    e.preventDefault();
    $('.secret-component').toggleClass('open');
  });

  $('#btn_refresh_secret').on('click', function (e) {
    App.refreshSecret(appId).then(function (res) {
      if (res && res.id) {
        $('#app_secrect_field').html(res.secret);
      } else {
        UI.alert('应用secret刷新失败，请稍后再试~');
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('应用secret刷新失败，请稍后再试~');
      }
    });
  });

  $('#btn_app_confirm').on('click', function (e) {
    App.confirm(appId).then(function (res) {
      if (res && res.id) {
        UI.alert('应用已审核通过~').then(function () {
          location.reload();
        });
      } else {
        UI.alert('操作失败，请稍后再试~');
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('操作失败，请稍后再试~');
      }
    });
  });

  $('#btn_app_reject').on('click', function (e) {
    App.reject(appId).then(function (res) {
      if (res && res.id) {
        UI.alert('操作成功，应用审核不通过~').then(function () {
          location.reload();
        });
      } else {
        UI.alert('操作失败，请稍后再试~');
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('操作失败，请稍后再试~');
      }
    });
  });

});

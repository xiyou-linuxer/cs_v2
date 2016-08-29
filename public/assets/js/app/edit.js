'use strict';

define(['ui', '../apis/app', 'bootstrapValidator', 'jquery.serializeObject'], function (require, exports, module) {
  require('bootstrapValidator');
  require('jquery.serializeObject');

  var UI = require('ui');
  var App = require('../apis/app');

  $('#app_form').formValidation({
    autoFocus: true,
    framework: 'bootstrap',
    icon: {
      valid: false,
      invalid: false,
      validating: 'fa fa-refresh'
    },
    row: {
      valid: 'has-success'
    },
    fields: {
      'client_id': {
        validators: {
          notEmpty: {
            message: 'CLIENT_ID不能为空'
          }
        }
      },
      'name': {
        validators: {
          notEmpty: {
            message: '应用名称不能为空'
          }
        }
      },
      'homepage': {
        validators: {
          notEmpty: {
            message: '应用主页链接不能为空'
          },
          uri: {
            message: '应用主页链接必须为合法的URL'
          }
        }
      },
      'logo': {
        validators: {
          notEmpty: {
            message: '应用Logo图片链接不能为空'
          },
          uri: {
            message: '应用Logo图片链接必须为合法的URL'
          }
        }
      },
      'redirect_uri': {
        validators: {
          notEmpty: {
            message: '应用Oauth授权回调地址不能为空'
          },
          uri: {
            message: '应用Oauth授权回调地址必须为合法的URL'
          }
        }
      }
    }
  }).on('success.form.fv', function (e) {
    e.preventDefault();

    var $form = $(e.target),
        fv = $form.data('formValidation');
    var data = $('#app_form').serializeObject();

    console.log(data);
    var appId = $('#data_app_id').val();
    if (appId) {
      App.update(appId, data).then(function (res) {
        if (res && res.id) {
          UI.alert({
            message: '应用保存成功~'
          }).then(function () {
            window.location.href = '/apps/' + res.id;
          });
        } else {
          UI.alert('应用保存失败，请稍后再试~');
        }
      }).catch(function (err) {
        if (err && err.message) {
          UI.alert(err.message);
        } else {
          UI.alert('应用保存失败，请稍后再试~');
        }
      });
    } else {
      App.create(data).then(function (res) {
        if (res && res.id) {
          UI.alert({
            message: '应用创建成功~'
          }).then(function () {
            window.location.href = '/apps/' + res.id;
          });
        } else {
          UI.alert('应用创建失败，请稍后再试~');
        }
      }).catch(function (err) {
        if (err && err.message) {
          UI.alert(err.message);
        } else {
          UI.alert('应用创建失败，请稍后再试~');
        }
      });
    }
  });
});
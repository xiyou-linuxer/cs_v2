'use strict';

define([
  'ui',
  './repository',
  'bootstrapValidator',
  'jquery.serializeObject',
], function (require, exports, module) {
  require('bootstrapValidator');
  require('jquery.serializeObject');

  let UI = require('ui');
  let Repository = require('./repository');

  $('form').formValidation({
    framework: 'bootstrap',
    icon: {
      valid: false,
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    row: {
      valid: false
    },
    fields: {
      'title': {
        validators: {
          notEmpty: {
            message: '仓库标题不能为空~'
          }
        }
      },
      'path': {
        validators: {
          notEmpty: {
            message: '仓库路径不能为空~'
          }
        }
      }
    }
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
  $('[type="submit"]').on('click', function (e) {
    let data = $('form').serializeObject();
    console.log(data)
    let ret = Repository.create(data).then(function (res) {
      if (res && res.id) {
        UI.alert({
          message: '仓库创建成功~'
        });
      } else {
        UI.alert('创建失败，请稍后再试~');
      }
    }).catch(function (err) {
      UI.alert('创建失败，请稍后再试~');
    });
  });
});

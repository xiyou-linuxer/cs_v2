'use strict';

define(['ui', '../apis/user', 'bootstrapValidator', 'jquery.serializeObject'], function (require, exports, module) {
  require('bootstrapValidator');
  require('jquery.serializeObject');

  var UI = require('ui');
  var User = require('../apis/user');

  $('#profile_form').formValidation({
    autoFocus: true,
    framework: 'bootstrap',
    icon: {
      valid: false,
      invalid: false,
      validating: 'fa fa-refresh'
    },
    err: {
      container: function container($field) {
        return $field.parents('.form-group').find('.help-container');
      }
    },
    row: {
      valid: 'has-success'
    },
    fields: {
      'phone': {
        validators: {
          notEmpty: {
            message: '该字段不能为空'
          },
          phone: {
            country: 'countrySelectBox',
            message: '格式不正确'
          }
        }
      },
      'email': {
        validators: {
          notEmpty: {
            message: '该字段不能为空'
          },
          regexp: {
            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
            message: 'Email格式不正确'
          }
        }
      },
      'workplace': {
        validators: {}
      },
      'job': {
        validators: {}
      },
      'grade': {
        validators: {
          digits: {
            message: '入学年份，如：2012'
          }
        }
      },
      'major': {
        validators: {}
      },
      'qq': {
        validators: {
          digits: {
            message: '只能包含数字'
          }
        }
      },
      'wechat': {
        validators: {}
      },
      'blog': {
        validators: {
          uri: {
            message: '必须为合法的URL'
          }
        }
      },
      'github': {
        validators: {
          uri: {
            message: '必须为合法的URL'
          }
        }
      }
    }
  }).on('change', '[name="countrySelectBox"]', function (e) {
    $('#profile_form').formValidation('revalidateField', 'phone');
  }).on('success.form.fv', function (e) {
    e.preventDefault();

    var $form = $(e.target),
        fv = $form.data('formValidation');

    var userId = $('#user_id').val();
    var data = $('form').serializeObject();

    User.update(userId, data).then(function (res) {
      if (res && res.id) {
        UI.alert({
          message: '信息更新成功~'
        }).then(function () {
          window.location.href = '/users/' + res.id;
        });
      } else {
        UI.alert('信息保存失败，请稍后再试~');
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('信息保存失败，请稍后再试~');
      }
    });
  });

  $('#update_profile').on('click', function () {
    $('#profile_form').submit();
  });
});
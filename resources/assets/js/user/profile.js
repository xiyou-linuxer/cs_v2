'use strict';

define([
  'ui',
  'xtemplate',
  '../apis/user',
  '../apis/news',
  'jquery.serializeObject',
], function (require, exports, module) {
  require('jquery.serializeObject');

  var UI = require('ui');
  var User = require('../apis/user');
  var News = require('../apis/news');
  var Xtemplate = require('xtemplate');

  $('#profile_form').formValidation({
    autoFocus: true,
    framework: 'bootstrap',
    icon: {
      valid: false,
      invalid: false,
      validating: 'fa fa-refresh'
    },
    err: {
      container: function ($field) {
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
  }).on('change', '[name="countrySelectBox"]', function(e) {
    $('#profile_form').formValidation('revalidateField', 'phone');
  }).on('success.form.fv', function(e) {
    e.preventDefault();

    var $form = $(e.target),
        fv    = $form.data('formValidation');

    var userId = $('#user_id').val();
    var data = $('form').serializeObject();

    User.update(userId, data).then(function (res) {
      if (res && res.id) {
        UI.alert({
          message: '信息更新成功~'
        }).then(function() {
          window.location.href = '/users/' + res.id;
        });
      } else {
        UI.alert('信息保存失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('信息保存失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    });
  });

  $('#update_profile').on('click', function () {
    $('#profile_form').submit();
  });

  var pedding = false;
  var page = 1;
  var newsTemplate = $('#news_template').html();
  var $scrollable = $('#news_scrollable');
  $scrollable.on('scroll', function () {
    if (pedding) {
      return false;
    }

    var $newsList = $(this).find('.comment-list');
    var viewHeight = $(this).height();
    var contentHeight = $(this).get(0).scrollHeight;
    var scrollTop = $(this).scrollTop();

    if (contentHeight - viewHeight - scrollTop > 200) {
      return false;
    }

    pedding = true;
    News.getByQuery({
      page: page + 1
    }).then(function (res) {
      if (res.data && res.data.length > 0) {
        page = page + 1;

        var html = new Xtemplate(newsTemplate).render(res.data);
        $newsList.append(html);
      }

      pedding = false;
    });
  });
});

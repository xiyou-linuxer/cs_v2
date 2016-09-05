'use strict';

import './profile.less';

import 'babel-polyfill';
import 'layouts/app';
import 'mods/news';

import UI from 'ui';
import User from 'apis/user';
import News from 'apis/news';
import Xtemplate from 'xtemplate';

let $profilePage = $('.koala-profile-page');
let $profileForm = $profilePage.find('#profile_form');

$profileForm.formValidation({
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
  $profileForm.formValidation('revalidateField', 'phone');
}).on('success.form.fv', function(e) {
  e.preventDefault();

  let $form = $(e.target),
      fv    = $form.data('formValidation');

  let userId = $profileForm.find('#user_id').val();
  let data = $('form').serializeObject();

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

$profilePage.find('#update_profile').on('click', function () {
  $profileForm.submit();
});

$profilePage.find('#btn_reset_password').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  UI.confirm('目前只能通过邮件找回密码， 继续操作之前需要先退出系统。<br>是否继续？')
  .then(function () {
    location.href = '/oauth/logout';
  }).catch(function () {
  });
});

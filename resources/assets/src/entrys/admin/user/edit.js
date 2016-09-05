'use strict';

import './edit.less';

import 'babel-polyfill';
import 'layouts/app';

import UI from 'ui';
import User from 'apis/user';

let $adminUserEditPage = $('.koala-admin-user-edit-page');

$adminUserEditPage.find('form').formValidation({
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
    'name': {
      validators: {
        notEmpty: {
          message: '姓名不能为空'
        }
      }
    },
    'phone': {
      validators: {
        notEmpty: {
          message: '手机号码不能为空'
        },
        phone: {
          country: 'countrySelectBox',
          message: '手机号码格式不正确'
        }
      }
    },
    'email': {
      validators: {
        notEmpty: {
          message: 'Email不能为空'
        },
        regexp: {
            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
            message: 'Email格式不正确'
        }
      }
    },
    'qq': {
      validators: {
        digits: {
          message: 'QQ号码只能包含数字'
        }
      }
    }
  }
}).on('change', '[name="countrySelectBox"]', function(e) {
  $adminUserEditPage.find('form').formValidation('revalidateField', 'phone');
}).on('success.form.fv', function(e) {
  e.preventDefault();

  let $form = $(e.target),
      fv    = $form.data('formValidation');

  let data = $adminUserEditPage.find('form').serializeObject();

  let userId = $adminUserEditPage.find('#data_user_id').val();

  if (userId) {
    User.update(userId, data).then(function (res) {
      if (res && res.id) {
        UI.alert({
          message: '用户信息更新成功~'
        }).then(function () {
          window.location.href = '/admin/users';
        });
      } else {
        UI.alert('用户信息更新失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('用户信息更新失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    });
  } else {
    User.create(data).then(function (res) {
      if (res && res.id) {
        UI.confirm({
          message: '用户信息添加成功，是否继续添加？'
        }).catch(function () {
          location.href = '/admin/users';
        });
      } else {
        UI.alert('用户信息添加失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('用户信息添加失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    });
  }
});

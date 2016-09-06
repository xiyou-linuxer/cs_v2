'use strict';

import 'babel-polyfill';
import 'layouts/app';
import 'mods/pagination';

import UI from 'ui';
import User from 'apis/user';

let $adminUserListPage = $('.koala-admin-user-list-page');

$adminUserListPage.find('#user_select_form .form-control').on('change', function (e) {
  window.location.href = '/admin/users?' + $(this).attr('name') + '=' + $(this).val();
});

$adminUserListPage.find('table tbody .btn-delete').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  let id = $(this).data('id');
  let $row = $(this).parents('tr');
  UI.confirm('确定删除该用户吗？').then(function () {
    User.delete(id).then(function () {
      UI.alert({
        message: '用户删除成功~'
      }).then(function () {
        $row.remove();
      });
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('用户删除失败，请稍后再试~');
      }
    });
  });
});

$adminUserListPage.find('table tbody .btn-set-admin').on('click', function (e) {
  let userId = $(this).data('id');

  UI.confirm('设置为管理员之后，该用户将拥有极高的权限！<br>是否继续？')
  .then(function () {
    User.update(userId, {group: 1}).then(function () {
      UI.alert({
        message: '操作成功~'
      }).then(function () {
        window.location.href = '/admin/users';
      });
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('操作失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    });
  });
});

$adminUserListPage.find('table tbody .btn-unset-admin').on('click', function (e) {
  let userId = $(this).data('id');

  UI.confirm('取消管理员之后，该用户将不再具有任何管理权限！<br>是否继续？')
  .then(function () {
    User.update(userId, {group: 0}).then(function () {
      UI.alert({
        message: '操作成功~'
      }).then(function () {
        window.location.href = '/admin/users';
      });
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('操作失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    });
  });
});

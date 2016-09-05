'use strict';


import 'babel-polyfill';
import 'layouts/app';
import 'user-autocomplete';

import UI from 'ui';
import App from 'apis/app';

let $adminAppListPage = $('.koala-admin-app-list-page');

$adminAppListPage.find('#app_select_form .form-control').on('change', function (e) {
  window.location.href = '/admin/apps?' + $(this).attr('name') + '=' + $(this).val();
});

$adminAppListPage.find('table tbody .btn-delete').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  let id = $(this).data('id');
  let $row = $(this).parents('tr');

  UI.confirm('确定要删除该应用吗？').then(function () {
    App.delete(id).then(function () {
      UI.alert({
        message: '应用删除成功~'
      }).then(function () {
        $row.remove();
      });
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('应用删除失败，请稍后再试~');
      }
    });
  });
});

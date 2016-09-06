'use strict';

import './index.less';

import 'babel-polyfill';
import 'layouts/app';
import 'mods/pagination';
import 'mods/autocomplete';

import UI from 'ui';
import URL from 'utils/url';
import Message from 'apis/message';

let $messageListPage = $('.koala-message-list-page');

let $table = $messageListPage.find('table');
let $messageBtnGroups = $messageListPage.find('.message-btn-group');
let $messageFormControls = $messageListPage.find('.search-form-grop');

let $messageSelectForm = $messageListPage.find('#message_select_form');
$messageSelectForm.find('.form-control').on('change', function (e) {
  let data = $messageSelectForm.serializeObject();

  let query = URL.getQueryObject();
  data.page = 1;
  data.category = query.category;
  location.href = URL.getQueryString(data);
});

$table.find('thead .checkbox').on('change', function (e) {
  e.preventDefault();
  e.stopPropagation();
  let isChecked = $(this).prop('checked');
  $(this).parents('table').find('tbody .checkbox').prop('checked', isChecked);
  if (isChecked) {
    $messageBtnGroups.fadeIn(300);
    $messageFormControls.hide();
  } else {
    $messageBtnGroups.hide();
    $messageFormControls.fadeIn(300);
  }
});

$table.find('tbody .checkbox').on('change', function (e) {
  e.preventDefault();
  e.stopPropagation();
  let checkedAll = true;
  let hasChecked = false;
  $(this).parents('table').find('tbody .checkbox').each(function () {
    if (!$(this).prop('checked')) {
      checkedAll = false;
    } else {
      hasChecked = true;
    }
  });

  $table.find('thead .checkbox').prop('checked', checkedAll);
  if (hasChecked) {
    $messageBtnGroups.fadeIn(300);
    $messageFormControls.hide();
  } else {
    $messageBtnGroups.hide();
    $messageFormControls.fadeIn(300);
  }
});

$table.find('tbody tr').on('click', function (e) {
  let id = $(this).data('id');
  if ($(e.target).hasClass('checkbox')) {
    return true;
  }

  window.location.href = '/messages/' + id;
});

$messageListPage.find('#btn_message_read').on('click', function () {
  $table.find('tbody tr').removeClass('error');

  let ids = [];
  let $rows = $table.find('tbody .checkbox:checked').parents('tr');
  $rows.each(function () {
    let status = parseInt($(this).data('status'));
    if (status === 1) {
      ids.push($(this).data('id'));
    }
  });

  let failedList = [];
  let deletedList = [];
  let results = ids.map(function (id) {
    return new Promise(function (resolve, reject) {
      Message.getById(id).then(function () {
        deletedList.push(id);
        resolve();
      }).catch(function () {
        failedList.push(id);
        reject();
      });
    });
  });

  Promise.all(results).then(function () {
    UI.alert('批量标记信息成功~').then(function () {
      $rows.find('.message-status-label').removeClass('label-danger').addClass('label-success');
      $rows.find('.checkbox:checked').prop('checked', false);
      $table.find('thead .checkbox').prop('checked', false);

      $messageBtnGroups.hide();
      $messageFormControls.fadeIn(300);
    });
  }).catch(function () {
    UI.alert('批量操作发生错误，部分或全部信息未成功标记~').then(function () {
      deletedList.forEach(function (id) {
        let $row = $('table tbody tr[data-id="' + id + '"]');
        $row.find('.message-status-label').removeClass('label-danger').addClass('label-success');
      });

      failedList.forEach(function (id) {
        $('table tbody tr[data-id="' + id + '"]').addClass('error');
      });

      $rows.find('.checkbox:checked').prop('checked', false);
      $table.find('thead .checkbox').prop('checked', false);

      $messageBtnGroups.hide();
      $messageFormControls.fadeIn(300);
    });
  });
});

$messageListPage.find('#btn_message_delete').on('click', function () {
  $table.find('tbody tr').removeClass('error');

  UI.confirm('确定要删除选定消息吗？').then(function () {
    let ids = [];
    let $rows = $table.find('tbody .checkbox:checked').parents('tr');
    $rows.each(function () {
      ids.push($(this).data('id'));
    });

    let failedList = [];
    let deletedList = [];
    let results = ids.map(function (id) {
      return new Promise(function (resolve, reject) {
        Message.delete(id).then(function () {
          deletedList.push(id);
          resolve();
        }).catch(function () {
          failedList.push(id);
          reject();
        });
      });
    });

    Promise.all(results).then(function () {
      UI.alert('批量删除成功~').then(function () {
        setTimeout(function () {
          location.reload();
          $rows.remove();
          if ($table.find('tbody tr').length === 0) {
            $('<div class="well bg-light m-t-lg text-center">暂无数据~</div>').appendTo($table.parent());
            $table.remove();
          }
        }, 300);
        $messageBtnGroups.hide();
        $messageFormControls.fadeIn(300);
      });
    }).catch(function () {
      UI.alert('批量操作发生错误，部分或全部信息未成功删除~').then(function () {
        deletedList.forEach(function (id) {
          let $row = $('table tbody tr[data-id="' + id + '"]');
          setTimeout(function () {
            $row.remove();
            if ($table.find('tbody tr').length === 0) {
              $('<div class="well bg-light m-t-lg text-center">暂无数据~</div>').appendTo($table.parent());
              $table.remove();
            } else {
              $table.find('tbody .checkbox:checked').prop('checked', false);
              $table.find('thead .checkbox').prop('checked', false);
            }
          }, 300);

          $messageBtnGroups.hide();
          $messageFormControls.fadeIn(300);
        });

        failedList.forEach(function (id) {
          $table.find('tbody tr[data-id="' + id + '"]').addClass('error');
        });
      });
    });
  });
});

'use strict';

define([
  'ui',
  '../apis/message'
], function (require, exports, module) {

  var UI = require('ui');
  var Message = require('../apis/message');
  var $table = $('table');
  var $messageBtns = $('.message-group-btn');

  $table.find('thead .checkbox').on('change', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var isChecked = $(this).prop('checked');
    $(this).parents('table').find('tbody .checkbox').prop('checked', isChecked);
    if (isChecked) {
      $messageBtns.fadeIn(300);
    } else {
      $messageBtns.fadeOut(300);
    }
  });

  $table.find('tbody .checkbox').on('change', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var checkedAll = true;
    var hasChecked = false;
    $(this).parents('table').find('tbody .checkbox').each(function () {
      if (!$(this).prop('checked')) {
        checkedAll = false;
      } else {
        hasChecked = true;
      }
    });

    $table.find('thead .checkbox').prop('checked', checkedAll);
    if (hasChecked) {
      $messageBtns.fadeIn(300);
    } else {
      $messageBtns.fadeOut(300);
    }
  });

  $table.find('tbody tr').on('click', function (e) {
    var id = $(this).data('id');
    if ($(e.target).hasClass('checkbox')) {
      return true;
    }

    window.location.href = '/messages/' + id;
  });

  $('#btn_message_read').on('click', function () {
    $table.find('tbody tr').removeClass('error');

    var ids = [];
    var $rows = $table.find('tbody .checkbox:checked').parents('tr');
    $rows.each(function () {
      var status = parseInt($(this).data('status'));
      if (status === 1) {
        ids.push($(this).data('id'));
      }
    });

    var failedList = [];
    var deletedList = [];
    var results = ids.map(function (id) {
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
        $messageBtns.fadeOut(300);
      });
    }).catch(function () {
      UI.alert('批量操作发生错误，部分或全部信息未成功标记~').then(function () {
        deletedList.forEach(function (id) {
          var $row = $('table tbody tr[data-id="' + id + '"]');
          $row.find('.message-status-label').removeClass('label-danger').addClass('label-success');
        });

        failedList.forEach(function (id) {
          $('table tbody tr[data-id="' + id + '"]').addClass('error');
        });

        $rows.find('.checkbox:checked').prop('checked', false);
        $table.find('thead .checkbox').prop('checked', false);
        $messageBtns.fadeOut(300);
      });
    });
  });

  $('#btn_message_delete').on('click', function () {
    $table.find('tbody tr').removeClass('error');

    UI.confirm('确定要删除选定消息吗？').then(function () {
      var ids = [];
      var $rows = $table.find('tbody .checkbox:checked').parents('tr');
      $rows.each(function () {
        ids.push($(this).data('id'));
      });

      var failedList = [];
      var deletedList = [];
      var results = ids.map(function (id) {
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
            $rows.remove();
            if ($table.find('tbody tr').length === 0) {
              $('<div class="well bg-light m-t-lg text-center">暂无数据~</div>').appendTo($table.parent());
              $table.remove();
            }
          }, 300);
          $messageBtns.fadeOut(300);
        });
      }).catch(function () {
        UI.alert('批量操作发生错误，部分或全部信息未成功删除~').then(function () {
          deletedList.forEach(function (id) {
            var $row = $('table tbody tr[data-id="' + id + '"]');
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
            $messageBtns.fadeOut(300);
          });

          failedList.forEach(function (id) {
            $table.find('tbody tr[data-id="' + id + '"]').addClass('error');
          });
        });
      });
    });
  });
});

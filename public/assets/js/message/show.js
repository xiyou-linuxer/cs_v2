'use strict';

define(['ui', '../apis/message'], function (require, exports, module) {
  var UI = require('ui');
  var Message = require('../apis/message');

  $('#btn_message_delete').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var id = $(this).data('id');

    UI.confirm('确定要删除该消息吗？').then(function () {
      Message.delete(id).then(function () {
        UI.alert('消息删除成功~').then(function () {
          location.href = '/messages';
        });
      }).catch(function (err) {
        if (err && err.message) {
          UI.alert(err.message);
        } else {
          UI.alert('消息删除失败，请稍后再试~');
        }
      });
    });
  });
});
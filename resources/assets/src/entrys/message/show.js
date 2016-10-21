'use strict';

import 'babel-polyfill';
import 'layouts/app';
import 'mods/markdown';
import './show.less';

import UI from 'ui';
import Message from 'apis/message';

let $messageShowPage = $('.koala-message-show-page');

$messageShowPage.find('#btn_message_delete').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  let id = $(this).data('id');

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

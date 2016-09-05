'use strict';

import './edit.less';

import 'babel-polyfill';
import 'layouts/app';
import 'mods/markdown';
import 'user-autocomplete';

import UI from 'ui';
import Message from 'apis/message';

let $messageEditPage = $('.koala-message-edit-page');

$messageEditPage.find('#message_form').formValidation({
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
    'title': {
      validators: {
        notEmpty: {
          message: '标题不能为空'
        }
      }
    }
  }
}).on('success.form.fv', function(e) {
  e.preventDefault();

  let $form  = $(e.target),
      fv     = $form.data('formValidation'),
      $btn   = fv.getSubmitButton(),
      action = $btn.data('action');

  let data = $('#message_form').serializeObject();
  data.content = window.editor.codemirror.getValue();

  if (!data.content) {
    fv.disableSubmitButtons(false);
    return UI.alert('内容不能为空~');
  }

  data.status = (action === 'send') ? 1 : 0;

  let messageId = $('#data_message_id').val();

  if (messageId) {
    Message.update(messageId, data).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  } else {
    Message.create(data).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  }

  function resolve(res) {
    if (res && res.id) {
      UI.alert({
        message: data.status === 1 ? '消息发送成功~' : '草稿保存成功~'
      }).then(function() {
        window.location.href = '/messages/' + res.id;
      });
    } else {
      UI.alert({
        message: data.status === 1 ? '消息发送失败，请稍后再试~': '草稿保存失败，请稍后再试'
      });
    }
  }

  function reject(err) {
    if (err && err.message) {
      UI.alert(err.message);
    } else {
      UI.alert({
        message: data.status === 1 ? '消息发送失败，请稍后再试~': '草稿保存失败，请稍后再试'
      });
    }
  }
});

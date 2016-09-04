'use strict';

define(['ui', '../apis/message', 'user-autocomplete', 'jquery.serializeObject'], function (require, exports, module) {
  require('user-autocomplete');
  require('jquery.serializeObject');

  var UI = require('ui');
  var Message = require('../apis/message');

  $('#message_form').formValidation({
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
  }).on('success.form.fv', function (e) {
    e.preventDefault();

    var $form = $(e.target),
        fv = $form.data('formValidation'),
        $btn = fv.getSubmitButton(),
        action = $btn.data('action');

    var data = $('#message_form').serializeObject();
    data.content = window.editor.codemirror.getValue();

    if (!data.content) {
      fv.disableSubmitButtons(false);
      return UI.alert('内容不能为空~');
    }

    data.status = action === 'send' ? 1 : 0;

    var messageId = $('#data_message_id').val();

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
        }).then(function () {
          window.location.href = '/messages/' + res.id;
        });
      } else {
        UI.alert({
          message: data.status === 1 ? '消息发送失败，请稍后再试~' : '草稿保存失败，请稍后再试'
        });
      }
    }

    function reject(err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert({
          message: data.status === 1 ? '消息发送失败，请稍后再试~' : '草稿保存失败，请稍后再试'
        });
      }
    }
  });
});
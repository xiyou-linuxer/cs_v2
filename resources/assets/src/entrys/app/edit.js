'use strict';

import './edit.less';

import 'babel-polyfill';
import 'layouts/app';

import UI from 'ui';
import App from 'apis/app';

let $appEditPage = $('.koala-app-edit-page');

let $appForm = $appEditPage.find('#app_form');

let editor = new Editor({
  autofocus: false,
  element: $appForm.find('[name="content"]').get(0)
});

editor.render();

$appForm.find('.loading').fadeOut();


$appForm.formValidation({
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
    'client_id': {
      validators: {
        notEmpty: {
          message: 'CLIENT_ID不能为空'
        }
      }
    },
    'name': {
      validators: {
        notEmpty: {
          message: '应用名称不能为空'
        }
      }
    },
    'homepage_url': {
      validators: {
        notEmpty: {
          message: '应用主页链接不能为空'
        },
        uri: {
          message: '应用主页链接必须为合法的URL'
        }
      }
    },
    'logo_url': {
      validators: {
        notEmpty: {
          message: '应用Logo图片链接不能为空'
        },
        uri: {
          message: '应用Logo图片链接必须为合法的URL'
        }
      }
    },
    'redirect_uri': {
      validators: {
        notEmpty: {
          message: '应用Oauth授权回调地址不能为空'
        },
        uri: {
          message: '应用Oauth授权回调地址必须为合法的URL'
        }
      }
    }
  }
}).on('change', '[name="scopes"]', function(e) {
  let value = $(this).val();
  let level = $(this).data('level');
  let checked = $(this).prop('checked');

  let $formGroup = $(this).parents('.form-group');
  let sameLevelChecked = false;
  $formGroup.find('[name="scopes"][data-level="' + level + '"]').each(function () {
    if ($(this).val() != value && $(this).prop('checked')) {
      sameLevelChecked = true;
      return false;
    }
  });

  if (sameLevelChecked) {
    return false;
  }

  $formGroup.find('[name="scopes"]').each(function () {
    if ($(this).data('level') < level) {
      if (checked) {
        $(this).prop('disabled', true).prop('checked', false);
      } else {
        $(this).prop('disabled', false).prop('checked', false);
      }
    }
  });

  let fv = $appForm.data('formValidation');
  fv.disableSubmitButtons(false);
}).on('change', '[name="status"]', function(e) {
  let fv = $appForm.data('formValidation');
  fv.disableSubmitButtons(false);
}).on('success.form.fv', function(e) {
  e.preventDefault();

  let $form = $(e.target),
      fv    = $form.data('formValidation');
  let data  = $appForm.serializeObject();

  data.content = editor.codemirror.getValue();

  if (Array.isArray(data.scopes)) {
    data.scopes = data.scopes.join(',');
  }

  let appId = $appEditPage.find('#data_app_id').val();
  if (appId) {
    App.update(appId, data).then(function (res) {
      if (res && res.id) {
        UI.alert({
          message: '应用保存成功~'
        }).then(function() {
          window.location.href = '/apps/' + res.client_id;
        });
      } else {
        UI.alert('应用保存失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('应用保存失败，请稍后再试~');
        fv.disableSubmitButtons(false);
      }
    });
  } else {
    App.create(data).then(function (res) {
      if (res && res.id) {
        UI.alert({
          message: '应用创建成功~'
        }).then(function() {
          window.location.href = '/apps/' + res.client_id;
        });
      } else {
        UI.alert('应用创建失败，请稍后再试~');
      }
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('应用创建失败，请稍后再试~');
      }
    });
  }
});

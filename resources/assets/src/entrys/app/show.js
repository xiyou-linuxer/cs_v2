'use strict';

import './show.less';

import 'babel-polyfill';
import 'layouts/app';

import UI from 'ui';
import App from 'apis/app';

let $appShowPage = $('.koala-app-show-page');

let appId = $appShowPage.find('#data_app_id').val();

$appShowPage.find('.secret-component .toggle-btn').on('click', function (e) {
  e.preventDefault();
  $appShowPage.find('.secret-component').toggleClass('open');
});

$appShowPage.find('#btn_refresh_secret').on('click', function (e) {
  App.refreshSecret(appId).then(function (res) {
    if (res && res.id) {
      $appShowPage.find('#app_secrect_field').html(res.secret);
    } else {
      UI.alert('应用secret刷新失败，请稍后再试~');
    }
  }).catch(function (err) {
    if (err && err.message) {
      UI.alert(err.message);
    } else {
      UI.alert('应用secret刷新失败，请稍后再试~');
    }
  });
});

$appShowPage.find('#btn_app_confirm').on('click', function (e) {
  App.confirm(appId).then(function (res) {
    if (res && res.id) {
      UI.alert('应用已审核通过~').then(function () {
        location.reload();
      });
    } else {
      UI.alert('操作失败，请稍后再试~');
    }
  }).catch(function (err) {
    if (err && err.message) {
      UI.alert(err.message);
    } else {
      UI.alert('操作失败，请稍后再试~');
    }
  });
});

$appShowPage.find('#btn_app_reject').on('click', function (e) {
  App.reject(appId).then(function (res) {
    if (res && res.id) {
      UI.alert('操作成功，应用审核不通过~').then(function () {
        location.reload();
      });
    } else {
      UI.alert('操作失败，请稍后再试~');
    }
  }).catch(function (err) {
    if (err && err.message) {
      UI.alert(err.message);
    } else {
      UI.alert('操作失败，请稍后再试~');
    }
  });
});

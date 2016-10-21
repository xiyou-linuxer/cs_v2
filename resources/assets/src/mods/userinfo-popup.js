'use strict';

import './userinfo-popup.less';

import 'babel-polyfill';
import User from 'apis/user';
import Xtemplate from 'xtemplate';

let tpl = `
  <div class="user-info-popup">
    <div class="panel">
      <div class="arrow"></div>
      <div class="panel-body">
        <div class="avatar thumb-md">
          <img src="{{avatar_url}}">
        </div>
        <div class="infos">
          <a href="/users/{{id}}" class="name" target="_blank">{{name}}</a>
          <div class="workplace">{{workplace}}</div>
        </div>
        <div class="actions">
          <a href="/messages/_new?receiver_id={{id}}" class="btn btn-success btn-sm btn-send-message" target="_blank">
            <i class="fa fa-envelope-o icon"></i> 发消息
          </a>
        </div>
        <ul class="contacts">
          <li class="email" rel="{{email}}" title="发送邮件：{{email}}"><i class="fa fa-envelope-o"></i></li>
          <li><a href="{{github_url}}" target="_blank"><i class="fa fa-github"></i></a></li>
          <li><a href="{{blog_url}}" target="_blank"><i class="fa fa-internet-explorer"></i></a></li>
        </ul>
      </div>
    </div>
  </div>`;

$(document).on('mouseenter', '[data-user-id]', function () {
  let $elem = $(this);
  let id = $elem.data('userId');
  return User.getById(id).then(function (data) {
    let html = new Xtemplate(tpl).render(data);

    let $context = $(html);

    let winWidth = $(window).width();
    let winHeight = $(window).height();
    let offset = $elem.offset();
    let top = offset.top + $elem.height();
    let left = offset.left - 100 + $elem.width() / 2;

    left = left > 0 ? left : 0;
    left = winWidth - left > 200 ? left : winWidth - 200;

    $context.css({
      left: left,
      top: top
    });

    $('.user-info-popup').remove();
    $context.appendTo('body').fadeIn();

  }).catch(function (err) {
    console.log('获取用户信息失败！', err);
  });
});

let timer;
$(document).on('mouseleave', '[data-user-id]', function () {
  timer = setTimeout(function () {
    let $popups = $('.user-info-popup');
    $popups.fadeOut(300);
    setTimeout(function () {
      $popups.remove();
    }, 300);
  }, 100);
});

$(document).on('mouseenter', '.user-info-popup', function (e) {
  if (timer) {
    clearTimeout(timer);
  }
});

$(document).on('mouseleave', '.user-info-popup', function (e) {
  let $popups = $(this);
  $popups.fadeOut(300);
  setTimeout(function () {
    $popups.remove();
  }, 300);
});

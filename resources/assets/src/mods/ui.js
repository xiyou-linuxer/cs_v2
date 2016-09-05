'use strict';

import './ui.less';

import 'babel-polyfill';
import $ from 'jquery';
import Xtemplate from 'xtemplate';

/**
 * alert弹窗
 * @param  {object} opts
 */
exports.alert = function (opts) {
  return new Promise(function (resolve, reject) {
    let defaultOpts = {
      title: '提示',
      message: '',
      btnText: '确定'
    };

    if (typeof(opts) === 'string') {
      opts = {
        message: opts
      };
    }

    opts = $.extend(defaultOpts, opts);

    let tpl = `
      <div class="ui-alert">
        <div class="alert-inner">
          <header>
            <span class="alert-title"><i class="fa fa-info-circle m-r"></i>{{title}}</span>
            <a href="#" class="alert-close">
              <i class="fa fa-times"></i>
            </a>
          </header>
          <div class="alert-body">{{{message}}}</div>
          <footer>
            <span class="btn btn-success btn-ok">{{btnText}}</span>
          </footer>
        </div>
      </div>`;

    let html = new Xtemplate(tpl).render(opts);
    let $elem = $(html);

    // 绑定DOM事件
    $elem.on('click', '.alert-close, .btn-ok', function (e) {
      e.preventDefault();

      $elem.fadeOut(300);
      setTimeout(function () {
        $elem.remove();
        resolve();
      }, 300);
    });

    $elem.appendTo('body').fadeIn(300);
  });
};

/**
 * alert弹窗
 * @param  {object} opts
 */
exports.confirm = function (opts) {
  return new Promise(function (resolve, reject) {
    let defaultOpts = {
      title: '提示',
      message: '',
      btnText: '确定'
    };

    if (typeof(opts) === 'string') {
      opts = {
        message: opts
      };
    }

    opts = $.extend(defaultOpts, opts);

    let tpl = `
      <div class="ui-alert">
        <div class="alert-inner">
          <header>
            <span class="alert-title"><i class="fa fa-info-circle m-r"></i>{{title}}</span>
            <a href="#" class="alert-close">
              <i class="fa fa-times"></i>
            </a>
          </header>
          <div class="alert-body">{{{message}}}</div>
          <footer>
            <span class="btn btn-success btn-ok m-r">{{btnText}}</span>
            <span class="btn btn-danger btn-cancel m-l">取消</span>
          </footer>
        </div>
      </div>`;

    let html = new Xtemplate(tpl).render(opts);
    let $elem = $(html);

    // 绑定DOM事件
    $elem.on('click', '.btn-ok', function (e) {
      e.preventDefault();

      $elem.fadeOut(300);
      setTimeout(function () {
        $elem.remove();
        resolve();
      }, 300);
    }).on('click', '.alert-close, .btn-cancel', function (e) {
      e.preventDefault();

      $elem.fadeOut(300);
      setTimeout(function () {
        $elem.remove();
        reject();
      }, 300);
    });

    $elem.appendTo('body').fadeIn(300);
  });
};

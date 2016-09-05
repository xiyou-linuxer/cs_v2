'use strict';

import './user-autocomplete.less';

import 'babel-polyfill';
import Xtemplate from 'xtemplate';

let listTemplate = `{{#each (this)}}
  <li data-id="{{id}}" data-name="{{name}}">
    <div class="avatar">
      <img src="{{avatar_url}}">
    </div>
    <div class="info">
      <p class="name">{{name}}</p>
      <p class="workplace">{{workplace}}</p>
    </div>
  </li>
  {{/each}}
  {{#if (this.length === 0)}}
    <li class="error">暂无数据</li>
  {{/if}}`;

function autocomplete (selector) {
  let $origin = $(selector);

  let className = $origin.attr('class');

  $origin.addClass('user-autocomplete-origin');
  let $component = $('<div class="user-autocomplete"></div>');
  let $inputBox = $('<div class="input-box"></div>').addClass(className).appendTo($component);
  let $list = $('<ul class="user-select"></ul').appendTo($component);

  let $input = $('<input placeholder="请输入用户名称">').appendTo($inputBox);
  let $label = $('<span class="label label-info"></span>');

  $origin.after($component);

  let timer, lastValue, value;
  $input.on('keyup', function (e) {
    e.preventDefault();
    e.stopPropagation();

    lastValue = value;
    value = $(this).val();

    if (!value) {
      $list.hide();
    }

    if (e.keyCode === 8) {
      if (!lastValue && !value) {
        $inputBox.find('.label').last().remove();

        let ids = [];
        $inputBox.find('.label').each(function () {
          ids.push($(this).data('id'));
        });

        $origin.val(ids.join(',')).trigger('change');
      }
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      if (!value) {
        return false;
      }

      $.ajax({
        url: '/api/users',
        method: 'GET',
        data: {
          keyword: value,
          per_page: 3
        },
        success: function (res) {
          if (res && res.data) {
            let html = new Xtemplate(listTemplate).render(res.data);
            $list.html(html).show();
          } else {
            let html = new Xtemplate(listTemplate).render([]);
            $list.html(html).show();
          }
        }
      });
    }, 300);
  });

  $list.delegate('li', 'click', function () {
    let id = $(this).data('id');
    let name = $(this).data('name');
    $origin.attr('value', id);
    $list.hide();

    if ($origin.data('type') === 'single') {
      $input.siblings('.label').remove();
    }

    $input.before($label.clone().data('id', id).html(name));

    let ids = [];
    $inputBox.find('.label').each(function () {
      ids.push($(this).data('id'));
    });

    $origin.val(ids.join(',')).trigger('change');
    $input.val('').focus();
    value = '';
  });

  let dataValue = $origin.data('value') + '';
  let ids = dataValue ? dataValue.split(',') : [];

  if ($origin.data('type') === 'single') {
    ids = ids.slice(0, 1);
  }

  let receiverPromises = ids.map(function (id) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: '/api/users/' + id,
        method: 'GET',
        success: function (data) {
          resolve(data);
        },
        error: function (err) {
          reject(err);
        }
      });
    });
  });

  Promise.all(receiverPromises).then(function (receivers) {
    let ids = [];
    receivers.forEach(function (receiver) {
      ids.push(receiver.id);
      $input.before($label.clone().data('id', receiver.id).html(receiver.name));
    });
    $origin.val(ids.join(','));
  });

}

autocomplete('[data-toggle="user-autocomplete"]');

'use strict';

import './autocomplete.less';

import 'babel-polyfill';
import Xtemplate from 'xtemplate';

let listTemplate = `{{#each (this)}}
  <li data-id="{{client_id || id}}" data-name="{{name}}">
    <div class="avatar">
      <img src="{{logo_url || avatar_url}}">
    </div>
    <div class="info">
      <p class="name">{{name}}</p>
      <p class="workplace">{{#if (client_id)}}{{author.name}}{{else}}{{workplace}}{{/if}}</p>
    </div>
  </li>
  {{/each}}
  {{#if (this.length === 0)}}
    <li class="error">暂无数据</li>
  {{/if}}`;

function autocomplete (selector) {
  let $origin = $(selector);

  let autocompleteType = $origin.data('autocomplete-type');
  let autocompleteLimit = parseInt($origin.data('autocomplete-limit')) || 0;

  let remotePath = autocompleteType === 'app' ? '/api/apps/' : '/api/users/';

  let className = $origin.attr('class');
  $origin.addClass('koala-autocomplete-origin');
  let $component = $('<div class="koala-autocomplete"></div>');
  let $inputBox = $('<div class="input-box"></div>').addClass(className).appendTo($component);
  let $list = $('<ul class="user-select"></ul').appendTo($component);

  let placeholder = $origin.attr('placeholder');
  let $input = $('<input placeholder="' + placeholder + '">').appendTo($inputBox);
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
        url: remotePath,
        method: 'GET',
        data: {
          keyword: value,
          per_page: 5
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

    let oldSiblingsCount = autocompleteLimit - 1;
    if (oldSiblingsCount >= 0) {
        $input.siblings('.label').slice(oldSiblingsCount).remove();
    }

    $input.siblings('.label').each(function () {
      if ($(this).data('id') === id) {
        $(this).remove();
      }
    });

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

  if (autocompleteLimit) {
    ids = ids.slice(0, autocompleteLimit);
  }

  let receiverPromises = ids.map(function (id) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: remotePath + id,
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

  Promise.all(receiverPromises).then(function (items) {
    let ids = [];
    items.forEach(function (item) {
      let id = item.client_id ? item.client_id : item.id;
      ids.push(item.id);
      $input.before($label.clone().data('id', item.id).html(item.name));
    });
    $origin.val(ids.join(','));
  });

}

autocomplete('[data-toggle="koala-autocomplete"]');

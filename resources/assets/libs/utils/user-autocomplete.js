define([
  'xtemplate'
], function (require, exports, module) {
  var Xtemplate = require('xtemplate');

  var listTemplate = `{{#each (this)}}
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
    $origin = $(selector);

    var className = $origin.attr('class');

    $origin.addClass('user-autocomplete-origin');
    $component = $('<div class="user-autocomplete"></div>');
    $inputBox = $('<div class="input-box"></div>').addClass(className).appendTo($component);
    $list = $('<ul class="user-select"></ul').appendTo($component);

    $input = $('<input placeholder="请输入用户名称">').appendTo($inputBox);
    $label = $('<span class="label label-info"></span>');

    $origin.after($component);

    var timer, lastValue, value;
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

          var ids = [];
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
              var html = new Xtemplate(listTemplate).render(res.data);
              $list.html(html).show();
            } else {
              var html = new Xtemplate(listTemplate).render([]);
              $list.html(html).show();
            }
          }
        });
      }, 300);
    });

    $list.delegate('li', 'click', function () {
      var id = $(this).data('id');
      var name = $(this).data('name');
      $origin.attr('value', id);
      $list.hide();

      if ($origin.data('type') === 'single') {
        $input.siblings('.label').remove();
      }

      $input.before($label.clone().data('id', id).html(name));

      var ids = [];
      $inputBox.find('.label').each(function () {
        ids.push($(this).data('id'));
      });

      $origin.val(ids.join(',')).trigger('change');
      $input.val('').focus();
      value = '';
    });

    var dataValue = $origin.data('value') + '';
    var ids = dataValue ? dataValue.split(',') : [];

    if ($origin.data('type') === 'single') {
      ids = ids.slice(0, 1);
    }

    var receiverPromises = ids.map(function (id) {
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
      var ids = [];
      receivers.forEach(function (receiver) {
        ids.push(receiver.id);
        $input.before($label.clone().data('id', receiver.id).html(receiver.name));
      });
      $origin.val(ids.join(','));
    });

  }

  autocomplete('[data-toggle="user-autocomplete"]');
});

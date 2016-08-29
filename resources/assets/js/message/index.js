'use strict';

define([
  'ui',
], function (require, exports, module) {

  var UI = require('ui');

  $('#messageSelect').on('change', function () {
    var type = $(this).val();
    console.log(type);
    if (type === 'none') {
      $('table tbody .checkbox').prop('checked', false);
    } else if (type === 'all') {
      $('table tbody .checkbox').prop('checked', true);
    } else if (type === 'unread') {

    }
  })

  $('table thead .checkbox').on('change', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var isChecked = $(this).prop('checked');
    $(this).parents('table').find('tbody .checkbox').prop('checked', isChecked);
  });

  $('table tbody tr').on('click', function () {
    var id = $(this).data('id');
    window.location.href = '/messages/' + id;
  });
});

'use strict';

import  'babel-polyfill';
import $ from 'jquery';
import url from 'utils/url';

let $pagination = $('.pagination');

let search = location.search;
let query = url.getQueryObject(search);

$pagination.find('li a').each(function () {
  let href = $(this).attr('href');
  let reg = /page=(\d*)/;

  if (!reg.test(href)) {
    return;
  }

  let _query = Object.assign({}, query);
  let page = parseInt(reg.exec(href)[1]) || 1;

  _query.page = page;

  let querystring = url.getQueryString(_query);

  $(this).attr('href', querystring);
});

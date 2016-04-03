'use strict';

define([
  'jquery.cookie'
], function (require, exports, module) {
  require('jquery.cookie');

  $('[data-toggle="tooltip"]').tooltip({
    html: true,
    container: 'body'
  });

  $(".page-with-sidebar").tooltip({
    selector: ".sidebar-collapsed .sidebar-nav a, .sidebar-collapsed a.sidebar-user",
    placement: "right",
    container: "body"
  });

  $(document).on('click', '.nav-collapse-toggle', function(e) {
    e.preventDefault();

    $('.page-with-sidebar').toggleClass('page-sidebar-collapsed page-sidebar-expanded');
    $('header.navbar').toggleClass('header-collapsed header-expanded');
    $('aside.sidebar').toggleClass('sidebar-collapsed sidebar-expanded');
    $('.nav-collapse-toggle i').toggleClass('fa-angle-right fa-angle-left');
    $.cookie('collapsed_nav', $('.page-with-sidebar').hasClass('page-sidebar-collapsed'));
/*    setTimeout(function() {
        var t;
        return t = $(".nicescroll").niceScroll(),
        t.updateScrollBar()
    }, 300)
*/
  });
});

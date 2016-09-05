'use strict';

import './app.less';

import 'babel-polyfill';

import UI from 'ui';
import $ from 'jquery';
import News from 'apis/news';

const jQuery = $;

// toogle fullscreen
$(document).on('click', "[data-toggle=fullscreen]", function(e){
  e.preventDefault();
  if (screenfull.enabled) {
    screenfull.request();
  }
});

// placeholder
//$('input[placeholder], textarea[placeholder]').placeholder();

// popover
$("[data-toggle=popover]").popover();
$(document).on('click', '.popover-title .close', function(e){
	let $target = $(e.target), $popover = $target.closest('.popover').prev();
	$popover && $popover.popover('hide');
});

// ajax modal
$(document).on('click', '[data-toggle="ajaxModal"]',
  function(e) {
    $('#ajaxModal').remove();
    e.preventDefault();
    let $this = $(this)
      , $remote = $this.data('remote') || $this.attr('href')
      , $modal = $('<div class="modal fade" id="ajaxModal"><div class="modal-body"></div></div>');
    $('body').append($modal);
    $modal.modal();
    $modal.load($remote);
  }
);

// dropdown menu
$.fn.dropdown.Constructor.prototype.change = function(e){
  e.preventDefault();
  let $item = $(e.target), $select, $checked = false, $menu, $label;
  !$item.is('a') && ($item = $item.closest('a'));
  $menu = $item.closest('.dropdown-menu');
  $label = $menu.parent().find('.dropdown-label');
  $labelHolder = $label.text();
  $select = $item.parent().find('input');
  $checked = $select.is(':checked');
  if($select.is(':disabled')) return;
  if($select.attr('type') == 'radio' && $checked) return;
  if($select.attr('type') == 'radio') $menu.find('li').removeClass('active');
  $item.parent().removeClass('active');
  !$checked && $item.parent().addClass('active');
  $select.prop("checked", !$select.prop("checked"));

  $items = $menu.find('li > input:checked');
  if ($items.length) {
      $text = [];
      $items.each(function () {
          let $str = $(this).parent().text();
          $str && $text.push($.trim($str));
      });

      $text = $text.length < 4 ? $text.join(', ') : $text.length + ' selected';
      $label.html($text);
  }else{
    $label.html($label.data('placeholder'));
  }
}
$(document).on('click.dropdown-menu', '.dropdown-select > li > a', $.fn.dropdown.Constructor.prototype.change);

// tooltip
$("[data-toggle=tooltip]").tooltip();

// class
$(document).on('click', '[data-toggle^="class"]', function(e) {
	e && e.preventDefault();
	let $this = $(e.target), $class , $target, $tmp, $classes, $targets;
	!$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
	$class = $this.data()['toggle'];
	$target = $this.data('target') || $this.attr('href');
  $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
  $target && ($targets = $target.split(','));
  $classes && $classes.length && $.each($targets, function( index, value ) {
    if ( $classes[index].indexOf( '*' ) !== -1 ) {
      let patt = new RegExp( '\\s' +
          $classes[index].
            replace( /\*/g, '[A-Za-z0-9-_]+' ).
            split( ' ' ).
            join( '\\s|\\s' ) +
          '\\s', 'g' );
      $($this).each( function ( i, it ) {
        let cn = ' ' + it.className + ' ';
        while ( patt.test( cn ) ) {
          cn = cn.replace( patt, ' ' );
        }
        it.className = $.trim( cn );
      });
    }
    ($targets[index] !='#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
  });
	$this.toggleClass('active');
});

// panel toggle
$(document).on('click', '.panel-toggle', function(e){
  e && e.preventDefault();
  let $this = $(e.target), $class = 'collapse' , $target;
  if (!$this.is('a')) $this = $this.closest('a');
  $target = $this.closest('.panel');
    $target.find('.panel-body').toggleClass($class);
    $this.toggleClass('active');
});

// carousel
$('.carousel.auto').carousel();

// button loading
$(document).on('click.button.data-api', '[data-loading-text]', function (e) {
    let $this = $(e.target);
    $this.is('i') && ($this = $this.parent());
    $this.button('loading');
});

let $window = $(window);
// mobile
let mobile = function(option){
	if(option == 'reset'){
		$('[data-toggle^="shift"]').shift('reset');
		return true;
	}
	$('[data-toggle^="shift"]').shift('init');
  return true;
};
// unmobile
$window.width() < 768 && mobile();
// resize
let $resize, $width = $window.width();
$window.resize(function() {
  if($width !== $window.width()){
    clearTimeout($resize);
    $resize = setTimeout(function(){
      setHeight();
      $window.width() < 768 && mobile();
      $window.width() >= 768 && mobile('reset') && fixVbox();
      $width = $window.width();
    }, 500);
  }
});

// fluid layout
let setHeight = function(){
  $('.app-fluid #nav > *').css('min-height', $(window).height()-60);
  return true;
}
setHeight();


// fix vbox
let fixVbox = function(){
  $('.ie11 .vbox').each(function(){
    $(this).height($(this).parent().height());
  });
  return true;
}
fixVbox();

// collapse nav
$(document).on('click', '[data-ride="collapse"] a', function (e) {
  let $this = $(e.target), $active;
  $this.is('a') || ($this = $this.closest('a'));

  $active = $this.parent().siblings( ".active" );
  $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);

  ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
  $this.parent().toggleClass('active');

  $this.next().is('ul') && e.preventDefault();

  setTimeout(function(){ $(document).trigger('updateNav'); }, 300);
});

// dropdown still
$(document).on('click.bs.dropdown.data-api', '.dropdown .on, .dropup .on, .open .on', function (e) { e.stopPropagation() });

$(".chosen-select").length && $(".chosen-select").chosen({
  no_results_text: 'Oops, 未找到匹配项',
  disable_search_threshold: 10
});

$(document).on('click', '#navbar_toggle, #user_list_toggle', function () {
  $.cookie('left_sidebar_collapsed', $('#nav').hasClass('nav-xs'), {
    path: '/'
  });
  $.cookie('right_sidebar_collapsed', $('#aside_user_list').hasClass('nav-xs'), {
    path: '/'
  });
});

$('#global_search_btn').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  let keyword = $('#global_search_input').val();

  if (!keyword) {
    UI.alert({
      message: '搜索关键字不能为空~'
    });
    return;
  }

  location.href = '/search/' + keyword;
});

$('#global_news_form').formValidation({
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
    'topic': {
      validators: {
        notEmpty: {
          message: '该字段不能为空'
        }
      }
    },
    'content': {
      validators: {
        notEmpty: {
          message: '该字段不能为空'
        }
      }
    }
  }
}).on('success.form.fv', function(e) {
  e.preventDefault();

  let $form = $(e.target),
      fv    = $form.data('formValidation');

  let data = $form.serializeObject();

  News.create(data).then(function (res) {
    if (res && res.id) {
      UI.alert({
        message: '动态发表成功~'
      }).then(function() {
        window.location.href = '/';
      });
    } else {
      UI.alert('动态发表失败，请稍后再试~');
      fv.disableSubmitButtons(false);
    }
  }).catch(function (err) {
    console.log(err)
    if (err && err.message) {
      UI.alert(err.message);
    } else {
      UI.alert('动态发表失败，请稍后再试~');
      fv.disableSubmitButtons(false);
    }
  });
});

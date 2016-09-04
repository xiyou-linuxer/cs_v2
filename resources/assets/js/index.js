'use strict';

define([
  'ui',
  'xtemplate',
  './apis/news',
], function (require, exports, module) {

  var UI = require('ui');
  var News = require('./apis/news');
  var Xtemplate = require('xtemplate');

  var $newsScrollable = $('#news_scrollable');
  var $newsList = $newsScrollable.find('.comment-list');

  $newsList.delegate('.btn-news-delete', 'click', function () {
    var $newsElem = $(this).parents('.comment-item');
    var newsId = $newsElem.data('news-id');

    UI.confirm('确定要删除该动态吗？').then(function () {
      News.delete(newsId).then(function () {
        UI.alert('动态删除成功~').then(function () {
          $newsElem.remove();
        });
      }).catch(function (err) {
        if (err && err.message) {
          UI.alert(err.message);
        } else {
          UI.alert('动态删除失败，请稍后再试~');
        }
      });
    });
  });

  $newsList.delegate('.btn-news-favor', 'click', function () {
    var $newsElem = $(this).parents('.comment-item');
    var newsId = $newsElem.data('news-id');

    News.favor(newsId).then(function () {
      var $favorNumElem = $newsElem.find('.favor-num');
      var favorNum = parseInt($favorNumElem.html());
      $favorNumElem.html(favorNum + 1);
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('点赞失败，请稍后再试~');
      }
    });
  });

  $newsList.delegate('.btn-news-comment-toggle', 'click', function () {
    var $commentInputGroup = $(this).parents('.comment-item').find('.comment-input-group');
    $commentInputGroup.slideToggle(300);
  });

  $newsList.delegate('.btn-news-comment', 'click', function () {
    var $newsElem = $(this).parents('.comment-item');
    var $commentInputGroup = $(this).parents('.comment-input-group');

    var newsId = $newsElem.data('news-id');
    var content = $commentInputGroup.find('input').val();

    if (!content) {
      UI.alert('既然来了，不如说点什么吧');
      return false;
    }

    News.createComment(newsId, { content: content}).then(function (res) {
      $commentInputGroup.find('input').val('');
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('评论失败，请稍后再试~');
      }
    });

    $commentInputGroup.slideUp(300);
  });

  var pedding = false;
  var page = 1;
  var newsTemplate = $('#news_template').html();
  $newsScrollable.on('scroll', function () {
    if (pedding) {
      return false;
    }

    var $newsList = $(this).find('.comment-list');
    var viewHeight = $(this).height();
    var contentHeight = $(this).get(0).scrollHeight;
    var scrollTop = $(this).scrollTop();

    if (contentHeight - viewHeight - scrollTop > 200) {
      return false;
    }

    pedding = true;
    News.getByQuery({
      page: page + 1
    }).then(function (res) {
      if (res.data && res.data.length > 0) {
        page = page + 1;

        var html = new Xtemplate(newsTemplate).render(res.data);
        $newsList.append(html);
      }

      pedding = false;
    });
  });
});

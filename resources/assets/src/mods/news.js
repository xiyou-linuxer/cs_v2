'use strict';

import 'babel-polyfill';

import UI from 'ui';
import News from 'apis/news';
import Xtemplate from 'xtemplate';

var newsTemplate = $('#news_mods_template').html();
var $newsScrollable = $('#news_mods_scrollable');
var $newsList = $newsScrollable.find('.comment-list');

$newsList.delegate('.btn-news-delete', 'click', function () {
  var $newsItem = $(this).parents('.comment-item');
  var newsId = $newsItem.data('news-id');

  UI.confirm('确定要删除该动态吗？').then(function () {
    News.delete(newsId).then(function () {
      UI.alert('动态删除成功~').then(function () {
        $newsItem.remove();
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
  var $newsItem = $(this).parents('.comment-item');
  var newsId = $newsItem.data('news-id');

  News.favor(newsId).then(function (data) {
    replaceCommentItem(data, $newsItem);
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
  var $newsItem = $(this).parents('.comment-item');
  var $commentInputGroup = $(this).parents('.comment-input-group');

  var newsId = $newsItem.data('news-id');
  var content = $commentInputGroup.find('input').val();

  if (!content) {
    UI.alert('既然来了，不如说点什么吧');
    return false;
  }

  News.createComment(newsId, { content: content}).then(function (data) {
    $commentInputGroup.find('input').val('');
    $commentInputGroup.slideUp(300);
    replaceCommentItem(data, $newsItem);
  }).catch(function (err) {
    if (err && err.message) {
      UI.alert(err.message);
    } else {
      UI.alert('评论失败，请稍后再试~');
    }
  });
});

var page = 1;
var pedding = false;
$newsScrollable.on('scroll', function () {
  if (pedding) {
    return false;
  }

  var viewHeight = $(this).height();
  var contentHeight = $(this).get(0).scrollHeight;
  var scrollTop = $(this).scrollTop();

  if (contentHeight - viewHeight - scrollTop > 500) {
    return false;
  }

  pedding = true;
  News.getByQuery({
    page: page + 1
  }).then(function (res) {
    if (res.data && res.data.length > 0) {
      page = page + 1;
      appendCommentItems(res.data);
      pedding = false;
    }
  }).catch(function () {
    pedding = false;
  });
});

function replaceCommentItem(data, $oldItem) {
  var html = new Xtemplate(newsTemplate).render([data]);

  $oldItem.before(html);
  $oldItem.remove();
}

function appendCommentItems(data) {
  var html = new Xtemplate(newsTemplate).render(data);
  $newsList.append(html);
}

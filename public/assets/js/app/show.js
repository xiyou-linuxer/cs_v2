webpackJsonp([6],{0:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}n(337),n(9),n(306);var c=n(309),l=a(c),f=n(331),o=a(f),i=$(".koala-app-show-page"),u=i.find("#data_app_id").val();i.find(".secret-component .toggle-btn").on("click",function(e){e.preventDefault(),i.find(".secret-component").toggleClass("open")}),i.find("#btn_refresh_secret").on("click",function(e){o["default"].refreshSecret(u).then(function(e){e&&e.id?i.find("#app_secrect_field").html(e.secret):l["default"].alert("应用secret刷新失败，请稍后再试~")})["catch"](function(e){e&&e.message?l["default"].alert(e.message):l["default"].alert("应用secret刷新失败，请稍后再试~")})}),i.find("#btn_app_confirm").on("click",function(e){o["default"].confirm(u).then(function(e){e&&e.id?l["default"].alert("应用已审核通过~").then(function(){location.reload()}):l["default"].alert("操作失败，请稍后再试~")})["catch"](function(e){e&&e.message?l["default"].alert(e.message):l["default"].alert("操作失败，请稍后再试~")})}),i.find("#btn_app_reject").on("click",function(e){o["default"].reject(u).then(function(e){e&&e.id?l["default"].alert("操作成功，应用审核不通过~").then(function(){location.reload()}):l["default"].alert("操作失败，请稍后再试~")})["catch"](function(e){e&&e.message?l["default"].alert(e.message):l["default"].alert("操作失败，请稍后再试~")})}),i.find("#btn_app_delete").on("click",function(e){o["default"]["delete"](u).then(function(e){l["default"].alert("操作成功，应用已被删除~").then(function(){location.href="/apps"})})["catch"](function(e){e&&e.message?l["default"].alert(e.message):l["default"].alert("操作失败，请稍后再试~")})})},337:function(e,t){}});
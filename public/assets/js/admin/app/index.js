webpackJsonp([1],[function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}n(9),n(306),n(326),n(329);var o=n(309),i=a(o),f=n(331),l=a(f),c=$(".koala-admin-app-list-page");c.find("#app_select_form .form-control").on("change",function(t){window.location.href="/admin/apps?"+$(this).attr("name")+"="+$(this).val()}),c.find("table tbody .btn-delete").on("click",function(t){t.preventDefault(),t.stopPropagation();var e=$(this).data("id"),n=$(this).parents("tr");i["default"].confirm("确定要删除该应用吗？").then(function(){l["default"]["delete"](e).then(function(){i["default"].alert({message:"应用删除成功~"}).then(function(){n.remove()})})["catch"](function(t){t&&t.message?i["default"].alert(t.message):i["default"].alert("应用删除失败，请稍后再试~")})})})}]);
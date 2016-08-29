define(function (require, exports, module) {
  /**
   * 异步请求
   * @param {params} 参数
   * @return {Promise}
   */
  exports.request = function (params) {
    var timeout = new Promise(function (resolve, reject) {
      setTimeout(function () {
        var err = new Error('请求超时，请稍后再试');
        reject(err);
      }, 10000);
    });

    var request = new Promise(function (resolve, reject) {
      $.ajax(params).done(resolve).fail(function (xhr) {
        var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : xhr.responseText;
        reject(new Error(errorMessage));
      });
    });

    return Promise.race([request, timeout]);
  };
});

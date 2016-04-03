define([
  'xtemplate'
], function (require, exports, module) {
  let Xtemplate = require('xtemplate');

  /**
   * alert弹窗
   * @param  {object} opts
   */
  exports.alert = function (opts) {
    return new Promise(function (resolve, reject) {
      let defaultOpts = {
        title: '提示',
        message: '',
        btnText: '确定'
      };

      if (typeof(opts) === 'string') {
        opts = {
          message: opts
        };
      }

      opts = $.extend(defaultOpts, opts);

      let tpl = `
        <div class="ui-alert">
          <div class="alert-inner">
            <header>
              <span class="alert-title">{{title}}</span>
              <a href="#" class="alert-close">
                <i class="fa fa-times"></i>
              </a>
            </header>
            <div class="alert-body">{{message}}</div>
            <footer>
              <span class="btn btn-success btn-ok">{{btnText}}</span>
            </footer>
          </div>
        </div>`;

      var html = new Xtemplate(tpl).render(opts);
      var $elem = $(html);

      // 绑定DOM事件
      $elem.on('click', '.alert-close, .btn-ok', function (e) {
        e.preventDefault();

        $elem.fadeOut(300);
        setTimeout(function () {
          $elem.remove();
        }, 300);
        resolve();
      });

      $elem.appendTo('body').fadeIn(300);
    });
  };

  /*
  let tpl = `
    <div class="com-mask" id="com-mask"></div>
    <div class="com-panel" id="com-panel">
      <div class="com-static"></div>
      <div class="com-btn-wrapper">
        <input type="button" class="ui-btn ok-btn" value="确定">
      </div>
    </div>`;

    var Tags = {
        comTag: '<div class="com-mask" id="com-mask"></div>' + '<div class="com-panel" id="com-panel">' + '<div class="com-static"></div>' + '<div class="com-btn-wrapper"></div>' + '</div>',
        cfmBtns: '<input type="button" class="com-btn cfm-false-btn" value="取消">' + '<input type="button" class="com-btn cfm-true-btn" value="确定">'
    }

    function UI () {
      var config = {};
    }

    UI.prototype = {
      get: function (key) {
        return this.config[key];
      },
      set: function (key, value) {
        this.config[n] = v;
      },
      init: function() {
        var $component = $('.ui-component');
        if ($component.length === 0) {
          $component = $(tpl);
          $component.appendTo('body');
        }

        self.set('$component', $component);
      },
      bindEvent: function() {
        var self = this,
            $component = self.get('$component');

        $component.on('click', '.ok-btn', function(e) {
          e.preventDefault();

          self.hide();

          var cb = self.get('resolve');
          cb && cb(true);
        });
            com.on("click", ".cfm-true-btn", function(e) {
                var cb = _this.get("callback");
                _this.hide();
                cb && cb(true);
            });
            com.on("click", ".cfm-false-btn", function(e) {
                var cb = _this.get("callback");
                _this.hide();
                cb && cb(false);
            });
            mask.on("click", function(e) {
                _this.hide();
            });
            $(document).on("keyup", function(e) {
                var kc = e.keyCode,
                    cb = _this.get("callback");;
                if (kc === 27) {
                    _this.hide();
                } else if (kc === 13) {
                    _this.hide();
                    if (_this.get("type") === "confirm") {
                        cb && cb(true);
                    }
                }
            })
        },
        alert: function(str, callback) {
            var str = typeof str === 'string' ? str : str.toString(),
                com = this.get("com");
            this.set("type", "alert");
            com.find(".com-static").html(str);
            com.find(".com-btn-wrapper").html(Tags.alertBtn);
            this.set("callback", (callback || function() {}));
            this.show();
        },
        confirm: function(str, callback) {
            var str = typeof str === 'string' ? str : str.toString(),
                com = this.get("com");
            this.set("type", "confirm");
            com.find(".com-static").html(str);
            com.find(".com-btn-wrapper").html(Tags.cfmBtns);
            this.set("callback", (callback || function() {}));
            this.show();
        },
        show: function() {
            var _this = this;
            _this.get("com").fadeIn();
            _this.get("mask").fadeIn();
        },
        hide: function() {
            $(this).on("keyup", null);
            var com = this.get("com");
            com.find(".com-static").html("");
              com.find(".com-btn-wrapper").html("");
            com.fadeOut();
            this.get("mask").fadeOut();
        },
        destory: function() {
            this.get("com").remove();
            this.get("mask").remove();
            delete window.alert;
            delete window.confirm;
        }
    };

    var obj = new JComs();
    window.alert = function(str, cb) {
        obj.alert.call(obj, str, cb);
    };
    window.confirm = function(str, cb) {
        obj.confirm.call(obj, str, cb);
    };

    exports.alert = function* (msg) {

    };
  */
});

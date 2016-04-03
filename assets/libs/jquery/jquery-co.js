!(function (global, $) {
  'use strict';
  var onFun = $.fn._on = $.fn.on;

  $.fn.on = function (types, selector, data, fn, /*INTERNAL*/ one) {
    var _self = this;
    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return this;
    }

    var genFn = isGeneratorFunction(fn) ? function () {
      co(fn.apply(this, arguments)).catch(onError);
    } : fn;
    return onFun.call(this, types, selector, data, genFn, one);
  };

  function* generator() {}

  function isGeneratorFunction(obj) {
    return obj && obj.constructor == generator.constructor;
  }

  function onError(e) {
    if (e && e.stack) {
      var errs = e.stack.split('at ');
      errs = errs.slice(0, 2);
      console.error(errs.join('at '));
    } else {
      console.error(e);
    }
  }
})(window, jQuery);

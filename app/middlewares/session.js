'use strict';

module.exports = function (ctx) {
  return function* (next) {
    this.session = {};
    this.session.user = {
      name: 'hello'
    };

    return yield* next;
  };
};

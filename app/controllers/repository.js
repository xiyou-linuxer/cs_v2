'use strict';

module.exports = function (app) {
  let repositoryService = app.services.repository;

  exports.index = function* () {
    let user = this.session.user;

  let info = yield app.services.user.getByName('jensyn');
console.log(info)
/*
    let res = yield repositoryService.create({
      name: '测试',
      path: 'test',
      description: 'hello'
    });

    console.log(res)
*/
    let ret = yield repositoryService.getByQuery({});

    console.log(ret);

    //let ret = yield repositoryService.init('helloworld');

    let data = {
      repositorys: ret
    };

    yield this.render('repository/list', {
      data: data
    });
  };

  exports.create = function* () {
    yield this.render('repository/create', {});
  };

  return exports;
};

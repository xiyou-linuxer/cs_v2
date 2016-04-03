'use strict';

module.exports = function (app) {
  app.get('/repositorys', app.controllers.repository.index);
  app.get('/repositorys/new', app.controllers.repository.create);

  app.get('/api/repositorys', app.apis.repository.index);
  app.post('/api/repositorys', app.apis.repository.create);
};

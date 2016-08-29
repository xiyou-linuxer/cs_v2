'use strict';

module.exports = function (app) {
  app.get('/', "page@index");
  app.get('/search/:keyword', "page@search");


  app.get('/users/:id', "user@profile");

  app.get('/messages', "message@index");
  app.get('/messages/_new', "message@create");
  app.get('/messages/:id', "message@show");

  app.get('/apps', "app@index");
  app.get('/apps/_new', "app@create");
  app.get('/apps/:id/_edit', "app@update");
  app.get('/apps/:id', "app@show");

  app.get('/admin/users', "adminUser@index");
  app.get('/admin/users/_new', "adminUser@create");
  app.get('/admin/users/:id/_edit', "adminUser@update");

  app.get('/admin/apps', "adminApp@index");
  app.get('/admin/users/:id/_edit', "adminUser@update");
/*
  app.get('/api/users', "user@index");
  app.post('/api/users', "user@create");
  app.put('/api/users/:id', "user@update");
  app.delete('/api/users/:id', "user@destroy");

  app.get('/api/news', "news@index");
  app.post('/api/news', "news@create");

  app.get('/api/messages', "message@index");
  app.post('/api/messages', "message@create");
  app.put('/api/messages/:id', "message@update");

  app.get('/api/apps', "app@index");
  app.post('/api/apps', "app@create");
  app.put('/api/apps/:id', "app@update");
*/
  app.get('/oauth/logout', "oauth@logout");
  app.get('/handle_adam_callback', "oauth@handle_adam_callback");

};

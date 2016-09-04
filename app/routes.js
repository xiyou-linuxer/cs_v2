'use strict';

module.exports = function (app) {
  app.get('/', "home@index");
  app.get('/search/:keyword', "home@search");


  app.get('/users/:id', "user@profile");

  app.get('/messages', "message@index");
  app.get('/messages/_new', "message@create");
  app.get('/messages/:id', "message@show");
  app.get('/messages/:id/_edit', "message@update");

  app.get('/apps', "app@index");
  app.get('/apps/_new', "app@create");
  app.get('/apps/:id/_edit', "app@update");
  app.get('/apps/:id', "app@show");

  app.get('/admin/users', "admin/user@index");
  app.get('/admin/users/_new', "admin/user@create");
  app.get('/admin/users/:id/_edit', "admin/user@update");

  app.get('/admin/apps', "admin/app@index");

  app.get('/api/users', "api/user@index");
  app.get('/api/users/:id', "api/user@show");
  app.post('/api/users', "api/user@create");
  app.put('/api/users/:id', "api/user@update");
  app.delete('/api/users/:id', "api/user@destroy");

  app.get('/api/news', "api/news@index");
  app.post('/api/news', "api/news@create");
  app.delete('/api/news/:id', "api/news@destroy");
  app.get('/api/news/:id/comments', "api/news@getComments");
  app.post('/api/news/:id/comments', "api/news@createComment");
  app.post('/api/news/:id/favors', "api/news@favor");

  app.get('/api/messages', "api/message@index");
  app.get('/api/messages/:id', "api/message@show");
  app.post('/api/messages', "api/message@create");
  app.put('/api/messages/:id', "api/message@update");
  app.delete('/api/messages/:id', "api/message@destroy");

  app.get('/api/apps', "api/app@index");
  app.post('/api/apps', "api/app@create");
  app.put('/api/apps/:id', "api/app@update");
  app.delete('/api/apps/:id', "api/app@destroy");
  app.put('/api/apps/:id/secret', "api/app@refreshSecret");
  app.put('/api/apps/:id/confirm', "api/app@confirm");
  app.put('/api/apps/:id/reject', "api/app@reject");

  app.get('/oauth/logout', "oauth@logout");
  app.get('/oauth/access_token', "oauth@getAccessToken");
  app.get('/oauth/reset_password', "oauth@resetPassword");
  app.get('/handle_adam_callback', "oauth@handle_adam_callback");

};

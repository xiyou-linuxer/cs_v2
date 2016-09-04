'use strict';

const baseDir = process.cwd();

const Koa = require('koa');
const path = require('path');
const mount = require('koa-mount');
const Grant = require('grant-koa');
const session = require('koa-session');
const koaRouter = require('koa-router')();
const koaStatic = require('koa-static-cache');
const bodyParser = require('koa-bodyparser');

const env = require('./.env');
const appConfig = require('./config/app');
const oauthConfig = require('./config/oauth');

oauthConfig.server.host = env.host + ':' + env.port;
['key', 'secret'].forEach(function (key) {
  oauthConfig.adam[key] = env[key];
});

['authorize_url', 'access_url'].forEach(function (key) {
  oauthConfig.adam[key] = oauthConfig.adam[key].replace('{{sso_domain}}', env.sso_domain);
});

const app = new Koa();

app.env = env;
app.config = appConfig;
app.keys = [baseDir + Date.now()];

app.use(session(app));

let grant = new Grant(oauthConfig);
app.use(mount(grant));

// request body parser
app.use(bodyParser());

// autoload service modules into ctx
const middlewares = appConfig.middlewares || [];
middlewares.forEach(function (filename) {
  let filepath = path.join(process.cwd(), 'app/middlewares', filename);
  app.use(require(filepath)(app));
});

// load routes
let controllers = {};
let apiControllers = {};
['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
  app[method] = (pathPattern, ctrlPattern) => {
    let strs = ctrlPattern.split('@');
    let ctrlName = strs[0];
    let ctrlMethod = strs[1];

    if (!controllers[ctrlName]) {
      let ctrlPath = path.join(baseDir, 'app/controllers', ctrlName);
      controllers[ctrlName] = require(ctrlPath)(app);
    }

    koaRouter[method](pathPattern, controllers[ctrlName][ctrlMethod]);
  };
});

require(path.join(baseDir, 'app/routes'))(app);

app.use(koaRouter.routes());
app.use(koaRouter.allowedMethods());

// public static files
app.use(koaStatic(path.join(baseDir, 'public'), {
  maxAge: 365 * 24 * 60 * 60
}));

app.listen(env.port, env.host);
console.log('server started at port %s:%d....', env.host, env.port);

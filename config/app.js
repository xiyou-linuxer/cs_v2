'use strict';

const env = require('../.env');

exports.app = {
  name: 'koala',
  client_id: env.client_id,
  basedir: process.cwd(),
  env: env.env || process.env.NODE_ENV || 'dev'
};

exports.server = {
  host: env.host ||　'127.0.0.1',
  port: env.port || 2111
};

exports.middlewares = [
  'error',
  'logger',
  'oauth',
  'proxy',
  'service',
  'render',
  'admin'
];

'use strict';

require('colors');

const moment = require('moment');
const fmt = require('util').format;

const LOG_COLORS = {
	info: 'grey',
	warn: 'yellow',
	error: 'red',
	success: 'green'
};

let createLogger = (method) => {
	return function () {
		let message = fmt.apply(null, arguments);

    if (method === 'warn' || method === 'error') {
		    console.error(message[LOG_COLORS[method]]);
    } else {
	    console.log(message[LOG_COLORS[method]]);
    }
	};
};

let reqLogger = (ctx, err) => {
  let startTime = ctx.startTime;
  let endTime = Date.now();
  let timeStr = moment(startTime).format('YYYY-MM-DD HH:mm:ss');

  let logger = null;
	let status = err ? err.status : ctx.status;
  if (status >= 200 && status < 300) {
    logger = ctx.logger.success;
  } else if (status >= 300 && status < 400) {
    logger = ctx.logger.warn;
  } else {
    logger = ctx.logger.error;
  }

  logger('[%d] %s %s %dMS', status, timeStr, ctx.path, endTime - startTime);
};

module.exports = function logger () {
  return function* logger (next) {
    let ctx = this;
    ctx.startTime = Date.now();

    ctx.logger = {};
    Object.keys(LOG_COLORS).forEach(function (method) {
    	ctx.logger[method] =  createLogger(method);
    });

    if (/assets/.test(ctx.path)) {
      return yield *next;
    }

    try {
      yield *next;
      reqLogger(ctx);
    } catch (err) {
      reqLogger(ctx, err);
			ctx.throw(err);
    }
  }
};

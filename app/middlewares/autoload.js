'use strict';

const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

const services = {};

module.exports = function autoload (app) {
  let serviceFiles = fs.readdirSync(path.join(baseDir, 'app/services'));
  serviceFiles.forEach(filename => {
    let extname = path.extname(filename);
    let basename = path.basename(filename, extname);
    let filepath = path.join(baseDir, 'app/services', basename);

    services[basename] = require(filepath)(app);
  });

  return function* autoload (next) {
    this.services = Object.assign({}, services);

    yield *next;
  };
};

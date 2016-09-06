'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

let assetsPath = path.join(__dirname, 'resources/assets/src');

module.exports = {
  context: assetsPath,
  entry: getEntrys(assetsPath, 'entrys'),
  output: {
    path: './public/assets',
    filename: "js/[name].js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css?sourceMap&minimize&autoprefixer'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&minimize&autoprefixer!less?sourceMap&strictMath&noIeCompat')
    }]
  },
  resolve: {
    root: assetsPath,
    extensions: ['', '.js', '.json', '.less', '.css'],
    alias: {
      apis: 'apis',
      mods: 'mods',
      layouts: 'layouts',
      ui: 'mods/ui.js',
      request: 'utils/request.js',
      'autocomplete': 'mods/autocomplete.js'
    }
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'common',
      filename: 'js/vendor.js',
      minChunks: 3,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/[name].css')
  ],
  externals: {
    // 对应全局变量 jQuery
    "jquery": "jQuery",
    "editor": "Editor"
  }
};

function getEntrys(cwd, root) {
  let entrys = {};
  let rootPath = path.join(cwd, root);

  let files = fs.readdirSync(rootPath);
  files.forEach(function (filename) {
    let extname = path.extname(filename);
    let basename = path.basename(filename, extname);
    let subPath = path.join(rootPath, filename);
    let stat = fs.statSync(subPath);

    if (stat.isDirectory()) {
      let subRoot = path.join(root, filename);
      let subentrys = getEntrys(cwd, subRoot);
      Object.keys(subentrys).forEach(function (key) {
        entrys[basename + '/' + key] = subentrys[key];
      });
    } else if (extname === '.js') {
      entrys[basename] = subPath.replace(cwd, '').replace(/^\//, './');
    }
  });

  return entrys;
}

'use strict';
const path = require('path');
const webpackBaseConfig = require('./webpack.config');

module.exports =
Object.assign(webpackBaseConfig, {
  output: Object.assign(webpackBaseConfig.output, {
    path: path.join(__dirname, 'dist')
  })
});

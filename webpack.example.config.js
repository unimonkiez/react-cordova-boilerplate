'use strict';
const path = require('path');
const webpackBaseConfig = require('./webpack.config');

module.exports = webpackBaseConfig.map(webpackConfig => Object.assign(webpackConfig, {
  output: Object.assign(webpackConfig.output, {
    path: path.join(__dirname, 'dist')
  })
}));

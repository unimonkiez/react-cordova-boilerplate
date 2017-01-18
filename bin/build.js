const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config');

const args = process.argv.slice(2);
const isWatching = args.indexOf('-w') !== -1;

const webpackConfig = getWebpackConfig();

if (isWatching) {
  webpack(webpackConfig).watch({}, () => {});
} else {
  webpack(webpackConfig, () => {});
}

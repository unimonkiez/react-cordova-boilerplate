const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config');

const args = process.argv.slice(2);
const isWatching = args.indexOf('-w') !== -1;
const isProd = args.indexOf('-p') !== -1;
const isSsr = isProd;

const webpackConfig = getWebpackConfig({
  isProd,
  isSsr,
  globals: {
    __DEVTOOLS__: !isProd
  }
});

if (isWatching) {
  webpack(webpackConfig).watch({}, () => {});
} else {
  webpack(webpackConfig, () => {});
}

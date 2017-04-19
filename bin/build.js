const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config');

const args = process.argv.slice(2);
const isWatching = args.indexOf('-w') !== -1;
const isProd = args.indexOf('-p') !== -1;
const isSsr = isProd;

const webpackConfig = getWebpackConfig({
  isProd,
  isSsr,
  bail: !isWatching,
  globals: {
    __DEVTOOLS__: !isProd
  }
});

const cb = (err, stats) => {
  if (err) {
    console.warn(err);
    if (!isWatching) {
      process.exit(1);
    }
  } else {
    console.log('[webpack log]', stats.toString());
  }
};
if (isWatching) {
  webpack(webpackConfig).watch({}, cb);
} else {
  webpack(webpackConfig, cb);
}

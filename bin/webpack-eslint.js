const getWebpackConfig = require('./get-webpack-config');

module.exports = {
  globals: {
    __DEV__: false,
    __PROD__: false,
    __DEVSERVER__: false,
    __CLIENT__: false,
    __SERVER__: false,
    'process.env.NODE_ENV': false
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: getWebpackConfig()
      }
    }
  }
};

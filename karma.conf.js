// Require webpack config rather than duplicating it
var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = function karmaConfig(config) {
  config.set({
    // ... normal karma configuration
    browsers: ['PhantomJS'],
    singleRun: true,
    files: [
      'src/__tests__/**/*.js',
      'src/__tests__/**/*.jsx'
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/__tests__/**/*.js': ['webpack'],
      'src/__tests__/**/*.jsx': ['webpack'],
    },
    frameworks: ['phantomjs-shim', 'jasmine'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};

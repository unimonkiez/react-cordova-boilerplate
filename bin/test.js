const path = require('path');
const getWebpackConfig = require('./get-webpack-config');
const Server = require('karma').Server;

// MODE const
const MODE = {
  default: 0,
  coverage: 1,
  coverageToLcov: 2
};

const rootPath = path.join(__dirname, '..');
const testBundles = [
  path.join(rootPath, 'test', 'index.js')
];
const coveragePaths = [
  path.join(rootPath, 'src')
];
const port = 9876;

const args = process.argv.slice(2);
let mode = MODE.default;
if (args.indexOf('-coverage') !== -1) {
  mode = MODE.coverage;
} else if (args.indexOf('-coverageToLcov') !== -1) {
  mode = MODE.coverageToLcov;
}

const isWatching = args.indexOf('-w') !== -1;

const webpackConfig = getWebpackConfig({
  isTest: true,
  coveragePaths
});

const server = new Server({
  // ... normal karma configuration
  port,
  browsers: ['PhantomJS'],
  singleRun: !isWatching,
  files: [
    //'node_modules/babel-polyfill/dist/polyfill.js'
  ].concat(testBundles),
  preprocessors: [].concat(testBundles).reduce((obj, file) => (
    Object.assign(obj, {
      [file]: ['webpack', 'sourcemap']
    })
  ), {}),
  plugins: ['karma-webpack', 'karma-jasmine', 'karma-nyan-reporter', 'karma-coverage', 'karma-sourcemap-loader', 'karma-phantomjs-launcher', 'karma-phantomjs-shim'],
  frameworks: ['phantomjs-shim', 'jasmine'],
  reporters: [
    mode === MODE.coverageToLcov ? 'dots' : 'nyan' // Usually running in ci to produce lcov for coveralls, nyan is annoying in ci log
  ].concat(
    [MODE.coverage, MODE.coverageToLcov].indexOf(mode) !== -1 ? ['coverage'] : []
  ),
  // reporter options
  nyanReporter: {
    suppressErrorHighlighting: true
  },
  coverageReporter: {
    dir: 'coverage/',
    reporters: [{
      type: mode === MODE.coverageToLcov ? 'lcov' : 'html', // lcov or lcovonly are required for generating lcov.info files, html for local coverage report
      subdir: '.'
    }]
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true
  }
});

server.start();

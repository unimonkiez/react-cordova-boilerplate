const path = require('path');
const createMochaWebpack = require('mocha-webpack/lib/createMochaWebpack');
const getWebpackConfig = require('./get-webpack-config');

// MODE const
const MODE = {
  default: 0,
  coverage: 1,
  coverageToLcov: 2
};

const rootPath = path.join(__dirname, '..');
const testBundle = path.join('test', 'index.js');
const coveragePaths = [
  path.join(rootPath, 'src')
];

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

const mochaWebpack = createMochaWebpack();
mochaWebpack.cwd(rootPath);
mochaWebpack.webpackConfig(webpackConfig);
mochaWebpack.bail(!isWatching);
// mochaWebpack.reporter(options.reporter, options.reporterOptions);
// mochaWebpack.ui(options.ui);
// mochaWebpack.interactive(options.interactive);
// mochaWebpack.bail(true);
mochaWebpack.addEntry(testBundle);

Promise.resolve()
.then(() => {
  if (isWatching) {
    return mochaWebpack.watch();
  } else {
    return mochaWebpack.run();
  }
})
.then(failures => {
  if (!isWatching) {
    process.exit(failures);
  }
})
.catch(e => {
  console.log('EXITTTS');
  if (e) {
    console.error(e.stack); // eslint-disable-line
  }
  if (!isWatching) {
    process.exit(1);
  }
});

const path = require('path');
const createMochaWebpack = require('mocha-webpack/lib/createMochaWebpack');
const getWebpackConfig = require('./get-webpack-config');

const rootPath = path.join(__dirname, '..');

const args = process.argv.slice(2);

const isWatching = args.indexOf('-w') !== -1;
const isCoverage = args.indexOf('-coverage') !== -1;

const webpackConfig = getWebpackConfig({
  isTest: true,
  isCoverage,
  coveragePaths: [
    path.join(rootPath, 'src')
  ]
});

const mochaWebpack = createMochaWebpack();
mochaWebpack.cwd(rootPath);
mochaWebpack.webpackConfig(webpackConfig);
mochaWebpack.bail(!isWatching);
mochaWebpack.addEntry(
  path.join('test', 'index.js')
);

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
  if (e) {
    console.error(e.stack); // eslint-disable-line
  }
  if (!isWatching) {
    process.exit(1);
  }
});

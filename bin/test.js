const path = require('path');
const createMochaWebpack = require('mocha-webpack/lib/createMochaWebpack');
const getWebpackConfig = require('./get-webpack-config');
const NYC = require('nyc');

const rootPath = path.join(__dirname, '..');
const testPaths = [
  path.join(rootPath, 'test', 'index.js')
];
const coveragePaths = [
  path.join(rootPath, 'src')
];

const args = process.argv.slice(2);

const isWatching = args.indexOf('-w') !== -1;
const isCoverage = args.indexOf('-coverage') !== -1;

let nyc;
if (isCoverage) {
  const nycPath = rootPath;
  nyc = new NYC({
    cwd: nycPath,
    include: coveragePaths.map(f => path.relative(nycPath, f)),
    extension: [
      '.jsx'
    ],
    reporter: [
      'lcov',
      'html',
      'text-summary'
    ],
    hookRunInContext: true,
    enableCache: true,
    sourceMap: false,
    instrumenter: 'nyc/lib/instrumenters/noop'
  });
  nyc.reset();
  nyc.wrap();
}

const webpackConfig = getWebpackConfig({
  isTest: true,
  isCoverage,
  coveragePaths: [
    path.join(rootPath, 'src')
  ]
});

const mochaWebpack = createMochaWebpack();
const mochaWebpackPath = rootPath;
mochaWebpack.cwd(mochaWebpackPath);
mochaWebpack.webpackConfig(webpackConfig);
mochaWebpack.bail(!isWatching);
testPaths.forEach(f => {
  // Make test path relative to mochaWebpackPath set before
  mochaWebpack.addEntry(
    path.relative(mochaWebpackPath, f)
  );
});

Promise.reject()
.then(() => {
  if (isWatching) {
    return mochaWebpack.watch();
  } else {
    return mochaWebpack.run();
  }
})
.then(() => {
  if (isCoverage) {
    nyc.report();
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

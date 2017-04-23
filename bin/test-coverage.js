const path = require('path');
const { spawn } = require('child_process');

const coverageRelativePath = process.cwd();
const coveragePaths = [
  path.join(__dirname, '..', 'src')
];

const nycRc = {
  include: coveragePaths.map(coveragePath => path.relative(coverageRelativePath, coveragePath)),
  extension: [
    '.jsx'
  ],
  reporter: [
    'lcov',
    'html',
    'text-summary'
  ],
  instrument: false
};

const nycCommand = 'nyc ' +
nycRc.reporter.map(report => `--reporter=${report}`).join(' ') + ' ' +
nycRc.include.map(include => `--include=${include}`).join(' ') + ' ' +
(nycRc.instrument ? '' : '--no-insturment') +
'';

const testProcess = spawn(`${nycCommand} node ${path.join(__dirname, 'test.js')} -coverage`, { shell: true, stdio: 'inherit' });
testProcess.on('close', testCode => {
  process.exit(testCode);
});

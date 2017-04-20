const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const nycRcPath = path.join(process.cwd(), '.nycrc');
const nycRc = {
  include: [
    'src'
  ],
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

// Write .nycrc file temporarly because the command-line tool needs it
fs.writeFileSync(nycRcPath, JSON.stringify(nycRc, null, 2));
process.on('exit', () => fs.unlinkSync(nycRcPath));
process.on('SIGINT', () => process.exit());

const testProcess = spawn(`nyc node ${path.join(__dirname, 'test.js')} -coverage`, { shell: true, stdio: 'inherit' });
testProcess.on('close', testCode => {
  process.exit(testCode);
});

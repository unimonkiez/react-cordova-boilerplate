const { spawn } = require('child_process');

const testProcess = spawn('nyc npm run test -- -coverage', { shell: true, stdio: 'inherit' });
testProcess.on('close', testCode => {
  process.exit(testCode);
});

const execSync = require('child_process').execSync;

const bump = process.env.bump || 'patch';

execSync(`npm version ${bump} --no-git-tag-version`, {
  stdio: [0, 1, 2]
});
const version = require('../package.json').version;

execSync(`git add package.json && git commit -m "${version}" && git tag v${version}`, {
  stdio: [0, 1, 2]
});

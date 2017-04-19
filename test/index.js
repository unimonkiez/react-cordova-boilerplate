import './setup.js';

// require all `src/**/*.js`
const componentsContext = require.context('src/', true, /\.jsx?$/);
componentsContext
.keys()
.filter(filePath => (!filePath.startsWith('./entry-points/')))
.forEach(componentsContext);

// // load all specs into one bundle
const testsContext = require.context('test/spec/', true, /\.jsx?$/);
testsContext.keys().forEach(testsContext);

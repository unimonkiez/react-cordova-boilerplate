// Disabling `no-undef` because we are using here require.context which requires files dynamically, instead of regular ES6 imports
/* eslint-disable no-undef */

// load all specs into one bundle
const testsContext = require.context('./spec/', true, /\.spec\.jsx?$/);
testsContext.keys().forEach(testsContext);

// require all `src/**/*.js`
const componentsContext = require.context('../src/', true, /\.jsx?$/);
componentsContext
  .keys()
  .filter(filePath => filePath.startsWith('src/entry-points/'))
  .forEach(componentsContext);

/* eslint-enable no-undef */

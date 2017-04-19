// import jsdom from 'jsdom';
require('jsdom');
//
// // Define some html to be our basic document
// // JSDOM will consume this and act as if we were in a browser
// const DEFAULT_HTML = '<html><head></head><body></body></html>';
//
// // Define some variables to make it look like we're a browser
// // First, use JSDOM's fake DOM as the document
// global.document = jsdom.jsdom(DEFAULT_HTML);
//
// // Set up a mock window
// global.window = document.defaultView;
//
// // Allow for things like window.location
// global.navigator = window.navigator;


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

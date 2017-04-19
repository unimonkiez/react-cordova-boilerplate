import jsdom from 'jsdom';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';

// To make all assertions which are not functions to a function (like `expect().to.be.ok` => `expect().to.be.ok()`)
chai.use(dirtyChai);
// Added sinon spy assertions
chai.use(sinonChai);

// Define some html to be our basic document
// JSDOM will consume this and act as if we were in a browser
const DEFAULT_HTML = '<html><head></head><body></body></html>';

// Define some variables to make it look like we're a browser
// First, use JSDOM's fake DOM as the document
global.document = jsdom.jsdom(DEFAULT_HTML);

// Set up a mock window
global.window = document.defaultView;

// Allow for things like window.location
global.navigator = window.navigator;

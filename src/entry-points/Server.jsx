import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../containers/App.jsx';

export default ReactDOMServer.renderToString(React.createFactory(App)({}));

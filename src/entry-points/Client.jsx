import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App.jsx';
import AppRoute from '../containers/AppRoute.jsx';

ReactDOM.render(
  <App>
  	<AppRoute/>
  </App>,
  document.getElementById('app')
);

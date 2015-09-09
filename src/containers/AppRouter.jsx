import React, { Component } from 'react';
import { Router, Route, DefaultRoute } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import MainSection from '../components/MainSection.jsx'

var wrapComponent = function(Component, props) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, props);
    }
  });
};

export default class AppRouter extends Component {
  render() {
    const {todos, actions} = this.props;
    return (
      <Router history={history} >
        <Route path="/" component={wrapComponent(MainSection, {todos, actions})}>
        </Route>
      </Router>
      );
  }
}

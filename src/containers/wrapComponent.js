import React, { PropTypes } from 'react';

export default (component, props) => React.createClass({
  propTypes: {
    route: PropTypes.object
  },
  render() {
    const { route } = this.props;
    return React.createElement(component, { route, ...props});
  }
});

import React from 'react';
import ReactDOM from 'react-dom';

export default {
  renderIntoDocument(Component, cb) {
    const div = document.createElement('div');

    let instance;

    try {
      ReactDOM.render(
        React.cloneElement(<Component />, { ref: ref => { instance = ref; } }),
        div,
        () => {
          cb(undefined, {
            instance,
            div
          });
        }
      );
    } catch (e) {
      cb(e);
    }
  }
};

import React from 'react';
import ReactDOM from 'react-dom';

export default {
  renderIntoDocument(Element, cb) {
    const div = document.createElement('div');

    try {
      let instance;
      ReactDOM.render(
        React.cloneElement(Element, { ref: ref => { instance = ref; } }),
        div,
        () => {
          cb({
            instance,
            div
          });
        }
      );
    } catch (e) {
      throw e;
    }
  }
};

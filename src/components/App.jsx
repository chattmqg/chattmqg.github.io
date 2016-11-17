import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

function App({ children, routes }) {
  return (
    <div>
      {children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;

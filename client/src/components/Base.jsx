import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';

const Base = ({ children }) => (
  <div>
    <Link to={'/'}>
        <AppBar
            title="React Authorization Sample App"
            iconClassNameRight="muidocs-icon-navigation-expand-more"/>
    </Link>

    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import AppBar from 'material-ui/AppBar';

class Navigation extends Component {

  render() {
    return (
      <AppBar
        title="Title"
        style={styles.appBar}
      />
    );
  }
}

export default Navigation;
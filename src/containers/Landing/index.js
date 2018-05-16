import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import config from '../../config';
import styles from './styles';

class Landing extends Component {
  static propTypes = {
    session: PropTypes.object
  };

  render() {
    return (
      <div style={styles.container}>
        <RaisedButton label={"test"} style={{ marginTop: '100px' }} onClick={this.login} />
      </div>
    );
  }
}

export default Landing;
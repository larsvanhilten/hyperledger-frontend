import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../../config';
import styles from './styles';
import { LSPTable } from '../../components';

class LSP extends Component {

  render() {
    return (
      <div style={styles.container}>
        <LSPTable />
      </div>
    );
  }
}

export default LSP;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../../config';
import styles from './styles';
import { CustomsTable } from '../../components';

class Customs extends Component {

  render() {
    return (
      <div style={styles.container}>
        <CustomsTable />
      </div>
    );
  }
}

export default Customs;
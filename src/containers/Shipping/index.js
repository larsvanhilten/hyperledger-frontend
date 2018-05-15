import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../../config';
import styles from './styles';
import { ShippingTable } from '../../components';

class Shipping extends Component {

  render() {
    return (
      <div style={styles.container}>
        <ShippingTable />
      </div>
    );
  }
}

export default Shipping;
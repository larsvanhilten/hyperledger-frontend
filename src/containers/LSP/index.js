import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from '../../config';
import styles from './styles';
import { ContainerTable } from '../../components';
import { setRole } from '../../actions';
import { connect } from 'react-redux';

class LSP extends Component {

  constructor(props) {
    super(props);
    this.props.setRole("Logistics Service Provider");
  }

  render() {
    return (
      <div style={styles.container}>
        <ContainerTable />
      </div>
    );
  }
}

export default connect(
  user => ({
    user
  }),
  dispatch => ({
    setRole: role => dispatch(setRole(role))
  })
)(LSP);
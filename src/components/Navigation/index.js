import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

class Navigation extends Component {
  
  static propTypes = {
    user: PropTypes.object
  };
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const element = <Chip style={styles.chip} labelStyle={styles.chipLabel}>{this.props.user.role}</Chip>;

    return (
      <div>
        <AppBar
          title="Blockchain Shipping Network"
          style={styles.appBar}
          titleStyle={styles.titleBar}
          onLeftIconButtonClick={() => { this.setState({ open: true })} }
          iconElementRight={element}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem href="/customs">Customs</MenuItem>
          <MenuItem href="/shipping">Shipping</MenuItem>
          <MenuItem href="/lsp">Logistic Service Provider</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default connect(
  user => ({
    user
  })
)(Navigation);
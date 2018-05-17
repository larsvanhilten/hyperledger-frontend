import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Navigation extends Component {
  
  static propTypes = {
    user: PropTypes.object
  };
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialog: false
    };
  }

  handleDialog = () => {
    this.setState({
      dialog: !this.state.dialog
    });
  }

  handleSubmit = () => {
    // handle container request here
  }

  renderDialog = () => {
    const actions = [
      <FlatButton
        label="Decline"
        onClick={this.handleDialog}
      />,
      <FlatButton
        label="Accept"
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
      title="New container request"
      actions={actions}
      open={this.state.dialog}
    >
      New container request from 'x'
    </Dialog>
    );
  }

  render() {
    let badge;

    if(this.props.user.role == "Shipper")
      badge = (
        <Badge badgeContent={"1"} badgeStyle={styles.badge} onClick={this.handleDialog}> 
          <NotificationsIcon style={styles.icon} /> 
       </Badge>
      );

    const element = (
      <div style={styles.iconRight}>
        {badge}
        <Chip style={styles.chip} labelStyle={styles.chipLabel}>
          {this.props.user.role}
        </Chip>
      </div>
    );

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

        {this.renderDialog()}
      </div>
    );
  }
}

export default connect(
  user => ({
    user
  })
)(Navigation);
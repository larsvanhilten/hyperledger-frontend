import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {setLoader} from "../../actions";
import axios from 'axios';

class Navigation extends Component {
  
  static propTypes = {
    user: PropTypes.object
  };
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialog: false,
      requests: []
    };
    
  }

  componentDidMount() {
    if(!this.props.user.role === "Shipper")
      return;

    this.getRequests()
    .then(requests => {
      this.setState({ requests });
    });

    
  }

  getRequests = () => {
    return axios.get('http://lars01.westeurope.cloudapp.azure.com:3000/api/Request?filter=%7B%20%22where%22%3A%7B%20%22and%22%3A%5B%20%7B%20%22from%22%3A%20%22resource%3Aorg.acme.shipping.participants.Company%239325%22%20%7D%2C%20%7B%20%22status%22%3A%20%22IN_PROGRESS%22%20%20%7D%5D%20%7D%2C%20%22include%22%3A%22resolve%22%20%7D')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleDialog = () => {
    if(!this.state.requests[0])
      return;

    this.setState({
      dialog: !this.state.dialog
    });
  }

  handleRejected = () => {
    this.setState({ dialog: false });
    this.props.setLoader(true);

    const requestID = this.state.requests[0].id;
    const response = "REJECTED";    

    axios.post('http://lars01.westeurope.cloudapp.azure.com:3000/api/RespondToRequest', {
      $class: "org.acme.shipping.transactions.RespondToRequest",
      request: `resource:org.acme.shipping.assets.Request#${requestID}`,
      response
    })
    .then(()  => {
      this.getRequests()
      .then(requests => {
        this.setState({ requests });
        this.props.setLoader(false);
      });
    })
    .catch((error) => {
      console.log(error);
      this.props.setLoader(false);
    });
  }

  handleAccepted = () => {
    this.setState({ dialog: false });
    this.props.setLoader(true);

    const requestID = this.state.requests[0].id;
    const response = "DONE";

    axios.post('http://lars01.westeurope.cloudapp.azure.com:3000/api/TransferContainer', {
      $class: "org.acme.shipping.transactions.TransferContainer",
      container: `resource:org.acme.shipping.assets.Container#${this.state.requests[0].container.number}`,
      owner:  `resource:org.acme.shipping.participants.Company#${this.state.requests[0].to.id}`
    })
    .then(() => {
      axios.post('http://lars01.westeurope.cloudapp.azure.com:3000/api/RespondToRequest', {
        $class: "org.acme.shipping.transactions.RespondToRequest",
        request: `resource:org.acme.shipping.assets.Request#${requestID}`,
        response
      })
      .then(()  => {
        this.getRequests()
        .then(requests => {
          this.setState({ requests });
          this.props.setLoader(false);
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.setLoader(false);
      });
    })
    .catch((error) => {
      console.log(error);
      this.props.setLoader(false);
    });
  }

    renderDialog = () => {
    const actions = [
      <FlatButton
        label="Reject"
        onClick={this.handleRejected}
      />,
      <FlatButton
        label="Transfer"
        onClick={this.handleAccepted}
      />,
    ];

    let from, container = "";
    
    if(this.state.requests[0]) {
       from = this.state.requests[0].to.name;
      container = this.state.requests[0].container.number;
    }

    return (
      <Dialog
      title="New transfer request"
      actions={actions}
      open={this.state.dialog}
    >
      New request for container: "{container}" from: "{from}"
    </Dialog>
    );
  }

  renderLoader = () => {
    if(!this.props.user.loader)
      return;

    return(
      <CircularProgress style={styles.loader}/>
    );
  }

  render() {
    let badge;

    if(this.props.user.role === "Shipper")
      badge = (
        <Badge badgeContent={this.state.requests.length} badgeStyle={styles.badge} onClick={this.handleDialog}> 
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

        {this.renderLoader()}
        {this.renderDialog()}
      </div>
    );
  }
}

export default connect(
  (user) => ({
    user
  }),
  dispatch => ({
    setLoader: isActive => dispatch(setLoader(isActive))
  })
)(Navigation);
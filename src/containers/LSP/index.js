import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import { ContainerTable } from '../../components';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { setRole, setLoader } from '../../actions';

class LSP extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 'containers',
      dialog: false,
      containerID: "",
      containers: [],
      requests: []
    };
    this.props.setRole("Logistic Service Provider");
  }


  componentDidMount() {
    this.getContainers()
    .then(containers => {
      this.setState({ containers });
    });

    this.getRequests()
    .then(requests => {
      this.setState({ requests });
    });
  }

  getContainers = () => {
    return axios.get('http://lars01.westeurope.cloudapp.azure.com:3000/api/Container?filter=%7B%20%22where%22%3A%20%7B%20%22owner%22%3A%20%22resource%3Aorg.acme.shipping.participants.Company%232336%22%20%7D%2C%20%22include%22%3A%22resolve%22%20%7D')
    .then(response => {
      const data = response.data;
      for(let i = 0; i < data.length; i++){
        data[i].owner = data[i].owner.name;
      }
      return data;
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  getRequests = () => {
    return axios.get('http://lars01.westeurope.cloudapp.azure.com:3000/api/Request?filter=%7B%20%22where%22%3A%7B%20%22to%22%3A%20%22resource%3Aorg.acme.shipping.participants.Company%232336%22%20%7D%2C%20%22include%22%3A%22resolve%22%20%7D')
    .then(response => {
      const data = response.data;
      for(let i = 0; i < data.length; i++){
        data[i].container = data[i].container.number;
        data[i].from = data[i].from.name;
        data[i].to = data[i].to.name;
      }
      return data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleDialog = () => {
    this.setState({
      dialog: !this.state.dialog
    });
  }

  handleSubmit = () => {
    this.props.setLoader(true);
    axios.post('http://lars01.westeurope.cloudapp.azure.com:3000/api/RequestContainer', {
      $class: "org.acme.shipping.transactions.RequestContainer",
      id: `${this.state.containerID}`,
      to: "resource:org.acme.shipping.participants.Company#2336",
      container: `resource:org.acme.shipping.assets.Container#${this.state.containerID}`,
  })
  .then(()  => {
    this.getRequests()
    .then(requests => {
      this.setState({ requests, dialog: false });
      this.props.setLoader(false);
    });
  })
  .catch((error) => {
    console.log(error);
    this.props.setLoader(false);
  });
  }

  handleTextChange = (e) => {
    const text = e.target.value;
    this.setState({ containerID: text});
  }

  renderDialog = () => {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleDialog}
      />,
      <FlatButton
        label="Send"
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
      title="Send container request"
      actions={actions}
      open={this.state.dialog}
    >
      <TextField onChange={this.handleTextChange} hintText="Containernumber" />
    </Dialog>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        {this.renderDialog()}
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          style={{ position: "fixed", height: "100%"}}
          contentContainerStyle={{height: "100%"}}
          tabTemplateStyle={{height: "100%"}}
        >
          <Tab 
            label="Containers" 
            value="containers"
            icon={<FontIcon className="material-icons">view_module</FontIcon>}
            style={{ height: "100%" }}
          >
            <div style={styles.upperContainer}> 
              <FlatButton label="Request container" style={styles.button} onClick={this.handleDialog} />
            </div>
            <ContainerTable items={this.state.containers} style={{ height: "calc(100% - 246px)", overflow: "auto"}} />
          </Tab>
          <Tab 
            label="Transactions" 
            value="transactions"
            icon={<FontIcon className="material-icons">loop</FontIcon>}
            style={{ height: "100%" }}
          >
            <ContainerTable items={this.state.requests} style={{ height: "calc(100% - 195px)", overflow: "auto"}} />    
          </Tab>
        </Tabs>      
      </div>
    );
  }
}

export default connect(
  user => ({
    user
  }),
  dispatch => ({
    setRole: role => dispatch(setRole(role)),
    setLoader: isActive => dispatch(setLoader(isActive))
  })
)(LSP);
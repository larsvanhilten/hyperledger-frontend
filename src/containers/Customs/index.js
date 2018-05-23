import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import axios from 'axios';
import { ContainerTable } from '../../components';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setRole, setLoader } from '../../actions';

class Customs extends Component {

  static propTypes = {
    user: PropTypes.object,
    table: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 'containers',
      containers: [],
      requests: []
    };

    this.props.setRole("Customs");  
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
    return axios.get('http://lars01.westeurope.cloudapp.azure.com:3000/api/Container?filter=%7B%22include%22%3A%22resolve%22%7D')
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
    return axios.get('http://lars01.westeurope.cloudapp.azure.com:3000/api/Request?filter=%7B%22include%22%3A%22resolve%22%7D')
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

  lockContainers = () => {
    this.props.setLoader(true);
    const containers = [];
    for(let i = 0; i < this.props.table.containers.length; i++) {
      const index = this.props.table.containers[i];
      const item = this.state.containers[index];
      containers.push(`resource:org.acme.shipping.assets.Container#${item.number}`);
    }

    axios.post('http://lars01.westeurope.cloudapp.azure.com:3000/api/LockContainer', {
      $class: "org.acme.shipping.transactions.LockContainer",
      containers
    })
    .then(()  => {
      this.getContainers()
      .then(containers => {
        this.setState({ containers });
        this.props.setLoader(false);
      });
    })
    .catch((error) => {
      console.log(error);
      this.props.setLoader(false);
    });
  }

  freeContainers = () => {
    this.props.setLoader(true);
    const containers = [];
    for(let i = 0; i < this.props.table.containers.length; i++) {
      const index = this.props.table.containers[i];
      const item = this.state.containers[index];
      containers.push(`resource:org.acme.shipping.assets.Container#${item.number}`);
    }

    axios.post('http://lars01.westeurope.cloudapp.azure.com:3000/api/FreeContainer', {
      $class: "org.acme.shipping.transactions.FreeContainer",
      containers
    })
    .then(() => {
      this.getContainers()
      .then(containers => {
        this.setState({ containers });
        this.props.setLoader(false);
      });
    })
    .catch((error) => {
      console.log(error);
      this.props.setLoader(false);
    });
  }

  render() {
    return (
      <div style={styles.container}>
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
              <FlatButton onClick={this.lockContainers} label="Lock container(s)" style={styles.button} />
              <FlatButton onClick={this.freeContainers} label="Free container(s)" style={styles.button} />
              <FlatButton label="Start risk analyses" style={styles.button} />
            </div>
            <ContainerTable type={"containers"} items={this.state.containers} style={{ height: "calc(100% - 246px)", overflow: "auto"}} />
          </Tab>
          <Tab 
            label="Transactions" 
            value="transactions"
            icon={<FontIcon className="material-icons">loop</FontIcon>}
            style={{ height: "100%" }}
          >
            <ContainerTable type={"transactions"} items={this.state.requests} style={{ height: "calc(100% - 195px)", overflow: "auto"}} />    
          </Tab>
        </Tabs>      
      </div>
    );
  }
}

export default connect(
  (user,table) => ({
    ...user,
    ...table
  }),
  dispatch => ({
    setRole: role => dispatch(setRole(role)),
    setLoader: isActive => dispatch(setLoader(isActive))
  })
)(Customs);
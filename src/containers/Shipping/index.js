import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config';
import styles from './styles';
import { ContainerTable } from '../../components';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setRole } from '../../actions';
import { TableBody } from 'material-ui';
import axios from 'axios';

class Shipping extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 'containers',
      containers: [],
      requests: []
    };
    this.props.setRole("Shipper");
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
    return axios.get('http://lars01.westeurope.cloudapp.azure.com:3000/api/Container?filter=%7B%22where%22%3A%7B%22owner%22%3A%22resource%3Aorg.acme.shipping.participants.Company%239325%22%7D%7D')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  getRequests = () => {
    return axios.get('http://lars01.westeurope.cloudapp.azure.com:3000/api/Request?filter=%7B%20%22where%22%3A%7B%20%22and%22%3A%5B%20%7B%20%22to%22%3A%20%22resource%3Aorg.acme.shipping.participants.Company%239325%22%20%7D%2C%20%7B%20%22status%22%3A%20%7B%20%22neq%22%3A%20%22IN_PROGRESS%22%7D%20%20%7D%5D%20%7D%20%7D')
    .then(response => {
      return response.data;
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

  selectFile = () => {
    document.getElementById("attachment").click();
  }

  fileSelected = (input) => {
    const file = input.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt) => {
        const result = evt.target.result;

        axios.post('http://lars01.westeurope.cloudapp.azure.com:3000/api/AddContainers', {
            "$class": "org.acme.shipping.transactions.AddContainers",
            "containers": result,
        })
        .then(()  => {
          this.getContainers()
          .then(containers => {
            this.setState({ containers });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      }
      reader.onerror = () => {
        console.log("error");
      }
    }
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
              <FlatButton label="Add manifest" style={styles.button} onClick={this.selectFile}> 
                <input 
                  type='file'
                  onChange={this.fileSelected}
                  style={{ display: "none" }} 
                  id="attachment" 
                  accept=".json" 
                /> 
              </FlatButton>
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
  (user,table) => ({
    ...user,
    ...table
  }),
  dispatch => ({
    setRole: role => dispatch(setRole(role))
  })
)(Shipping);
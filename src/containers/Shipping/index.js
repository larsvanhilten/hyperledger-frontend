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

class Shipping extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 'containers',
    };
    this.props.setRole("Shipper");
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
        console.log(evt.target.result);
      }
      reader.onerror = (evt) => {
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
            <ContainerTable style={{ height: "calc(100% - 246px)", overflow: "auto"}} />   
          </Tab>
          <Tab 
            label="Transactions" 
            value="transactions"
            icon={<FontIcon className="material-icons">loop</FontIcon>}
            style={{ height: "100%" }}
          >
            <ContainerTable style={{ height: "calc(100% - 195px)", overflow: "auto"}} />    
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
    setRole: role => dispatch(setRole(role))
  })
)(Shipping);
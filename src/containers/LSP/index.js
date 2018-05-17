import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config';
import styles from './styles';
import { ContainerTable } from '../../components';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { setRole } from '../../actions';

class LSP extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 'containers',
      dialog: false
    };
    this.props.setRole("Logistic Service Provider");
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
    // handle container request here
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
      <TextField hintText="Containernumber" />
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
)(LSP);
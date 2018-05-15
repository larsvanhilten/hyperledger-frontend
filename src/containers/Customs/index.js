import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config';
import styles from './styles';
import { ContainerTable } from '../../components';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import { setRole } from '../../actions';

class Customs extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 'containers',
    };
    this.props.setRole("Customs");
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
    console.log(this.props)
  };

  render() {
    return (
      <div style={styles.container}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          style={{ position: "fixed"}}
          contentContainerStyle={{ overflowY: "auto", height: "100vh" }}
        >
          <Tab 
            label="Containers" 
            value="containers"
            icon={<FontIcon className="material-icons">view_module</FontIcon>}
          >
            <ContainerTable />
          </Tab>
          <Tab 
            label="Transactions" 
            value="transactions"
            icon={<FontIcon className="material-icons">loop</FontIcon>}
          >
            
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
)(Customs);
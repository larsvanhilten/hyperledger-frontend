import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { Landing } from '..';
import styles from './styles';

class Routers extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <main style={styles.main}>
        <Router history={this.props.history}>
          <div style={styles.container}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="*" render={() => (<Redirect to="/" />)} />,
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default Routers;
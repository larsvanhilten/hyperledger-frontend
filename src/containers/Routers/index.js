import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { Navigation } from '../../components';
import { Landing, Customs, LSP, Shipping } from '..';
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
            <Navigation />
            <div style={styles.routes}>
              <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/customs" component={Customs} />
                  <Route exact path="/lsp" component={LSP} />
                  <Route exact path="/shipping" component={Shipping} />
                  <Route path="*" render={() => (<Redirect to="/" />)} />,
              </Switch>
            </div>
          </div>
        </Router>
      </main>
    );
  }
}

export default Routers;
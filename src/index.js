import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import 'normalize.css';

import { store } from './store';
import { Routers } from './containers';
import theme from './config/muiTheme'

const muiTheme = getMuiTheme(theme);
const history = syncHistoryWithStore(createBrowserHistory(), store);
const root = document.getElementById('root');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function start(NewRouters) {
  render(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <NewRouters history={history} />
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    root
  );
}

if (module.hot) {
  module.hot.accept('./containers', () => {
    const NewRouters = require('./containers').Routers;

    try {
      start(NewRouters);
    } catch (e) {
      console.error(e);
    }
  });
}

start(Routers);

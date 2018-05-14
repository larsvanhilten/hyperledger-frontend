import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';

export function configureStore(initialState = {}) {

  // Sync dispatched route actions to the history
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(
      thunk,
      promiseMiddleware()
    )
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('./../reducers').default);
    });
  }
  return store;
}

const store = configureStore();
export { store };
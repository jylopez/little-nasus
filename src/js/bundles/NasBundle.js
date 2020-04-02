'use strict';
const React = require('react');
const { render } = require('react-dom');
const { createStore, compose, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const ReactRedux = require('react-redux');
const { BrowserRouter, Route, Switch } = require('react-router-dom');
const Immutable = require('immutable');
const RootReducer = require('../reducers/root_reducer');
const NasLayout = require('../components/NasLayout');

const rehydratedInitialState = JSON.parse(document.getElementById('main').attributes['data-initial-state'].value);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, rehydratedInitialState, composeEnhancers(applyMiddleware(thunk)));

const App = function(){

  return (
    <ReactRedux.Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={NasLayout} />
        </Switch>
      </BrowserRouter>
    </ReactRedux.Provider>
  );
};

render(<App />,document.getElementById('main'));

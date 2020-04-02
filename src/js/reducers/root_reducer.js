'use strict';
const { combineReducers } = require('redux');
const { routerReducer } = require('react-router-redux');

const RootReducer = combineReducers({
  routing: routerReducer
});

module.exports = RootReducer;
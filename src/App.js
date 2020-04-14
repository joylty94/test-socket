import React from 'react';
import {Provider } from 'react-redux';
import './App.css';

import reducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';

import Home from './containers/Home';

const middlewares = [];
const enhancer = compose(
  applyMiddleware(...middlewares),
  process.env.NODE_ENV !== 'production'
    ? typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    : compose()
);
const store = createStore(reducer, enhancer);

function App() {

  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;

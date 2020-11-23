import React from 'react'
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import reducer from '../redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



 const customStore = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

 const customRender = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store=customStore,
    ...renderOptions
  } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  )

  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }), 
    history,
    store,
  };
}

export default customRender;

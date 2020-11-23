import React from 'react';
import {render, cleanup} from '@testing-library/react'
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from "redux";
import reducer from '../redux/reducers';
import thunk from "redux-thunk";
import { createMemoryHistory } from 'history';
import App from '../App';
import Register from '../containers/Register';
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

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/register');
  const { asFragment } = customRender(<App />, { history });
  
  expect(asFragment(<Register />)).toMatchSnapshot()
})
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import reducer from '../redux/reducers';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Login from './Login';
import App from '../App';
import { registerUser, BASE_URL } from '../redux/actions'
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


jest.mock('axios');

const customStore = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const customRender = (
  ui, 
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    initialState,
    store = customStore,
    ...renderOptions

  } = {}) => {
    const Wrapper = ({children}) => (
      <Provider store = {store}>
        <Router history = {history}>{children}</Router>
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

  describe ('login component happy path', () => {
    test('should render pick gender after login correctly', async () => {
      const mockAPIpost = axios.post.mockResolvedValue({
        "email": "email@email.com",
        "password": "Password"
      });

      const history = createMemoryHistory();
      history.push('/login');

      customRender(<Login history={history} />);

    // customRender(<App />, { history });
    
    const email = screen.getByLabelText(/Email/i);
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'email@email.com')
    expect(email).toHaveValue('email@email.com');

    const password = screen.getByLabelText(/Password/i);
    expect(password).toBeInTheDocument();
    userEvent.type(password, 'password')
    expect(password).toHaveValue('password');

    const loginLink = screen.getByTestId(/Login/i);
    expect(loginLink).toBeInTheDocument();
    userEvent.click(loginLink);

    expect(mockAPIpost).toHaveBeenCalledWith(`${BASE_URL}/login`,{
      "email":"email@email.com",
      "password":"password"
    })
    expect(mockAPIpost).toHaveBeenCalledTimes(1);


    })

  })
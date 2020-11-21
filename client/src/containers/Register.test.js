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
import Register from './Register';
import App from '../App';
import { registerUser, BASE_URL } from '../redux/actions'
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

jest.mock('axios');

const cutomStore = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const customRender = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store=cutomStore,
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
describe('Register component happy path', () => {
  test('should render Pick Gender after Register correctly', async () => {
    const mockAPIpost = axios.post.mockResolvedValue({
      "id":3,
      "firstName":"Name",
      "lastName":"Last Name",
      "email":"email@email.com",
      "password":"password",
      "linkingCode":"linkinCode",
      "partnerId":null
    });

    const history = createMemoryHistory();
    history.push('/register');

    // render(<Provider store={store}><Router history={history}><App /></Router></Provider>);

    // Question: is it ok to pass the history as a prop directly into the Register component to init the route?
    // customRender(<Register history={history} />);

    customRender(<App />, { history });
    const signUpLink = screen.getByText(/sign up/i);
    expect(signUpLink).toBeInTheDocument();

    const firstName = screen.getByLabelText(/first name/i);
    expect(firstName).toBeInTheDocument();
    userEvent.type(firstName, 'Name')
    expect(firstName).toHaveValue('Name');
    
    const lastName = screen.getByLabelText(/last name/i);
    expect(lastName).toBeInTheDocument();
    userEvent.type(lastName, 'Last Name')
    expect(lastName).toHaveValue('Last Name');

    
    const email = screen.getByLabelText(/Email/i);
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'email@email.com')
    expect(email).toHaveValue('email@email.com');

    const password = screen.getByLabelText(/Password/i);
    expect(password).toBeInTheDocument();
    userEvent.type(password, 'password')
    expect(password).toHaveValue('password');

    const button = screen.getByTestId(/submit/i);
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    // const user = await registerUser();
    expect(mockAPIpost).toHaveBeenCalledWith(`${BASE_URL}/register`,{
      "firstName":"Name",
      "lastName":"Last Name",
      "email":"email@email.com",
      "password":"password"
    })
    expect(mockAPIpost).toHaveBeenCalledTimes(1);
    //await waitFor(()=>screen.getByText(/What type of name are you looking for/i));
  })
});
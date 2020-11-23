import React from 'react'
import '@testing-library/jest-dom'
import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import App from '../App';
import { BASE_URL } from '../redux/actions'


import customRender from '../utils/customRender'

jest.mock('axios');


describe.only('Register component happy path', () => {
  afterEach(() => {
  cleanup()
  })
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

    expect(mockAPIpost).toHaveBeenCalledWith(`${BASE_URL}/register`,{
      "firstName":"Name",
      "lastName":"Last Name",
      "email":"email@email.com",
      "password":"password"
    })
    expect(mockAPIpost).toHaveBeenCalledTimes(1);
    
    await waitFor(()=> expect(history.location.pathname).toMatch('/game'));
    const game = screen.getByText(/What type of name are you looking for/i);
    expect(game).toBeInTheDocument();
  })

  test('should render Login after Register correctly', async () => {
    
    const history = createMemoryHistory();
    history.push('/register');

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

    const logIn = screen.getByText(/login/i);
    expect(logIn).toBeInTheDocument();
    userEvent.click(logIn);
    await waitFor(()=> {expect(history.location.pathname).toMatch('/login')});

    const emailLogin = screen.getByLabelText(/email/i);
    expect(emailLogin).toBeInTheDocument();

    const emailPassword = screen.getByLabelText(/password/i);
    expect(emailPassword).toBeInTheDocument();

    const buttonLogin = screen.getByTestId(/loginBtn/i);
    expect(buttonLogin).toBeInTheDocument();
  })
});
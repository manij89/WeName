import React from 'react'
import '@testing-library/jest-dom'
import { screen , waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import App from '../App';
import {  BASE_URL } from '../redux/actions'
import customRender from '../utils/customRender'

jest.mock('axios');

  describe ('login component happy path', () => {
    test('should render pick gender after login correctly', async () => {
      const mockAPIpost = axios.post.mockResolvedValue({
        "email": "email@email.com",
        "password": "Password"
      });

      const history = createMemoryHistory();
      history.push('/login');

    customRender(<App />, { history });
    
    const email = screen.getByLabelText(/email/i);
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'email@email.com')
    expect(email).toHaveValue('email@email.com');

    const password = screen.getByLabelText(/password/i);
    expect(password).toBeInTheDocument();
    userEvent.type(password, 'password')
    expect(password).toHaveValue('password');

    const loginLink = screen.getByTestId(/login/i);
    expect(loginLink).toBeInTheDocument();
    userEvent.click(loginLink);

    expect(mockAPIpost).toHaveBeenCalledWith(`${BASE_URL}/login`,{
      "email":"email@email.com",
      "password":"password"
    })
    expect(mockAPIpost).toHaveBeenCalledTimes(1);
    await waitFor(()=> expect(history.location.pathname).toMatch('/game'));
    const game = screen.getByText(/What type of name are you looking for/i);
    expect(game).toBeInTheDocument();
    })

  })
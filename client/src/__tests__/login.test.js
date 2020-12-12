import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import Login from '../containers/Login';


import customRender from '../utils/customRender'

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/login');
  const { asFragment } = customRender(<App />, { history });
  
  expect(asFragment(<Login />)).toMatchSnapshot()
})

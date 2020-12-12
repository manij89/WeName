import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import Register from '../containers/Register';


import customRender from '../utils/customRender'

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/register');
  const { asFragment } = customRender(<App />, { history });
  
  expect(asFragment(<Register />)).toMatchSnapshot()
})
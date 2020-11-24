import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import Home from '../containers/Home';


import customRender from '../utils/customRender'

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/profile');
  const { asFragment } = customRender(<App />, { history });
  
  expect(asFragment(<Home />)).toMatchSnapshot()
})

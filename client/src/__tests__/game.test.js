import React from 'react';
import { cleanup} from '@testing-library/react'
import { createMemoryHistory } from 'history';
import App from '../App';
import Game from '../containers/Game';


import customRender from '../utils/customRender'

afterEach(cleanup)

it('register snapshot', () => {
  const history = createMemoryHistory();
  history.push('/profile');
  const { asFragment } = customRender(<App />, { history });
  
  expect(asFragment(<Game />)).toMatchSnapshot()
})

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Login from '../containers/Home'

describe('Login', () => {
  afterEach(() => {
    cleanup();
  });

  test('render correctly', () => {
    const login = render(<Login />);
    expect(login.baseElement).toMatchSnapshot();
  });

});
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Register from '../containers/Home'

describe('Register', () => {
  afterEach(() => {
    cleanup();
  });

  test('render correctly', () => {
    const register = render(<Register />);
    expect(register.baseElement).toMatchSnapshot();
  });

});
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Profile from '../containers/Home'

describe('Profile', () => {
  afterEach(() => {
    cleanup();
  });

  test('render correctly', () => {
    const profile = render(<Profile />);
    expect(profile.baseElement).toMatchSnapshot();
  });

});
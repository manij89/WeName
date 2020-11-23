import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Game from '../containers/Game'

describe('Game', () => {
  afterEach(() => {
    cleanup();
  });

  test('render correctly', () => {
    const game = render(<Game />);
    expect(game.baseElement).toMatchSnapshot();
  });

});
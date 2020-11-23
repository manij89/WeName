import { render, screen } from '@testing-library/react';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const component = render(<BrowserRouter><App /></BrowserRouter>);
    expect(component.baseElement).toMatchSnapshot();
  });
  it('renders the tagline in the welcome screen', () => {
    render(<App/>);
    expect(screen.getByText('Find your favorite baby names')).toBeInTheDocument();
  });
  
});



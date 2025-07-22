// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage text', () => {
  render(<App />);
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';

import App from './App';

test('renders the page title', () => {
  render(<App />);
  const headerElement = screen.getByText(/Latest Released Albums/i);
  expect(headerElement).toBeInTheDocument();
});

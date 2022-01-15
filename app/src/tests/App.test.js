import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
// learn more: https://github.com/testing-library/jest-dom

test('renders Nav', () => {
  render(<App />);
  const titleElement = screen.getByText(/WordleSolver/i);
  expect(titleElement).toBeInTheDocument();
});

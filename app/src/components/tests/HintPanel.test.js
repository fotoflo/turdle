import { render, screen } from '@testing-library/react';
import HintPanel from '../HintPanel';
import '@testing-library/jest-dom';
// learn more: https://github.com/testing-library/jest-dom

test('inSet', () => {
  render(<HintPanel />);
  const titleElement = screen.getByText(/Hints/i);
  expect(titleElement).toBeInTheDocument();
});

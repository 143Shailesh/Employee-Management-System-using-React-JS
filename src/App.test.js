import { render, screen } from '@testing-library/react';
import { } from '../src/Components/';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

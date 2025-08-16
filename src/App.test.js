import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Voxllera AI Receptionist', () => {
  render(<App />);
  const linkElement = screen.getByText(/Voxllera AI Receptionist/i);
  expect(linkElement).toBeInTheDocument();
});
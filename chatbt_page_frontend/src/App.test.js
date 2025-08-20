import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chatbot welcome message', () => {
  render(<App />);
  const welcome = screen.getByText(/Hi! I am your AI assistant/i);
  expect(welcome).toBeInTheDocument();
});

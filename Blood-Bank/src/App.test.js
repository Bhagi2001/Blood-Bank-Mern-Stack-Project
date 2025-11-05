import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders landing navbar brand', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const brand = screen.getByText(/BloodLink/i);
  expect(brand).toBeInTheDocument();
});

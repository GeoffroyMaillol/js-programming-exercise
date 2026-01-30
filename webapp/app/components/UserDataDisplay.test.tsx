import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserDataDisplay from './UserDataDisplay';


const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

test('renders label', () => {
  renderWithTheme(<UserDataDisplay />);
  expect(screen.getByPlaceholderText('Search for a user...')).toBeInTheDocument();
});

test('renders button', () => {
  renderWithTheme(<UserDataDisplay />);
  expect(screen.getByText('Go!')).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Application from './Application';


const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

test('renders label', () => {
  renderWithTheme(<Application />);
  expect(screen.getByPlaceholderText('Search for a user...')).toBeInTheDocument();
});

test('renders button', () => {
  renderWithTheme(<Application />);
  expect(screen.getByText('Go!')).toBeInTheDocument();
});
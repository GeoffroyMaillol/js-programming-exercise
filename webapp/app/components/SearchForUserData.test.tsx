import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchForUserData from './SearchForUserData';


const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

test('renders label', () => {
  renderWithTheme(<SearchForUserData onError={() => undefined} onUserDataLoaded={() => undefined}/>);
  expect(screen.getByPlaceholderText('Search for a user...')).toBeInTheDocument();
});

test('renders button', () => {
  renderWithTheme(<SearchForUserData onError={() => undefined} onUserDataLoaded={() => undefined}/>);
  expect(screen.getByText('Go!')).toBeInTheDocument();
});
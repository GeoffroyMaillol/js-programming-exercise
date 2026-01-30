import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UserDataCard from "./UserDataCard";

import { UserData } from "../types/UserData";

const mockUser: UserData = {
  id: 1,
  firstName: "David",
  lastName: "Jones",
  jobTitle: "Developer",
  phone: "07789 543768",
  email: "djones@test.com"
};

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

test("renders properties", () => {
  renderWithTheme(<UserDataCard userData={mockUser}/>);
  expect(screen.getByText("David Jones")).toBeInTheDocument();
  expect(screen.getByText("Developer")).toBeInTheDocument();
  expect(screen.getByText("07789 543768")).toBeInTheDocument();
  expect(screen.getByText("djones@test.com")).toBeInTheDocument();
});

test("name is bold", () => {
  renderWithTheme(<UserDataCard userData={mockUser}/>);
  const element = screen.getByText("David Jones");
  expect(element).toHaveStyle({ fontWeight: "font-weight: 700" });
});

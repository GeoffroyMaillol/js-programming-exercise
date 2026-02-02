import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddUserDataDialog from './AddUserDataDialog';


test("shows validation errors form is empty", async () => {
  render(<AddUserDataDialog isOpen={true} onClose={() => {}} onSave={() => {}} />);

  expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
});


test("shows email validation errors when field is not valid", async () => {
  render(<AddUserDataDialog isOpen={true} onClose={() => {}} onSave={() => {}} />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "a" }   // invalid string
  });

  expect(await screen.findByText(/please enter a valid email address, abdcde@abcde.abc/i)).toBeInTheDocument();
});

test("email validation error disappear when field is valid", async () => {
  render(<AddUserDataDialog isOpen={true} onClose={() => {}} onSave={() => {}} />);

  const emailField = screen.getByLabelText(/email/i);
  fireEvent.change(emailField, {
    target: { value: "a" }   // invalid string
  });
  expect(await screen.findByText(/please enter a valid email address, abdcde@abcde.abc/i)).toBeInTheDocument();
  fireEvent.change(emailField, {
    target: { value: "a@a.a" }   // valid string
  });
  expect(await screen.queryByText(/please enter a valid email address, abdcde@abcde.abc/i)).not.toBeInTheDocument();
});

test("calls onSave with error message when validation fails", async () => {
  const mockOnSave = jest.fn();
  render(<AddUserDataDialog isOpen={true} onClose={() => {}} onSave={mockOnSave} />);

  fireEvent.click(screen.getByRole("button", { name: /save/i }));

  expect(mockOnSave).toHaveBeenCalledWith(
    expect.stringMatching(/^Please resolve validation issues./),
    false
  );
});

test("calls onSave with error message when API call fails", async () => {
  const mockOnSave = jest.fn();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "Email already exists" })
    })
  ) as jest.Mock;

  render(<AddUserDataDialog isOpen={true} onClose={() => {}} onSave={mockOnSave} />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "a@a.a" }   // valid email
  });
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: "a" }
  });
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: "a" }
  });
  fireEvent.click(screen.getByRole("button", { name: /save/i }));

  await waitFor(() => {
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.stringMatching(/^Failed to create user: Error: Email already exists/),
      false
    );
  });

});

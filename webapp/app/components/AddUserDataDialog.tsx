import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress
} from "@mui/material";
import { useState } from "react";
import { apiConfig } from "../config/apiConfig";

interface AddUSerDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (outcomeMessage: string, success: boolean) => void;
}

export function AddUSerDataDialog({ isOpen, onClose, onSave }: AddUSerDataDialogProps) {
  const [id] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saving, setSaving] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9 ()-]{7,20}$/;

  const handleSave = async () => {
    if (!firstName || !lastName || !email || emailError || phoneNumberError) {
      onSave?.("Please resolve validation issues.", false);
      return;
    }
    setSaving(true);

    try {
      const response = await fetch(apiConfig.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, firstName, lastName, jobTitle, phone, email })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      onSave?.("User successfully created!", true);
      setFirstName("");
      setLastName("");
      setPhone("");
      setPhoneNumberError("");
      setJobTitle("");
      setEmail("");
      setEmailError("");
      onClose();
    } catch (err) {
      onSave?.(`Failed to create user: ${err}`, false);
    } finally {
      setSaving(false);
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhone(value);
    if (!phoneRegex.test(value)) {
      setPhoneNumberError("Please enter a valid phone number");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value || !emailRegex.test(value)) {
      setEmailError("Please enter a valid email address, abdcde@abcde.abc");
    } else {
      setEmailError("");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New User</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Box display="flex" flexDirection="row" gap={2} mt={1}>
            <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value.trim())}
                fullWidth
                error={!firstName}
                helperText={!firstName ? "First name is required" : " "}
                required />

            <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value.trim())}
                fullWidth
                error={!lastName}
                helperText={!lastName ? "Last name is required" : " "}
                required />
          </Box>

          <TextField
            label="Job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value.trim())}
            fullWidth />

          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => handlePhoneNumberChange(e.target.value.trim())}
            fullWidth
            error={!!phoneNumberError}
            helperText={phoneNumberError} />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value.trim())}
            fullWidth
            error={!email || !!emailError}
            helperText={emailError}
            required />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button className="standard-button"
            variant="contained" 
            color="primary"
            onClick={onClose}>
          Cancel
        </Button>
        <Button className="standard-button"
            variant="contained"
            onClick={handleSave}>
          {saving ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUSerDataDialog;
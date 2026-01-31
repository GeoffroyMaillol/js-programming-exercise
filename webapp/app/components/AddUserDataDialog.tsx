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
import { UserData } from "../types/UserData";
import { apiConfig } from "../config/apiConfig";

interface AddUSerDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (outcomeMessage: string) => void;
}

export function AddUSerDataDialog({ isOpen, onClose, onSave }: AddUSerDataDialogProps) {
  const [id] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saving, setSaving] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await fetch(apiConfig.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, firstName, lastName, jobTitle, phone, email })
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const createdUser: UserData = await response.json();
      onSave?.("User successfully created");
      setFirstName("");
      setLastName("");
      setPhone("");
      setJobTitle("");
      setEmail("");
      setEmailError("");
      onClose();
    } catch (err) {
      console.error(err);
      onSave?.("Unable to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!emailRegex.test(value)) {
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
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth />

            <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth />
          </Box>

          <TextField
            label="Job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            fullWidth />

          <TextField
            label="Phone Number"
            value={phone}
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            fullWidth />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            fullWidth
            error={!!emailError}
            helperText={emailError} />
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
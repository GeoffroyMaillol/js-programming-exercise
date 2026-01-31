"use client"

import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import '../styles/styles.css';
import { apiConfig } from "../config/apiConfig"
import { UserData } from "../types/UserData";

interface SearchForUserDataProps {
  onUserDataLoaded: (users: UserData[]) => void;
  onError: (errorMessage: string) => void;
}


const SearchForUserData: React.FC<SearchForUserDataProps> = ({ onUserDataLoaded, onError }) => {
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState('');

  const searchForUsers = async () => {
    setLoading(true);
    try {
      const searchQuery = "/search?" + searchString;
      const response = await fetch(apiConfig.apiEndpoint);
      const data: UserData[] = await response.json();
      onUserDataLoaded(data);
      onError("");
    } catch (err) {
      console.error("API call failed", err);
      onError("Error calling API");
      onUserDataLoaded([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
        display="flex"
        flexDirection="row"
        gap={1}
        alignItems="center">
      <TextField className="search-box"
        placeholder="Search for a user..."
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Button className="search-button"
          variant="contained" 
          color="primary" 
          onClick={searchForUsers} 
          disabled={loading}
          sx={{
            borderRadius: '24px'
          }}>
        {loading ? <CircularProgress size={24} /> : "Go!"}
      </Button>
    </Box>
  );
};

export default SearchForUserData;

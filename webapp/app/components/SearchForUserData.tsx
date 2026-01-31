"use client"

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import '../styles/styles.css';
import { apiConfig } from "../config/apiConfig"
import { UserData } from "../types/UserData";
import { Autocomplete } from "@mui/material";

interface SearchForUserDataProps {
  onUserDataLoaded: (users: UserData[]) => void;
  onError: (errorMessage: string) => void;
}

function getFetchURL(searchString: string) {
  let fetchURL = apiConfig.apiEndpoint;
  // If no search entered, return everything
  if (searchString.trim()) {
    const searchQuery = `/search?query=${encodeURIComponent(searchString)}`;
    fetchURL += searchQuery;
  }
  return fetchURL;
}

function getFormattedUserData(userData: UserData): string {
  if (userData) {
    return `${userData.firstName} ${userData.lastName} `;
  }
  return "";
}

/**
 * Finds the indexes of a match between a string and a substring
 * @param text the text to search
 * @param query the text to match in text
 * @returns the start and end indexes of the match, if any 
 */
function findMatch(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return [];

  return [[index, index + query.length]];
}

/**
 * Slices a string in matched parts
 * @param text the string to slice
 * @param match the indexes to slice by
 * @returns the sliced strings
 */
function splitText(text: string, match: number[][]) {
  if (match.length === 0) return [{ text, highlight: false }];

  const [start, end] = match[0];

  return [
    { text: text.slice(0, start), highlight: false },
    { text: text.slice(start, end), highlight: true },
    { text: text.slice(end), highlight: false }
  ];
}


const SearchForUserData: React.FC<SearchForUserDataProps> = ({ onUserDataLoaded, onError }) => {
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [autoCompleteQuery, setAutoCompleteQuery] = useState("");
  const [autoCompleteMatches, setAutoCompleteMatches] = useState<UserData[]>([]);

  const searchForUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(getFetchURL(searchString));
      const data: UserData[] = await response.json();
      onUserDataLoaded(data);
      onError("");
      setSearchString(""); // Reinitialise the search string, otherwise the search button stops working for empty search
    } catch (err) {
      console.error("API call failed", err);
      onError("Error calling API");
      onUserDataLoaded([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!autoCompleteQuery || autoCompleteQuery.length < 2) {
      setAutoCompleteMatches([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const response = await fetch(getFetchURL(autoCompleteQuery));
      const data: UserData[] = await response.json();
      setAutoCompleteMatches(Array.isArray(data) ? data : []);
    }, 300);

    return () => clearTimeout(timeout);
  }, [autoCompleteQuery]);

  return (
    <Box
        display="flex"
        flexDirection="row"
        gap={1}
        alignItems="center">
      <Autocomplete // This feels like cheating because MUI gives this for free, but I take it.
        sx={{ width: 400 }}
        options={autoCompleteMatches}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#f76ea9",
              borderRadius: 5,
              boxShadow: 6,
              paddingY: 1,
              marginTop: "5px",
            }
          }
        }}
        getOptionLabel={(userData) => getFormattedUserData(userData)}
        onInputChange={(e, value) => setAutoCompleteQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            className="search-box"
            placeholder="Search for a user..."
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchString(e.target.value)} />
        )}
        renderOption={(props, option, { inputValue }) => {
          // This is to highlight matches in the Autocomplete suggestion.
          const match = findMatch(`${option.firstName} ${option.lastName}`, inputValue);
          const parts = splitText(`${option.firstName} ${option.lastName}`, match);

          return (
            <li {...props}>
              {parts.map((part: { text: string; highlight: boolean }, index: number) => (
                <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                      color: part.highlight ? "#011223" : "inherit"
                    }}>
                  {part.text}
                </span>
              ))}
            </li>
          );
        }}/>
      <Button className="standard-button"
          variant="contained" 
          color="primary"
          onClick={searchForUsers} 
          disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Go!"}
      </Button>
    </Box>
  );
};

export default SearchForUserData;


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

/**
 * Formats the fetch URL
 * @param searchString the search string to call the API with
 * @returns the fetch URL to call the API with
 */
function getFetchURL(searchString: string) {
  let fetchURL = apiConfig.apiEndpoint;
  // If no search entered, return everything
  if (searchString.trim()) {
    const searchQuery = `/search?query=${encodeURIComponent(searchString)}`;
    fetchURL += searchQuery;
  }
  return fetchURL;
}

/**
 * Formats a UserData into the full name 
 * @param userData the user data object to format
 * @returns the full name
 */
function getFormattedUserData(userData: UserData): string {
  if (userData) {
    return `${userData.firstName} ${userData.lastName}`;
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

  const fetchAutoCompleteMatches = (autoCompleteQuery: string, setMatches: (u: UserData[]) => void) => {
    if (!autoCompleteQuery || autoCompleteQuery.length < 2) {
      setMatches([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const response = await fetch(getFetchURL(autoCompleteQuery));
      const data: UserData[] = await response.json();
      setMatches(Array.isArray(data) ? data : []);
    }, 300);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    return fetchAutoCompleteMatches(autoCompleteQuery, setAutoCompleteMatches);
  }, [autoCompleteQuery]);

  const highlightSearchText = (
    props: React.HTMLAttributes<HTMLLIElement> & { key?: string },
    option: UserData,
    inputValue: string
  ) => {
    const displayUserData = `${option.firstName} ${option.lastName} (${option.id})`;
    const match = findMatch(displayUserData, inputValue);
    const parts = splitText(displayUserData, match);

    const { key, ...rest } = props;

    return (
      <li key={key} {...rest}>
        {parts.map((part, index) => (
          <span
            key={index}
            style={{
              whiteSpace: "pre",
              fontWeight: part.highlight ? 700 : 400,
              color: part.highlight ? "#011223" : "inherit"
            }}
          >
            {part.text}
          </span>
        ))}
      </li>
    );
  };

  return (
    <Box
        display="flex"
        flexDirection="row"
        gap={1}
        alignItems="center">
      <Autocomplete
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
              border: "1px solid white",
            }
          }
        }}
        getOptionLabel={(userData) => getFormattedUserData(userData)}
        onInputChange={(e, value) => setAutoCompleteQuery(value)}
        onChange={(e, newValue) => {
          if (newValue) {
            onUserDataLoaded([newValue]);
          }
          setAutoCompleteQuery("");
          setSearchString("");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="search-box"
            placeholder="Search for a user..."
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchString(e.target.value)} />
        )}
        renderOption={(props, option, { inputValue }) => highlightSearchText(props, option, inputValue)}/>
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


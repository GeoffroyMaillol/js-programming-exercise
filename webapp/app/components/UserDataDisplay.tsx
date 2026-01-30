"use client"

import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import UserDataCard from './UserDataCard';
import { UserData } from '../types/UserData';
import SearchForUserData from './SearchForUserData';

const UserDataDisplay: React.FC = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserDataLoaded = (userData: UserData[]) => {
    setUserData(userData);
  };

  const handleUserDataError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center" 
        alignItems="center"
        height="100vh"
        gap={1}>
      <SearchForUserData 
        onUserDataLoaded={handleUserDataLoaded}
        onError={handleUserDataError}/>
      <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}>
        {userData && userData.map((userDatum: UserData) => (
            <UserDataCard key={userDatum.id} userData={userDatum} />
        ))}
      </Box>
      {errorMessage && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Error occurred:</strong> {errorMessage}
        </div>
      )}
    </Box>
  );
};

export default UserDataDisplay;

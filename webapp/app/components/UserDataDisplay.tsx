"use client"
import '../styles/styles.css';
import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import UserDataCard from './UserDataCard';
import { UserData } from '../types/UserData';
import SearchForUserData from './SearchForUserData';
import { Button } from "@mui/material";
import { AddUSerDataDialog } from './AddUserDataDialog';

const UserDataDisplay: React.FC = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);
  const [userMessage, setUserMessage] = useState('');
  const [isUserMessageError, setIsUserMessageError] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);


  const handleUserDataLoaded = (userData: UserData[]) => {
    setUserData(userData);
  };

  const handleUserDataError = (errorMessage: string) => {
    setIsUserMessageError(true);
    setUserMessage(errorMessage);
  };

  const handleAddUserData = (outcomeMessage: string, success: boolean) => {
    console.log(`Is success: ${success}`)
    setIsUserMessageError(!success);
    setUserMessage(outcomeMessage);
  };

  const resetUserMessage = () => {
    setIsUserMessageError(false);
    setUserMessage("");
  };

  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        paddingTop={2}
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
      <Box>
        <Button className="standard-button"
            variant="contained" 
            color="primary"
            onClick={() => setShowNewUserModal(true)}
            sx={{
              position: 'fixed',
              bottom: 20,
              left: "50%",
            }}>
          New User +
        </Button>
      </Box>
      <Snackbar
          open={Boolean(userMessage)}
          autoHideDuration={10000}
          onClose={resetUserMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity={isUserMessageError ? "error" : "info"} onClose={resetUserMessage} variant="filled">
          {isUserMessageError ? <strong>Error occurred:</strong> : ""} {userMessage}
        </Alert>
      </Snackbar>
      <AddUSerDataDialog
        isOpen={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
        onSave={handleAddUserData} />
    </Box>
  );
};

export default UserDataDisplay;

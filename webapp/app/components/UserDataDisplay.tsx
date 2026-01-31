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
  const [errorMessage, setErrorMessage] = useState('');
  const [showNewUserModal, setShowNewUserModal] = useState(false);


  const handleUserDataLoaded = (userData: UserData[]) => {
    setUserData(userData);
  };

  const handleUserDataError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const handleAddUserData = (outcomeMessage: string) => {
    setErrorMessage(`Added new user: ${outcomeMessage}`);
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
      <Box>
        <Button className="standard-button"
          variant="contained" 
          color="primary"
          onClick={() => setShowNewUserModal(true)} >
          New User +
        </Button>
      </Box>
      <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={10000}
          onClose={() => setErrorMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert severity="error" onClose={() => setErrorMessage('')} variant="filled">
          <strong>Error occurred:</strong> {errorMessage}
        </Alert>
      </Snackbar>
      <AddUSerDataDialog
        isOpen={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
        onSave={(outcomeMessage) => handleAddUserData(outcomeMessage)}
      />
    </Box>
  );
};

export default UserDataDisplay;

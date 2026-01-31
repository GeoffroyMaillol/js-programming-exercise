import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../styles/styles.css';
import { UserData } from '../types/UserData';

interface UserCardProps {
  userData: UserData;
}

export default function UserDataCard( {userData}: UserCardProps) {
  return (
    <Card className="user-data-card">
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {userData.firstName} {userData.lastName}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {userData.jobTitle}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            {userData.phone}
          </Typography>
          <Typography variant="body2">
            {userData.email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

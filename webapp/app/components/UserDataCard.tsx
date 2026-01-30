import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserData } from '../types/UserData';

interface UserCardProps {
  userData: UserData;
}

export default function UserDataCard( {userData}: UserCardProps) {
  return (
    <Card
        sx={{
          borderRadius: '12px',
          border: '1px solid white',
          padding: 2,
          maxWidth: 350,
          boxShadow: 3,
          opacity: 0,
          animation: 'fadeIn 1s ease forwards',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
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

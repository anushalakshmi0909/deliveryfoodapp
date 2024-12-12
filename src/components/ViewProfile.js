import React from 'react';
import { Typography, Avatar, Container, Box, Button } from '@mui/material';

const ViewProfile = ({ user }) => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#ff5722' }}>
        Profile Details
      </Typography>
      <Avatar src={user.avatarUrl} alt={user.username} sx={{ width: 100, height: 100, border: '2px solid #ff5722' }} />
      <Typography variant="h5" sx={{ color: '#ff5722', margin: 1 }}>
        {user.username} 😊
      </Typography>
      <Box sx={{ bgcolor: '#fff2e0', borderRadius: 2, padding: 2, textAlign: 'center', boxShadow: 2 }}>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Phone: {user.phone}</Typography>
        <Typography variant="body2" sx={{ marginTop: 1, fontStyle: 'italic', color: '#555' }}>
          "Embrace the glorious mess that you are."
        </Typography>
      </Box>
      <Button variant="contained" sx={{ marginTop: 2, bgcolor: '#ff5722' }} onClick={() => alert('Edit Profile')}>
        Edit Profile
      </Button>
    </Container>
  );
};

export default ViewProfile;
